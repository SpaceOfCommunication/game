import { AppBar, Button, CssBaseline, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import React from 'react';

import './app.scss';

import { StoreProvider } from '../core/store';
import GamesList from './components/games-list/games-list';
import GameConstructor from './components/game-constructor/game-constructor';
import Message from './components/ui/message';

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexGrow: 1
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
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
          <Router>
            <Switch>
              <Route path="/create-game">
                <GameConstructor></GameConstructor>
              </Route>
              <Route path="/">
                {hasGames && <GamesList games={games}></GamesList>}
                <Grid container justify="center" alignContent="center">
                  {!hasGames && <Grid item xs={12}><Message>У вас нет ни одной игры. Попробуйте создать одну.</Message></Grid>}
                  <Grid item>
                    <Link to="/create-game" className={classes.link}>
                      <Button variant="contained" color="primary" size="large" startIcon={<AddIcon />}>
                        Создать новую игру
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Route>
            </Switch>
          </Router>

        </main>
      </StoreProvider>
    </>
  );
};

export default App;
