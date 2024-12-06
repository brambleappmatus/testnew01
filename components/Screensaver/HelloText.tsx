'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from '@motionone/dom';

const letters = 'hello'.split('');
const colors = [
  'from-blue-400 to-indigo-500',    // h
  'from-indigo-500 to-purple-500',  // e
  'from-purple-500 to-blue-500',    // l
  'from-blue-500 to-indigo-500',    // l
  'from-indigo-500 to-purple-500'   // o
];

export default function HelloText() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const elements = textRef.current.querySelectorAll('.letter');

      // Initial fade in animation
      animate(
        elements,
        { 
          opacity: [0, 1],
          x: [-20, 0],
          y: [10, 0],
          scale: [0.9, 1]
        },
        { 
          duration: 2,
          delay: (_, i) => i * 0.15,
          easing: [0.22, 1, 0.36, 1]
        }
      );

      // Simple floating animation for each letter
      elements.forEach((element, index) => {
        const isEven = index % 2 === 0;
        const delay = index * 0.2;
        
        animate(
          element,
          {
            y: [0, isEven ? -8 : -6],
            scale: [1, 1.02],
            rotate: [0, isEven ? 1 : -1]
          },
          {
            duration: 2.5,
            delay,
            direction: "alternate",
            repeat: Infinity,
            easing: [0.33, 1, 0.68, 1]
          }
        );
      });
    }
  }, []);

  return (
    <div ref={textRef} className="flex justify-center items-center">
      {letters.map((letter, index) => (
        <div
          key={index}
          className={`letter text-8xl md:text-9xl font-bold bg-gradient-to-r ${colors[index]} bg-clip-text text-transparent opacity-0 transform-gpu`}
          style={{ 
            filter: 'brightness(1.2) contrast(1.1)',
            textShadow: '0 0 40px rgba(255,255,255,0.25)',
            transformOrigin: 'center center',
            display: 'inline-block',
            margin: '0 -0.05em'
          }}
        >
          {letter}
        </div>
      ))}
    </div>
  );
}