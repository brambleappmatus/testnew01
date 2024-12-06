'use client';

import React, { useEffect, useRef } from 'react';
import GradientBackground from './GradientBackground';
import ScreenContent from './ScreenContent';
import { fadeIn, fadeOut } from './animations/useScreensaverTransition';
import { useScreensaver } from '@/hooks/useScreensaver';

export default function Screensaver() {
  const { isActive, isVisible, stopScreensaver, resetTimer } = useScreensaver(5000);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleUserActivity = React.useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement> | KeyboardEvent) => {
    if (isActive) {
      if (containerRef.current) {
        fadeOut(containerRef.current);
        setTimeout(stopScreensaver, 800);
      }
    } else {
      resetTimer();
    }
  }, [isActive, stopScreensaver, resetTimer]);

  useEffect(() => {
    if (isActive && containerRef.current) {
      fadeIn(containerRef.current);
    }
  }, [isActive]);

  useEffect(() => {
    const handleGlobalActivity = (e: Event) => {
      handleUserActivity(e as any);
    };

    const events = ['mousemove', 'mousedown', 'keypress', 'touchstart', 'scroll'];
    events.forEach(event => {
      window.addEventListener(event, handleGlobalActivity);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleGlobalActivity);
      });
    };
  }, [handleUserActivity]);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer bg-black/95 backdrop-blur-xl overflow-hidden opacity-0"
      onClick={handleUserActivity}
    >
      <GradientBackground />
      <ScreenContent />
    </div>
  );
}