import React, { FC } from 'react';

const games = [
  { picture: 'PICT1', melody: '' },
  { picture: 'PICT2', melody: '' },
  { picture: 'PICT3', melody: '' }
]

export const GamesList: FC = () => {

  const gamesList = games.map((game) => (
    <p key={game.picture}>{game.picture}</p>
  ))
  return (
    <div>{gamesList}</div>
  );
}

export default GamesList