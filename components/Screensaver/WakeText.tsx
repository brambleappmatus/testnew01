'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from '@motionone/dom';

export default function WakeText() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animate(
        containerRef.current,
        { 
          opacity: [0, 1],
          y: [10, 0]
        },
        { 
          duration: 1,
          easing: [0.22, 1, 0.36, 1]
        }
      );
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-24 left-0 right-0 text-center space-y-1.5 transition-opacity duration-500"
    >
      <p 
        className="text-sm md:text-base bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-medium tracking-wide"
        style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}
      >
        Tap to wake screen 🐾
      </p>
      <p 
        className="text-xs md:text-sm bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-300 bg-clip-text text-transparent"
        style={{ textShadow: '0 0 20px rgba(255,255,255,0.15)' }}
      >
        and save shelter pets 🏠
      </p>
    </div>
  );
}