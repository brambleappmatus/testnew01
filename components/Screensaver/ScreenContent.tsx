'use client';

import React, { useState, useEffect } from 'react';
import HelloText from './HelloText';
import ShelterStats from './ShelterStats';
import PetFacts from './PetFacts';
import WakeText from './WakeText';

const DISPLAY_DURATION = 15000; // 15 seconds per content

export default function ScreenContent() {
  const [contentIndex, setContentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWakeText, setShowWakeText] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        const nextIndex = (contentIndex + 1) % 3;
        setContentIndex(nextIndex);
        setIsTransitioning(false);
        
        // Only show wake text for hello and facts screens
        setShowWakeText(nextIndex !== 1);
      }, 800); // Longer fade transition
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
        className={`flex-1 flex items-center transition-opacity duration-800 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
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