import { makeStyles } from '@material-ui/core';
import { SCREEN_MEDIA_SIZES } from '../../../core/styles';


const gameBlockMedias = SCREEN_MEDIA_SIZES.reduce((acc, mediaKey, i) => {
  acc[mediaKey] = {
    gameBlock: { flexBasis: `${100 / (i+1)}%` }
  };
  return acc;
}, {});

export const useGameListStyles = makeStyles({
  gameList: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '30px',
  },
  gameBlock: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: '10px',
    cursor: 'pointer',
  },
  gameBlockInner: {
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 7px 13px -10px',
    backgroundColor: '#ffffff',
  },
  ...gameBlockMedias,
  contentWrapper: {
    display: 'block',
    padding: '0px 20px 10px 20px',
    '&:hover': {
      '& $preview': {
        transform: 'scale(1.05) rotate(0.005turn)',    
      },
      '& $playOverlay': {
        opacity: '0.5',
      }
    }
  },
  previewWrapper: {
    position: 'relative',
  },
  preview: {
    height: '200px',
    transition: 'transform 0.5s',
    transform: 'scale(1) rotate(0)',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px 0px',
  },
  playOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefefe',
    transition: 'opacity 0.5s',
    opacity: '0',
  },
  playIcon: {
    width: '100px',
    height: '100px',
  },
  newGameBlock: {
    border: '2px dashed #7b7b7b',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '350px',
    fontSize: '130%',
    '&:hover $newGameBlockIcon': {
      transform: 'scale(1.1)',
    }
  },
  newGameBlockIcon: {
    width: '100px',
    height: '100px',
    opacity: '0.8',
    transition: 'transform 0.5s',
  }
});