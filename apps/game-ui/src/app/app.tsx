import { AppBar, CssBaseline, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';

import './app.scss';

import { StoreProvider } from '../core/store';
import GamesList from './components/games-list/games-list';
import GameConstructor from './components/game-constructor/game-constructor';

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexGrow: 1
  }
});

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
                <GamesList></GamesList>
              </Route>
            </Switch>
          </Router>

        </main>
      </StoreProvider>
    </>
  );
};

export default App;
