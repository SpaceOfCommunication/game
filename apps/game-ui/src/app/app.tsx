import React from 'react';
import GameOneCLick from './components/game-one-click/game-one-click';

import './app.scss';
import GamesList from './components/games-list/games-list';
import { DB } from '../core/db';

export const App = () => {

  const db = new DB();
  db.signUp('batman', 'brucewayne');
  // db.login();

  return (
    <>
      <GamesList></GamesList>
      <GameOneCLick></GameOneCLick>
    </>
  );
};

export default App;
