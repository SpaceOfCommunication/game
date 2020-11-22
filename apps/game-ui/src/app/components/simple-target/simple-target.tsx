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

export const SimpleTarget: FC<SimpleTargetProps> = (props) => {
  const classes = useStyles();
  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const targetEl = targetRef.current;
    if (targetEl && props.position?.y && props.position?.x) {
      targetEl.style.transform = `translate(${props.position.x}px, ${props.position.y}px)`
    }
  });
  return (
    <div className={classes.target} ref={targetRef} onClick={props.onTargetHit}></div>
  );
}