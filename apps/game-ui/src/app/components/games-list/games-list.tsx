import { Button, Grid, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import { useStore } from '../../../core/store';
import { SCREEN_MEDIA_SIZES, useCommonStyles } from '../../../core/styles';

export interface GamesListProps {
  onCreateNewGame?: () => void
};


const gameBlockMedias = SCREEN_MEDIA_SIZES.reduce((acc, mediaKey, i) => {
  acc[mediaKey] = {
    gameBlock: { flexBasis: `${100 / (i+1)}%` }
  };
  return acc;
}, {});

console.log(gameBlockMedias);

const useComponentStyles = makeStyles({
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
    maxWidth: '300px',
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
  }
})

export const GamesList: FC<GamesListProps> = observer((props) => {
  const store = useStore();
  const classes = useCommonStyles();
  const componentClasses = useComponentStyles();

  const hasGames = store.games.length > 0;

  return (
    <div className={componentClasses.gameList}>
      {hasGames && store.games.map((game) => (
        <div className={componentClasses.gameBlock}>
          <div className={componentClasses.gameBlockInner}>
            <Link to={`/game/${game.id}`} className={`${componentClasses.contentWrapper} ${classes.link}`}>
              <h2>{game.title}</h2>
              <div className={componentClasses.previewWrapper}>
                <img src={URL.createObjectURL(game.screens[0].picture)} className={componentClasses.preview} alt="Превью игры"></img>
                <div className={componentClasses.playOverlay}>
                  <PlayArrowIcon className={componentClasses.playIcon} />
                </div>
              </div>
            </Link>
            <div className={componentClasses.buttons}>
              <Button color="primary" startIcon={<CreateIcon />}>Редактировать</Button>
              <Button color="secondary" startIcon={<DeleteForeverIcon />}>Удалить</Button>
            </div>
          </div>
        </div>
      ))}
      <Grid item xs={12} className={classes.gridItem}>
        <Link to="/create-game" className={classes.link}>
          <Button variant="contained" color="primary" size="large" startIcon={<AddIcon />}>
            Создать новую игру
            </Button>
        </Link>
      </Grid>
    </div>

  );
})

export default GamesList
