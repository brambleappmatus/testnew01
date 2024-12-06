'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import GradientBackground from './GradientBackground';
import ScreenContent from './ScreenContent';
import { fadeIn, fadeOut } from './animations/useScreensaverTransition';
import { useScreensaver } from '@/hooks/useScreensaver';

export default function Screensaver() {
  const { isActive, isVisible, stopScreensaver, resetTimer } = useScreensaver(5000);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const moveIntervalRef = useRef<NodeJS.Timeout>();

  const handleUserActivity = useCallback((e: Event) => {
    e.stopPropagation();
    
    if (isActive) {
      stopScreensaver();
    } else {
      resetTimer();
    }
  }, [isActive, stopScreensaver, resetTimer]);

  useEffect(() => {
    if (isActive && containerRef.current) {
      fadeIn(containerRef.current);

      moveIntervalRef.current = setInterval(() => {
        setPosition({
          x: 20 + Math.random() * 60,
          y: 20 + Math.random() * 60
        });
      }, 10000);

      return () => {
        if (moveIntervalRef.current) {
          clearInterval(moveIntervalRef.current);
        }
      };
    }
  }, [isActive]);

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keypress', 'touchstart', 'scroll'];
    
    events.forEach(event => {
      window.addEventListener(event, handleUserActivity, { passive: true });
    });

    return () => {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
      }
      
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [handleUserActivity]);

  const handleScreensaverClick = useCallback(() => {
    if (containerRef.current) {
      fadeOut(containerRef.current, stopScreensaver);
    }
  }, [stopScreensaver]);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer bg-black/95 backdrop-blur-xl overflow-hidden opacity-0"
      onClick={handleScreensaverClick}
    >
      <GradientBackground />
      <ScreenContent position={position} />
    </div>
  );
}