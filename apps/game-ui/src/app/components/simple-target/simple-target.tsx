import React, { FC, useEffect, useRef } from 'react';
import { SimpleTargetProps } from './simple-target-interfaces';

import './simple-target.scss';

export const SimpleTarget : FC<SimpleTargetProps> = (props) => {
    const targetRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const targetEl = targetRef.current;
        if (targetEl && props.position?.y && props.position?.x) {
            targetEl.style.transform = `translate(${props.position.x}px, ${props.position.y}px)`
        }
    });
    return (
        <div className="simple-target" ref={targetRef} onClick={props.onTargetHit}></div>
    );
}