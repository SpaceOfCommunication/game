import { makeStyles } from '@material-ui/core';
import React, { FC, useEffect, useRef } from 'react';
import { SimpleTargetProps } from './simple-target-interfaces';

// #fa6f1c
const useStyles = makeStyles({
  target: {
    position: 'absolute',
    backgroundColor: '#e6ec2a',
    width: '200px',
    height: '200px',
    borderRadius: '100px'
  }
});

// function specialButtonPressHandler(event: KeyboardEvent) {
//   if (event.key === 'Enter') {

//   }
// }

export const SimpleTarget: FC<SimpleTargetProps> = (props) => {
  const { position, onTargetHit } = props;
  const classes = useStyles();
  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const targetEl = targetRef.current;
    if (targetEl && position?.y && position?.x) {
      targetEl.style.transform = `translate(${position.x}px, ${position.y}px)`
    }
    const specialButtonPressHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && onTargetHit) {
        onTargetHit();
      }
    }
    window.addEventListener('keydown', specialButtonPressHandler);
    return () => {
      window.removeEventListener('keydown', specialButtonPressHandler);
    }
  }, [position?.y, position?.x, onTargetHit]);
  return (
    <div className={classes.target} ref={targetRef} onClick={onTargetHit}></div>
  );
}