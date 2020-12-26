/* eslint-disable @typescript-eslint/camelcase */
import { Button, TextField } from '@material-ui/core';
import { useStore } from '../../../core/store';
import React, { FC, useCallback, useEffect, useState } from 'react';
import Message from '../ui/message';
import { DocModel } from '../../../core/interfaces';
import { DEFAULT_MELODY_DURATION } from '../../../core/constants';
import GameConstructorEntry from '../game-contructor-entry/game-contructor-entry';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory, useParams } from 'react-router-dom';
import { useGameConstructorStyles } from './game-constructor.styles';
import { observer } from 'mobx-react-lite';
import { MessageService } from '../../../core/message-service';

export interface GameConstructorRouterParams {
  id?: string;
}

interface GameScreenModelDraft {
  picture?: Blob;
  audio?: Blob
}

function isValidScreen(screen: GameScreenModelDraft) {
  return screen.picture && screen.audio;
}

const DEFAULT_TITLE = 'Моя новая игра';

export const GameConstructor: FC = observer(() => {
  const store = useStore();
  const { id } = useParams<GameConstructorRouterParams>();
  const history = useHistory();
  const componentClasses = useGameConstructorStyles();
  const [screensState, setScreensState] = useState<GameScreenModelDraft[]>([{}]);
  const [showValidationState, setShowValidationState] = useState(false);
  const [melodyDuration, setMelodyDuration] = useState(DEFAULT_MELODY_DURATION);
  const [gameTitle, setGameTitle] = useState<string>(DEFAULT_TITLE);
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  const game = id ? store.games.find((game) => game.id === id) : undefined;

  useEffect(() => {
    setScreensState(game?.screens ? [...game?.screens] : []);
    setGameTitle(game?.title || DEFAULT_TITLE);
    setMelodyDuration(game?.audioDuration || DEFAULT_MELODY_DURATION);
    setFormDisabled(!game?.screens.length);
  }, [setScreensState, game]);

  const handleEntryAdd = useCallback(() => {
    setScreensState([...screensState, {}]);
    setFormDisabled(false);
  }, [screensState, setScreensState]);

  const handleEntryChange = useCallback((screen: GameScreenModelDraft, picture?: Blob, audio?: Blob) => {
    screen.picture = picture;
    screen.audio = audio;
    setScreensState([...screensState]);
  }, [screensState]);

  const handleEntryDelete = useCallback((screen: GameScreenModelDraft) => {
    const newScreenState = [...screensState.filter((ss) => ss !== screen)];
    setScreensState(newScreenState);
    if (newScreenState.length === 0) {
      setFormDisabled(true);
    }
  }, [screensState]);

  const handleSave = useCallback(async () => {
    if (screensState.length === 0) {
      MessageService.getInstance().showMessage({ message: 'Необходимо иметь хотя бы один экран, чтобы создать игру', status: 'error' });
    }
    const hasEmptyFields = screensState.some((screen) => !isValidScreen(screen));
    if (hasEmptyFields) {
      MessageService.getInstance().showMessage({ message: 'Все поля должны быть заполнены', status: 'error' });
      setShowValidationState(true);
      return;
    }

    const _attachments: DocModel["_attachments"] = {};
    screensState.forEach((screen, i) => {
      const picture = screen.picture as Blob;
      const audio = screen.audio as Blob;
      _attachments[`img-${i}`] = {
        content_type: picture.type,
        data: picture
      };
      _attachments[`sfx-${i}`] = {
        content_type: audio.type,
        data: audio
      };
    });
    const docModel: DocModel = { title: gameTitle, audioDuration: melodyDuration, _attachments };
    try {
      if (game) {
        await store.db.pouchDB.put<DocModel>({ _id: game.id, _rev: game.rev, ...docModel }, { force: true });
      } else {
        await store.db.pouchDB.post<DocModel>(docModel);
      }
      MessageService.getInstance().showMessage({ message: `Игра успешно ${game ? 'сохранена' : 'создана'}`, status: 'success' });
    } catch (err) {
      MessageService.getInstance().showMessage({ message: 'При создании игры произошла ошибка. Попробуйте еще раз', status: 'error' });
    }
    history.push('/')
  }, [screensState, setShowValidationState, store.db.pouchDB, history, gameTitle, melodyDuration, game]);

  return (
    <div className={componentClasses.wrapper}>
      <div className={componentClasses.header}>
        <h1>{game ? 'Редактировать игру' : 'Создание новой игры'}</h1>
      </div>
      <Message>Придумайте название игры и введите базовые настройки</Message>
      <div className={componentClasses.textInputBlock}>
        <TextField className={componentClasses.textInput} value={gameTitle}
          onChange={e => setGameTitle(e.target.value)} label="Название игры" variant="outlined" />
        <TextField className={componentClasses.textInput} type="number" value={melodyDuration} InputLabelProps={{ shrink: true }}
          onChange={e => setMelodyDuration(+e.target.value)} label="Длительность мелодии (секунды)" variant="outlined" />
      </div>
      <Message>Для создания игры загрузите картинку в формате jpg или png <span role="img" aria-label="иконка картинки">🖼 </span>
        и мелодию в формате mp3 или ogg <span role="img" aria-label="иконка мелодии">🎶</span></Message>
      <Message>В одну игру можно добавить несколько пар картинка+мелодия. Для этого нажмите на кнопку “Добавить игровой экран” столько раз, сколько вам нужно, и загрузите картинки и мелодии в соответствующие поля.</Message>
      <Message>Когда все загружено, нажмите "Сохранить игру".</Message>
      <div className={componentClasses.screnWrapper}>
        {screensState.map((screen, i) => (
          <GameConstructorEntry
            onEntryChange={handleEntryChange.bind(undefined, screen)}
            onDelete={handleEntryDelete.bind(undefined, screen)}
            highlightEmpty={showValidationState && !isValidScreen(screen)}
            {...screen}>
          </GameConstructorEntry>
        ))}
      </div>
      <div className={componentClasses.buttons}>
        <Button onClick={handleEntryAdd} variant="contained" color="primary" size="large" startIcon={<AddIcon />}>
          Добавить игровой экран
        </Button>
        <Button onClick={handleSave} disabled={formDisabled} variant="contained" color="secondary" size="large" startIcon={<SaveIcon />}>
          Сохранить игру
        </Button>
      </div>
    </div>
  )
});

export default GameConstructor