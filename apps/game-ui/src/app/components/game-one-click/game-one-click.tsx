import { useStore } from '../../../core/store';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SimpleTarget } from '../simple-target/simple-target';
import { Position2D } from '../simple-target/simple-target-interfaces';

import { observer } from 'mobx-react-lite';
import { Grid, makeStyles } from '@material-ui/core';
import { useCommonStyles } from '../../../core/styles';
import { GameModel } from '../../../core/interfaces';
import WinScreen from '../game-win-screen/game-win-screen';

const TIMEOUT = 5000;

interface GameOneCLickRouterParams {
  id: string;
}

const useComponentStyles = makeStyles({
  game: {
    backgroundColor: '#f0f0f0',
  }
});

let afterHitTimeoutID: ReturnType<typeof setTimeout>;

export const GameOneCLick: FC = observer(() => {
  const { id } = useParams<GameOneCLickRouterParams>();
  const classes = useCommonStyles();
  const componentClasses = useComponentStyles();
  const store = useStore();
  const game = store.games.find((game) => game.id === id);

  const gameEl = useRef<HTMLDivElement>(null);
  const [isInGamePlayMode, setGamePlayMode] = useState(false);
  const [showWinScreen, setShowWinScreen] = useState(false);
  useEffect(() => {
    const handleFullscreenChange = (event) => {
      const isFullScreen = document.fullscreenElement === event.target;
      if (!isFullScreen) {
        clearTimeout(afterHitTimeoutID);
      }
      setGamePlayMode(isFullScreen);
      if (!isFullScreen) {
        setShowWinScreen(false);
      }
    };
    const element = gameEl.current;
    element?.addEventListener("fullscreenchange", handleFullscreenChange);
    return function cleanup() {
      element?.removeEventListener("fullscreenchange", handleFullscreenChange);
    }
  }, []);
  const [targetPosition, setTargetPosition] = useState<Position2D>();

  const requestGameFullscreen = () => gameEl.current?.requestFullscreen();

  const positionTarget = () => {
    const gameH = gameEl.current?.offsetHeight as number;
    const gameW = gameEl.current?.offsetWidth as number;

    const targetPositionH = Math.random() * gameH / 1.5;
    const targetPositionW = Math.random() * gameW / 1.5;

    setTargetPosition({ x: targetPositionW, y: targetPositionH });
  };

  const handleGameStart = async () => {
    await requestGameFullscreen();
    positionTarget();
  };

  const handleTargetHit = () => {
    setShowWinScreen(true);
    afterHitTimeoutID = setTimeout(() => {
      positionTarget();
      setShowWinScreen(false);
    }, TIMEOUT);
  };

  const getRandomScreen = useCallback(() => {
    const gameModel = game as GameModel;
    const n = gameModel.screens.length;

    const randomIndex = Math.floor(Math.random() * n);
    console.log(randomIndex, gameModel.screens[randomIndex], gameModel.screens)
    return gameModel.screens[randomIndex];
  }, [game]);

  return (
    <Grid container className={classes.gridRoot} justify="center" alignContent="center">
      {!game && <Grid item xs={12} className={classes.gridItem}></Grid>}
      {game && <Grid item xs={12} className={classes.gridItem}><h2>{game.title}</h2></Grid>}
      <div className={componentClasses.game} ref={gameEl}>
        {
          isInGamePlayMode && !showWinScreen &&
          <SimpleTarget position={targetPosition} onTargetHit={handleTargetHit}></SimpleTarget>
        }
        {
          isInGamePlayMode && showWinScreen &&
          <WinScreen screen={getRandomScreen()}></WinScreen>
        }
      </div>
      <button onClick={handleGameStart}>Play Full Screen</button>
    </Grid>
  );
})

export default GameOneCLick;