import { makeStyles } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { GameScreenModel } from '../../../core/interfaces';

const useClasses = makeStyles({
  wrapper: { textAlign: 'center', height: '100%' },
  image: { height: '100%' }
})

const WinScreen: FC<{screen: GameScreenModel}> = (props) => {
  const { screen } = props;
  const classes = useClasses();
  useEffect(() => {
    const audio = new Audio(URL.createObjectURL(screen.audio));
    const playOnAudioReady = () => audio.play();
    audio.addEventListener('canplaythrough', playOnAudioReady);
    return function cleanUpAudio() {
      audio.pause();
      audio.removeEventListener('canplaythrough', playOnAudioReady);
    }
  }, [screen.audio]);
  return (
    <div className={classes.wrapper}>
      <img src={URL.createObjectURL(screen.picture)} className={classes.image} alt="Изображение на весь экран"></img>
      </div>
  )
}

export default WinScreen;