import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

import { StoreProvider } from '../core/store';

import './app.scss';

export const App = () => {



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
        <main>
          
        </main>
    </StoreProvider>
    </>

  );
};

export default App;
