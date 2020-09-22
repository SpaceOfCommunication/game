import { useStore } from 'apps/game-ui/src/core/store';
import { observer } from 'mobx-react';
import React, { FC } from 'react';

const games = [
  { picture: 'PICT1', melody: '' },
  { picture: 'PICT2', melody: '' },
  { picture: 'PICT3', melody: '' }
]

export const GamesList: FC = observer(() => {
  const store = useStore();

  const gamesList = games.map((game) => (
    <p key={game.picture}>{game.picture}</p>
  ))
  return (
    <>
      <p>{store.isAuthenticated ? "Authenticated" : "Not Authenticated"}</p>
      <div>{gamesList}</div>
    </>
    
  );
})

export default GamesList