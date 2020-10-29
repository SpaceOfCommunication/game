import { AppBar, Button, CssBaseline, makeStyles, Paper, Snackbar, Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import React from 'react';

import './app.scss';

import { StoreProvider } from '../core/store';
import GamesList from './components/games-list/games-list';
import GameConstructor from './components/game-constructor/game-constructor';
import { useCommonStyles } from '../core/styles';
import GameOneCLick from './components/game-one-click/game-one-click';
import LoginForm from './components/login-form/login-form';
import RegistrationForm from './components/registration-form/registration-form';

const useComponentStyles = makeStyles({
  navLink: {
    margin: '0px 15px',
  },
  title: {
    marginRight: '20px',
  }
});

export const App = () => {
  const classes = useCommonStyles();
  const componentClasses = useComponentStyles();

  return (
    <>
      <CssBaseline />
      <StoreProvider>
        <Router>
          <AppBar position="relative">
            <Toolbar>
              <Typography className={componentClasses.title} variant="h6" color="inherit" noWrap>
                Пространство Общения
            </Typography>
              <Link to="/" className={classes.link}>
                <Button className={componentClasses.navLink} color="inherit" disableElevation>Игры</Button>
              </Link>
              <Link to="/create-game" className={classes.link}>
                <Button className={componentClasses.navLink} color="inherit" disableElevation>Создать новую игру</Button>
              </Link>
              <Link to="/login" className={classes.link}>
                <Button className={componentClasses.navLink} color="inherit" disableElevation>Войти</Button>
              </Link>
            </Toolbar>
          </AppBar>
          <main className={classes.main}>
            <Switch>
              <Route path="/login">
                <LoginForm></LoginForm>
              </Route>
              <Route path="/registration">
                <RegistrationForm></RegistrationForm>
              </Route>
              <Route path="/create-game">
                <GameConstructor></GameConstructor>
              </Route>
              <Route path="/game/:id">
                <GameOneCLick></GameOneCLick>
              </Route>
              <Route path="/">
                <GamesList></GamesList>
              </Route>
            </Switch>
            <Snackbar open={true} autoHideDuration={6000}>
              <Paper elevation={3}>This is a success message!</Paper>
            </Snackbar>
          </main>
        </Router>
      </StoreProvider>1
    </>
  );
};

export default App;
