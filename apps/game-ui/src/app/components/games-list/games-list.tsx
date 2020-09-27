import { observer } from 'mobx-react';
import React, { FC } from 'react';

import { useStore } from '../../../core/store';

export interface GamesListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  games: any[]
};

export const GamesList: FC<GamesListProps> = observer((props) => {
  const store = useStore();

  const gamesList = props.games.map((game) => (
    <p key={game.picture}>{game.picture}</p>
  ));
  
  return (
    <>
      <p>{store.isAuthenticated ? "Authenticated" : "Not Authenticated"}</p>
      <div>{gamesList}</div>
    </>
    
  );
})

export default GamesList
