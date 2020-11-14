import { AppBar, Button, CssBaseline, makeStyles, Snackbar, Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import React, { useCallback } from 'react';

import './app.scss';

import { StoreProvider } from '../core/store';
import GamesList from './components/games-list/games-list';
import GameConstructor from './components/game-constructor/game-constructor';
import { useCommonStyles } from '../core/styles';
import GameOneCLick from './components/game-one-click/game-one-click';
import LoginForm from './components/login-form/login-form';
import RegistrationForm from './components/registration-form/registration-form';
import SnackMessage from './components/snack-message/snack-message';
import { observer } from 'mobx-react-lite';
import { MessageService } from '../core/message-service';

const useComponentStyles = makeStyles({
  navLink: {
    margin: '0px 15px',
  },
  title: {
    marginRight: '20px',
  }
});

export const App = observer(() => {
  const classes = useCommonStyles();
  const componentClasses = useComponentStyles();
  const messageService = MessageService.getInstance();
  const closeSnackBar = useCallback(() => {
    messageService.clearMessage();
  }, [messageService]);

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
              <Route path="/create-game/:id?">
                <GameConstructor></GameConstructor>
              </Route>
              <Route path="/game/:id">
                <GameOneCLick></GameOneCLick>
              </Route>
              <Route path="/">
                <GamesList></GamesList>
              </Route>
            </Switch>
            <Snackbar open={!!messageService.data} autoHideDuration={8000} onClose={closeSnackBar}>
              <SnackMessage status={messageService.data?.status}>{messageService.data?.message}</SnackMessage>
            </Snackbar>
          </main>
        </Router>
      </StoreProvider>
    </>
  );
});

export default App;
