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
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [melodyDuration, setMelodyDuration] = useState(DEFAULT_MELODY_DURATION);
  const [gameTitle, setGameTitle] = useState<string>(DEFAULT_TITLE);
  const game = id ? store.games.find((game) => game.id === id) : undefined;

  useEffect(() => {
    if (game) {
      setScreensState([...game?.screens]);
      setGameTitle(game.title);
      setMelodyDuration(game.audioDuration);
    }
  }, [setScreensState, game]);

  const handleEntryAdd = useCallback(() => {
    setScreensState([...screensState, {}]);
    setIsFormDisabled(false);
  }, [screensState, setScreensState, setIsFormDisabled]);

  const handleEntryChange = useCallback((screen: GameScreenModelDraft, picture?: Blob, audio?: Blob) => {
    screen.picture = picture;
    screen.audio = audio;
    setScreensState([...screensState]);
  }, [screensState]);

  const handleSave = useCallback(async () => {
    const hasEmptyFields = screensState.some((screen) => !isValidScreen(screen));
    if (hasEmptyFields) {
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
    await store.db.pouchDB.post<DocModel>({ title: gameTitle, audioDuration: melodyDuration, _attachments });
    history.push('/')
  }, [screensState, setShowValidationState, store.db.pouchDB, history, gameTitle, melodyDuration]);

  return (
    <div className={componentClasses.wrapper}>
      <div className={componentClasses.header}>
        <h1>Новая игра</h1>
      </div>
      <Message>Придумайте название игры и введите базовые натройки</Message>
      <div className={componentClasses.textInputBlock}>
        <TextField className={componentClasses.textInput} value={gameTitle} defaultValue={DEFAULT_TITLE}
          onChange={e => setGameTitle(e.target.value)} label="Название игры" variant="outlined"/>
        <TextField className={componentClasses.textInput} type="number" value={melodyDuration} InputLabelProps={{ shrink: true }}
          onChange={e => setMelodyDuration(+e.target.value)} label="Длительность мелодии (секунд)" variant="outlined"/>
      </div>
      <Message>Для создания игрового экрана загрузите картинку <span role="img" aria-label="иконка картинки">🖼 </span>
        и мелодию <span role="img" aria-label="иконка мелодии">🎶</span></Message>
      <div>
        {screensState.map((screen, i) => (
          <GameConstructorEntry
            onEntryChange={handleEntryChange.bind(undefined, screen)}
            highlightEmpty={showValidationState && !isValidScreen(screen)}
            {...screen}>
          </GameConstructorEntry>
        ))}
      </div>
      <div className={componentClasses.buttons}>
        <Button onClick={handleEntryAdd} variant="contained" color="primary" size="large" startIcon={<AddIcon />}>
          Добавить игровой экран
        </Button>
        <Button disabled={isFormDisabled} onClick={handleSave} variant="contained" color="secondary" size="large" startIcon={<SaveIcon />}>
          Сохранить игру
        </Button>
      </div>
    </div>
  )
});

export default GameConstructor