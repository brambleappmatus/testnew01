'use client';

import React, { useState, useEffect } from 'react';
import HelloText from './HelloText';
import ShelterStats from './ShelterStats';
import PetFacts from './PetFacts';
import WakeText from './WakeText';
import { animate } from '@motionone/dom';

const DISPLAY_DURATION = 15000; // 15 seconds per content

export default function ScreenContent() {
  const [contentIndex, setContentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWakeText, setShowWakeText] = useState(true);
  const contentRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (contentRef.current) {
        animate(
          contentRef.current,
          { opacity: [1, 0] },
          { duration: 0.8, easing: [0.4, 0, 0.2, 1] }
        );
      }
      
      setIsTransitioning(true);
      
      setTimeout(() => {
        const nextIndex = (contentIndex + 1) % 3;
        setContentIndex(nextIndex);
        setShowWakeText(nextIndex !== 1);
        setIsTransitioning(false);
        
        if (contentRef.current) {
          animate(
            contentRef.current,
            { opacity: [0, 1] },
            { duration: 0.8, easing: [0.4, 0, 0.2, 1] }
          );
        }
      }, 800);
    }, DISPLAY_DURATION);

    return () => clearInterval(interval);
  }, [contentIndex]);

  const renderContent = () => {
    switch (contentIndex) {
      case 0:
        return <HelloText />;
      case 1:
        return <ShelterStats />;
      case 2:
        return <PetFacts />;
      default:
        return <HelloText />;
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col justify-center items-center">
      <div 
        ref={contentRef}
        className="flex-1 flex items-center"
      >
        {renderContent()}
      </div>
      {showWakeText && (
        <div className={`transition-opacity duration-500 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          <WakeText />
        </div>
      )}
    </div>
  );
}