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
          d: [
            'M 0 50 C 150 50 150 20 300 20 C 450 20 450 50 600 50 L 600 100 L 0 100 Z',
            'M 0 50 C 150 50 150 80 300 80 C 450 80 450 50 600 50 L 600 100 L 0 100 Z',
            'M 0 50 C 150 50 150 20 300 20 C 450 20 450 50 600 50 L 600 100 L 0 100 Z'
          ]
        },
        {
          duration: 5,
          delay,
          repeat: Infinity,
          easing: 'ease-in-out'
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
      />
    </svg>
  );
}