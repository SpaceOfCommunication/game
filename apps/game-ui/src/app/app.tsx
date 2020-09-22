import React from 'react';
// import { Auth } from '../core/auth';
import { StoreProvider } from '../core/store';

import './app.scss';

import GameOneCLick from './components/game-one-click/game-one-click';
import GamesList from './components/games-list/games-list';

export const App = () => {

  // if (!user.isAuthenticated) {
  //   Auth.login('batman', 'brucewayne').then((authData) => {
  //     user.setAuthData(authData);
  //     console.log('AUTH', user.isAuthenticated);
  //   })
  // }

  return (
    <StoreProvider>
      <GamesList></GamesList>
      <GameOneCLick></GameOneCLick>
    </StoreProvider>
  );
};

export default App;
