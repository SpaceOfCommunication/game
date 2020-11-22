import { useStore } from '../../../core/store';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SimpleTarget } from '../simple-target/simple-target';
import { Position2D } from '../simple-target/simple-target-interfaces';
import SendIcon from '@material-ui/icons/Send';

import { observer } from 'mobx-react-lite';
import { Button, makeStyles } from '@material-ui/core';
import { GameModel } from '../../../core/interfaces';
import WinScreen from '../game-win-screen/game-win-screen';
import { DEFAULT_MELODY_DURATION } from '../../../core/constants';

interface GameOneCLickRouterParams {
  id: string;
}

const useComponentStyles = makeStyles({
  rootWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  game: {
    backgroundColor: '#000000',
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    paddingBottom: '40px',
  },
  preview: {
    height: '400px',
    borderRadius: '50px',
    marginBottom: '40px',
  },
  playButton: {
    fontSize: '140%',
  },
  playButtonText: {
    padding: '10px',
  }
});

let afterHitTimeoutID: ReturnType<typeof setTimeout>;

export const GameOneCLick: FC = observer(() => {
  const { id } = useParams<GameOneCLickRouterParams>();
  const componentClasses = useComponentStyles();
  const store = useStore();
  const game = store.games.find((game) => game.id === id);

  const gameEl = useRef<HTMLDivElement>(null);
  const [isInGamePlayMode, setGamePlayMode] = useState(false);
  const [showWinScreen, setShowWinScreen] = useState(false);

  useEffect(() => {
    const gameDOMEl = gameEl.current;
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
    gameDOMEl?.addEventListener("fullscreenchange", handleFullscreenChange);
    return function cleanup() {
      gameDOMEl?.removeEventListener("fullscreenchange", handleFullscreenChange);
    }
  }, [game]);
  const [targetPosition, setTargetPosition] = useState<Position2D>();

  const requestGameFullscreen = () => gameEl.current?.requestFullscreen();

  const positionTarget = useCallback(() => {
    const gameH = gameEl.current?.offsetHeight as number;
    const gameW = gameEl.current?.offsetWidth as number;

    const targetPositionH = Math.random() * gameH / 1.5;
    const targetPositionW = Math.random() * gameW / 1.5;

    setTargetPosition({ x: targetPositionW, y: targetPositionH });
  }, [setTargetPosition]);

  const handleGameStart = async () => {
    await requestGameFullscreen();
    positionTarget();
  };

  const handleTargetHit = useCallback(() => {
    setShowWinScreen(true);
    afterHitTimeoutID = setTimeout(() => {
      positionTarget();
      setShowWinScreen(false);
    }, (game?.audioDuration || DEFAULT_MELODY_DURATION) * 1000);
  }, [setShowWinScreen, game?.audioDuration, positionTarget]);

  const getRandomScreen = useCallback(() => {
    const gameModel = game as GameModel;
    const n = gameModel.screens.length;

    const randomIndex = Math.floor(Math.random() * n);
    return gameModel.screens[randomIndex];
  }, [game]);

  return (
    <div className={componentClasses.rootWrapper}>
      {!game && <div>Игра не найдена</div>}
      {game &&
        <div className={componentClasses.infoWrapper}>
          <h1>{game.title}</h1>
          <img src={URL.createObjectURL(game.screens[0].picture)} className={componentClasses.preview} alt="Превью игры"></img>
          <Button onClick={handleGameStart} className={componentClasses.playButton} variant="contained" color="primary">
            <span className={componentClasses.playButtonText}>Играть</span><SendIcon />
          </Button>
        </div>
      }
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
    </div>
  );
})

export default GameOneCLick;