import { AppBar, Button, CssBaseline, Grid, makeStyles, styled, Toolbar, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

import './app.scss';

import { StoreProvider } from '../core/store';
import GamesList from './components/games-list/games-list';

const Message = (props) => {
  return <Typography variant="h5" align="center" color="textSecondary" paragraph>
    {props.children}
  </Typography>
}

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexGrow: 1
  },
});

const games = [
  // { picture: 'PICT1', melody: '' },
  // { picture: 'PICT2', melody: '' },
  // { picture: 'PICT3', melody: '' }
];
const hasGames = games.length > 0;


export const App = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <StoreProvider>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Пространство Общения - Игры
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.main}>
          {hasGames && <GamesList games={games}></GamesList>}
          <Grid container spacing={2} justify="center" alignContent="center">
            {!hasGames && <Grid item xs={12}><Message>У вас нет ни одной игры. Попробуйте создать одну.</Message></Grid>}
            <Grid item><Button variant="contained" color="primary" size="large" startIcon={<AddIcon />}>Создать новую игру</Button></Grid>
          </Grid>
        </main>
      </StoreProvider>
    </>
  );
};

export default App;
