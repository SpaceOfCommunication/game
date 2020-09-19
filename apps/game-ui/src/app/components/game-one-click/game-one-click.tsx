import React, { FC, useEffect, useRef, useState } from 'react';
import { SimpleTarget } from '../simple-target/simple-target';
import { Position2D } from '../simple-target/simple-target-interfaces';

import './game-one-click.scss';

let afterHitTimeoutID: ReturnType<typeof setTimeout>;

export const GameOneCLick : FC = () => {

    const gameEl = useRef<HTMLDivElement>(null);
    const [isInGamePlayMode, setGamePlayMode] = useState(false);
    useEffect(() => {
        const handleFullscreenChange = (event) => {
            const isFullScreen = document.fullscreenElement === event.target;
            if (!isFullScreen) {
                clearTimeout(afterHitTimeoutID);
            }
            setGamePlayMode(isFullScreen);
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

        setTargetPosition({ x: targetPositionW, y: targetPositionH});
    };

    const handleGameStart = async () => {
        await requestGameFullscreen();
        positionTarget();
    };

    const handleTargetHit = () => {
        setGamePlayMode(false);
        afterHitTimeoutID = setTimeout(() => {
            positionTarget();
            setGamePlayMode(true);
        }, 2500);
    }

    return (
        <>
            <div className="game-one-click" ref={gameEl}>
                { 
                    isInGamePlayMode && 
                    <SimpleTarget position={targetPosition} onTargetHit={handleTargetHit}></SimpleTarget> 
                }
            </div>
            <button onClick={handleGameStart}>Play Full Screen</button>
        </>
    );
}

export default GameOneCLick;