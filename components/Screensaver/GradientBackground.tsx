'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from '@motionone/dom';

export default function GradientBackground() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gradientRef.current) {
      animate(
        gradientRef.current,
        { 
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        },
        { 
          duration: 20,
          repeat: Infinity,
          easing: [0.4, 0, 0.2, 1]
        }
      );
    }
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-black opacity-95" />
      <div
        ref={gradientRef}
        className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-indigo-900/30 via-purple-900/30 to-blue-900/30"
        style={{ 
          backgroundSize: '400% 400%',
          filter: 'blur(100px)'
        }}
      />
    </>
  );
}