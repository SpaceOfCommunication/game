/* eslint-disable @typescript-eslint/camelcase */
import { Button, FormControl, FormHelperText, Grid, makeStyles } from '@material-ui/core';
import { useStore } from '../../../core/store';
import React, { FC, useCallback, useState } from 'react';
import Message from '../ui/message';
import FilePicker from '../ui/file-picker';
import { DocModel } from '../../../core/interfaces';

interface FormState {
  picture?: File;
  audio?: File;
}

const useStyles = makeStyles({
  gridItem: {
    textAlign: 'center',
    padding: '15px'
  }
});

export const GameConstructor: FC = () => {

  const classes = useStyles();
  const store = useStore();
  const [formState, setFormState] = useState<FormState>({ picture: undefined, audio: undefined });
  const isFormDisabled = !(formState.picture && formState.audio);

  const handlePictureSelection = useCallback((filelist) => {
    if (filelist.length > 0) {
      setFormState({ ...formState, picture: filelist[0] });
    }
  }, [formState]);

  const handleAudioSelection = useCallback((filelist) => {
    if (filelist.length > 0) {
      setFormState({ ...formState, audio: filelist[0] });
    }
  }, [formState]);


  const handleGameSave = useCallback(() => {
    if (!formState.picture || !formState.audio) {
      return;
    }
    store.db.pouchDB.post<DocModel>({
      title: 'MyNewGameTitle',
      _attachments: {
        img: {
          content_type: formState.picture.type,
          data: formState.picture
        },
        sfx: {
          content_type: formState.audio.type,
          data: formState.audio
        }
      }
    });

  }, [store, formState]);

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={12}>
        <Message>Для создания игры загрузите картинку <span role="img" aria-label="иконка картинки">🖼 </span>
        и мелодию <span role="img" aria-label="иконка мелодии">🎶</span></Message>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <FormControl>
          <FilePicker onFileSelection={handlePictureSelection} accept="image/png, image/jpeg" ariaDescribedby="Поле выбора файла изображения"></FilePicker>
          <FormHelperText id="my-helper-text">
            Выберите картинку <span role="img" aria-label="иконка картинки">🖼 </span> на своем компьютере
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <FormControl>
          <FilePicker onFileSelection={handleAudioSelection} accept="audio/*" ariaDescribedby="Поле выбора аудио файла"></FilePicker>
          <FormHelperText id="my-helper-text">
            Выберите мелодию <span role="img" aria-label="иконка мелодии">🎶</span> на своем компьютере
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Button disabled={isFormDisabled} onClick={handleGameSave} variant="contained" color="primary" size="large">Создать игру</Button>
      </Grid>
    </Grid>
  )
};


export default GameConstructor