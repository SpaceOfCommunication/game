/* eslint-disable @typescript-eslint/camelcase */
import { Button, Grid } from '@material-ui/core';
import { useStore } from '../../../core/store';
import React, { FC, useCallback, useState } from 'react';
import Message from '../ui/message';
import { DocModel, GameModel } from '../../../core/interfaces';
import { useCommonStyles } from '../../../core/styles';
import GameConstructorEntry from '../game-contructor-entry/game-contructor-entry';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';

export interface GameConstructorProps {
  game?: GameModel;
}

interface GameScreenModelDraft {
  picture?: Blob;
  audio?: Blob
}

function isValidScreen(screen: GameScreenModelDraft) {
  return screen.picture && screen.audio;
}

export const GameConstructor: FC<GameConstructorProps> = (props) => {
  const { game } = props;
  const classes = useCommonStyles();
  const store = useStore();
  const [screensState, setScreensState] = useState<GameScreenModelDraft[]>(game?.screens || []);
  const [showValidationState, setShowValidationState] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(!game?.screens.length);

  const handleEntryAdd = useCallback(() => {
    setScreensState([...screensState, {}]);
    setIsFormDisabled(false);
  }, [screensState, setScreensState, setIsFormDisabled]);


  const handleEntryChange = useCallback((screen: GameScreenModelDraft, picture?: Blob, audio?: Blob) => {
    screen.picture = picture;
    screen.audio = audio;
    setScreensState([...screensState]);
  }, [screensState]);

  const handleSave = useCallback(() => {
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
    store.db.pouchDB.post<DocModel>({title: 'GameWithManyScreens', _attachments });
  }, [screensState, setShowValidationState, store.db.pouchDB]);

  return (
    <Grid container className={classes.gridRoot} justify="center" alignContent="center">
      <Grid item xs={12}>
        <Message>Для создания игры загрузите картинку <span role="img" aria-label="иконка картинки">🖼 </span>
        и мелодию <span role="img" aria-label="иконка мелодии">🎶</span></Message>
      </Grid>
      {screensState.map((screen) => (
        <GameConstructorEntry
          onEntryChange={handleEntryChange.bind(undefined, screen)}
          highlightEmpty={showValidationState && !isValidScreen(screen)}
          {...screen}>
        </GameConstructorEntry>
      ))}
      <Grid item xs={6} className={classes.gridItem}>
        <Button onClick={handleEntryAdd} variant="contained" color="primary" size="large" startIcon={<AddIcon />}>
          Добавить игровой экран
        </Button>
      </Grid>
      <Grid item xs={6} className={classes.gridItem}>
        <Button disabled={isFormDisabled} onClick={handleSave} variant="contained" color="secondary" size="large" startIcon={<SaveIcon />}>
          Сохранить игру
        </Button>
      </Grid>
    </Grid>
  )
};

export default GameConstructor