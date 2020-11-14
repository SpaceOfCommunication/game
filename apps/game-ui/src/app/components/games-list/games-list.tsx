import { Button } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { useCommonStyles } from '../../../core/styles';

import { useStore } from '../../../core/store';
import { useGameListStyles } from './game-list.styles';

export interface GamesListProps {
  onCreateNewGame?: () => void
};

export const GamesList: FC<GamesListProps> = observer((props) => {
  const store = useStore();
  const classes = useCommonStyles();
  const componentClasses = useGameListStyles();
  const history = useHistory();

  const hasGames = store.games.length > 0;

  return (
    <div className={componentClasses.gameList}>
      {hasGames && store.games.map((game) => (
        <div className={componentClasses.gameBlock}>
          <div className={componentClasses.gameBlockInner}>
            <Link to={`/game/${game.id}`} className={`${componentClasses.contentWrapper} ${classes.link}`}>
              <h2>{game.title}</h2>
              <div className={componentClasses.previewWrapper}>
                <img src={URL.createObjectURL(game.screens[0].picture)} className={componentClasses.preview} alt="Превью игры"></img>
                <div className={componentClasses.playOverlay}>
                  <PlayArrowIcon className={componentClasses.playIcon} />
                </div>
              </div>
            </Link>
            <div className={componentClasses.buttons}>
              <Button color="primary" startIcon={<CreateIcon />}>Редактировать</Button>
              <Button color="secondary" startIcon={<DeleteForeverIcon />}>Удалить</Button>
            </div>
          </div>
        </div>
      ))}
      <div onClick={() => history.push('/create-game')} className={componentClasses.gameBlock}>
        <div className={`${componentClasses.gameBlockInner} ${componentClasses.newGameBlock}`}>
          <AddToQueueIcon className={componentClasses.newGameBlockIcon} />
          <span>Создать новую игру</span>
        </div>
      </div>
    </div>
  );
})

export default GamesList
