import { AppBar, Button, CssBaseline, makeStyles, Snackbar, Toolbar, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import React, { useCallback } from 'react';

import logo from '../assets/logo.svg'

import { StoreProvider } from '../core/store';
import GamesList from './components/games-list/games-list';
import GameConstructor from './components/game-constructor/game-constructor';
import { PRIMARY_COLOR, SECONDARY_COLOR, useCommonStyles } from '../core/styles';
import GameOneCLick from './components/game-one-click/game-one-click';
import LoginForm from './components/login-form/login-form';
import RegistrationForm from './components/registration-form/registration-form';
import SnackMessage from './components/snack-message/snack-message';
import { observer } from 'mobx-react-lite';
import { MessageService } from '../core/message-service';
import DialogConfirm from './components/dialog-confirm/dialog-confirm';
import { DialogService } from '../core/dialog-service';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
  },
});

const useComponentStyles = makeStyles({
  navLink: {
    margin: '0px 15px',
    fontSize: '125%',
    fontWeight: 'bold',

  },
  title: {
    marginRight: '20px',
  },
  logo: {
    height: '64px',
  },
  spacer: {
    flexGrow: 1,
  },
});

export const App = observer(() => {
  const classes = useCommonStyles();
  const componentClasses = useComponentStyles();
  const messageService = MessageService.getInstance();
  const dialogService = DialogService.getInstance();
  const closeSnackBar = useCallback(() => {
    messageService.clearMessage();
  }, [messageService]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreProvider>
        <Router>
          <AppBar position="relative" color="secondary">
            <Toolbar>
              <Link to="/" className={classes.link}>
                <img src={logo} className={componentClasses.logo} alt="Логотип пространства общения"/>
              </Link>
              <Link to="/" className={classes.link}>
                <Button className={componentClasses.navLink} color="inherit" disableElevation>Мои Игры</Button>
              </Link>
              <Link to="/create-game" className={classes.link}>
                <Button className={componentClasses.navLink} color="inherit" disableElevation>Создать новую игру</Button>
              </Link>
              <div className={componentClasses.spacer}></div>
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
            <DialogConfirm title={dialogService.data?.title} message={dialogService.data?.message} 
              onClose={dialogService.data?.onClose} onConfim={dialogService.data?.onConfim}></DialogConfirm>
          </main>
        </Router>
      </StoreProvider>
    </ThemeProvider>
  );
});

export default App;
