'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from '@motionone/dom';

interface WaveProps {
  color: string;
  delay?: number;
}

export default function Wave({ color, delay = 0 }: WaveProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      animate(
        pathRef.current,
        {
          transform: [
            'translate3d(0, 0, 0)',
            'translate3d(0, 30px, 0)',
            'translate3d(0, 0, 0)'
          ]
        },
        {
          duration: 5,
          delay,
          repeat: Infinity,
          easing: [0.4, 0, 0.2, 1]
        }
      );
    }
  }, [delay]);

  return (
    <svg viewBox="0 0 600 100" className="w-full absolute bottom-0 left-0">
      <path
        ref={pathRef}
        d="M 0 50 C 150 50 150 20 300 20 C 450 20 450 50 600 50 L 600 100 L 0 100 Z"
        fill={color}
        style={{ transformOrigin: 'center', transform: 'translate3d(0, 0, 0)' }}
      />
    </svg>
  );
}