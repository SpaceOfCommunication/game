import { FormControl, FormHelperText, Grid, makeStyles } from '@material-ui/core';
import React, { FC, useState, useCallback } from 'react';
import { useCommonStyles } from '../../../core/styles';
import nopicture from '../../../assets/no-picture.png';
import FilePicker from '../ui/file-picker';
import AudioPlayer from '../audio-player/audio-player';


const useStyles = makeStyles({
  inputBlock: {
    display: 'flex',
  },
  previewImage: {
    maxWidth: '150px',
    padding: '10px',
    borderRadius: '20px',
  },
  fileSelectionBlock: {
    display: 'flex',
    justifyContent: 'center',
  },
  emptyField: {
    border: '2px solid red',
  }
});

interface FormState {
  picture?: File;
  audio?: File;
};

export interface GameConstructorEntryProps {
  highlightEmpty?: boolean,
  picture?: Blob,
  audio?: Blob,
  onEntryChange?: (picture?: Blob, audio?: Blob) => void,
};

const GameConstructorEntry: FC<GameConstructorEntryProps> = (props) => {
  const { highlightEmpty, onEntryChange, picture, audio } = props;

  const classes = useCommonStyles();
  const componentClasses = useStyles();
  const [formState, setFormState] = useState<FormState>({ picture: undefined, audio: undefined });

  const handlePictureSelection = useCallback((filelist) => {
    if (filelist.length > 0) {
      setFormState({ ...formState, picture: filelist[0] });
      if (onEntryChange) {
        onEntryChange(filelist[0], formState.audio);
      }
    }
  }, [formState, onEntryChange]);

  const handleAudioSelection = useCallback((filelist) => {
    if (filelist.length > 0) {
      setFormState({ ...formState, audio: filelist[0] });
      if (onEntryChange) {
        onEntryChange(formState.picture, filelist[0]);
      }
    }
  }, [formState, onEntryChange]);

  let inputBlockClasses = `${classes.gridItem} ${componentClasses.inputBlock}`;
  if (highlightEmpty) {
    inputBlockClasses = `${inputBlockClasses} ${componentClasses.emptyField}`;
  }
  console.log(picture, audio)

  return (
    <Grid container className={classes.gridRoot} justify="center" alignContent="center">
      <Grid item xs={6} className={inputBlockClasses}>
        <img src={(picture && URL.createObjectURL(picture)) || nopicture} className={componentClasses.previewImage} alt="Пустое изображение"></img>
        <FormControl className={componentClasses.fileSelectionBlock}>
          <FilePicker onFileSelection={handlePictureSelection} accept="image/png, image/jpeg" ariaDescribedby="Поле выбора файла изображения"></FilePicker>
          <FormHelperText id="my-helper-text">
            Выберите картинку <span role="img" aria-label="иконка картинки">🖼 </span> на своем компьютере
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={6} className={inputBlockClasses}>
        {audio && <AudioPlayer audioSource={audio}></AudioPlayer>}
        <FormControl className={componentClasses.fileSelectionBlock}>
          <FilePicker onFileSelection={handleAudioSelection} accept="audio/*" ariaDescribedby="Поле выбора аудио файла"></FilePicker>
          <FormHelperText id="my-helper-text">
            Выберите мелодию <span role="img" aria-label="иконка мелодии">🎶</span> на своем компьютере
          </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default GameConstructorEntry;