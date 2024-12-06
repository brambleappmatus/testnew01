'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from '@motionone/dom';
import { getRandomExample } from '@/utils/donationExamples';
import { formatCurrency } from '@/utils/formatters';

export default function ShelterStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentAmount] = React.useState(6.80);
  const [currentExample] = React.useState(() => 
    getRandomExample(currentAmount)
  );
  
  useEffect(() => {
    if (containerRef.current) {
      // Fade in animation
      animate(
        containerRef.current,
        { 
          opacity: [0, 1],
          y: [20, 0],
          scale: [0.9, 1]
        },
        { 
          duration: 2,
          easing: [0.22, 1, 0.36, 1]
        }
      );

      // Gentle floating animation
      animate(
        containerRef.current,
        {
          y: [0, -4, 0],
          scale: [1, 1.01, 1]
        },
        {
          duration: 6,
          repeat: Infinity,
          easing: [0.33, 1, 0.68, 1]
        }
      );
    }
  }, []);

  const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());
  
  return (
    <div ref={containerRef} className="text-center space-y-6 transform-gpu">
      <div className="space-y-2">
        <p 
          className="text-lg md:text-xl bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-medium"
          style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}
        >
          {currentMonth} Donations
        </p>
        <div 
          className="text-8xl md:text-9xl lg:text-[10rem] font-bold bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent"
          style={{ 
            filter: 'brightness(1.2) contrast(1.1)',
            textShadow: '0 0 40px rgba(255,255,255,0.25)',
            lineHeight: '1'
          }}
        >
          {formatCurrency(currentAmount)}
        </div>
      </div>
      <div className="space-y-2">
        <p 
          className="text-xl md:text-2xl bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-medium"
          style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}
        >
          {currentExample.title}
        </p>
        <p 
          className="text-base md:text-lg bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-300 bg-clip-text text-transparent"
          style={{ textShadow: '0 0 20px rgba(255,255,255,0.15)' }}
        >
          {currentExample.impact}
        </p>
      </div>
    </div>
  );
}