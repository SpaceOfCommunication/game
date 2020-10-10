import { Button, Grid, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

import { useStore } from '../../../core/store';
import Message from '../ui/message';
import { useCommonStyles } from '../../../core/styles';

export interface GamesListProps {
  onCreateNewGame?: () => void
};

const useComponentStyles = makeStyles({
  preview: {
    maxWidth: '250px'
  }
})

export const GamesList: FC<GamesListProps> = observer((props) => {
  const store = useStore();
  const classes = useCommonStyles();
  const componentClasses = useComponentStyles();

  const hasGames = store.games.length > 0;

  return (
    <Grid container justify="center" alignContent="center">
      {hasGames && store.games.map((game) => (
        <Grid item xs={12} className={classes.gridItem} key={game.id}>
          <h2>{game.title}</h2>
          <img src={URL.createObjectURL(game.screens[0].picture)} className={componentClasses.preview} alt="Превью игры"></img>
        </Grid>
      ))}
      {!hasGames && <Grid item xs={12}><Message>У вас нет ни одной игры. Попробуйте создать одну.</Message></Grid>}
      <Grid item xs={12} className={classes.gridItem}>
        <Link to="/create-game" className={classes.link}>
          <Button variant="contained" color="primary" size="large" startIcon={<AddIcon />}>
            Создать новую игру
            </Button>
        </Link>
      </Grid>
    </Grid>

  );
})

export default GamesList
