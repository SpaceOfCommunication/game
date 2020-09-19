import React from 'react';
import GameOneCLick from './components/game-one-click/game-one-click';

import './app.scss';
import GamesList from './components/games-list/games-list';

export const App = () => {
  return (
    <>
      <GamesList></GamesList>
      <GameOneCLick></GameOneCLick>
    </>
  );
};

export default App;
