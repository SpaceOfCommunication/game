import React, { FC, useEffect, useState } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { makeStyles } from '@material-ui/core';

export interface AudioPlayerProps {
  audioSource: Blob,
};

const useComponentStyles = makeStyles({
  playerIcon: {
    width: '100px',
    height: '100px',
    cursor: 'pointer'
  }
});

export const AudioPlayer: FC<AudioPlayerProps> = (props) => {
  const { audioSource } = props;
  const classes = useComponentStyles();
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const audio = new Audio(URL.createObjectURL(audioSource));
    const initializePlayer = () => playing ? audio.play() : audio.pause();
    audio.addEventListener('canplaythrough', initializePlayer);
    return function cleanUpAudio() {
      audio.pause();
      audio.removeEventListener('canplaythrough', initializePlayer);
    }
  }, [playing, audioSource]);

  const PlyaerIcon = playing ? StopIcon : PlayArrowIcon;

  return (
    <div>
      <PlyaerIcon onClick={() => setPlaying(!playing)} className={classes.playerIcon}></PlyaerIcon>
    </div>
  )
};

export default AudioPlayer;