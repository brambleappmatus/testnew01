'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from '@motionone/dom';

const facts = [
  {
    title: "Did you know?",
    fact: "A cat's nose print is unique, just like a human's fingerprint 🐱"
  },
  {
    title: "Fun Fact",
    fact: "Dogs' sense of smell is about 40x better than humans 🐕"
  },
  {
    title: "Amazing Fact",
    fact: "Cats spend 70% of their lives sleeping 😴"
  },
  {
    title: "Shelter Facts",
    fact: "The average shelter dog knows how to respond to 8 commands 🎓"
  },
  {
    title: "Did you know?",
    fact: "A purring cat can help heal bones and muscles 💪"
  },
  {
    title: "Fun Fact",
    fact: "Dogs can understand over 150 words and gestures 🧠"
  },
  {
    title: "Shelter Facts",
    fact: "Shelter pets make some of the most loyal companions 💝"
  },
  {
    title: "Amazing Fact",
    fact: "Adopting one pet makes room for another to be saved 🏠"
  },
  {
    title: "Did you know?",
    fact: "Cats have an extra organ that allows them to taste scents in the air 👃"
  },
  {
    title: "Fun Fact",
    fact: "A dog's whiskers help them navigate in the dark 🌙"
  },
  {
    title: "Amazing Fact",
    fact: "Cats can't taste sweetness - they lack sweet taste receptors 🍬"
  },
  {
    title: "Shelter Facts",
    fact: "Most shelter pets are already house-trained 🏡"
  },
  {
    title: "Did you know?",
    fact: "Cats can jump up to six times their length 🦘"
  },
  {
    title: "Fun Fact",
    fact: "Dogs dream just like humans do 💭"
  },
  {
    title: "Amazing Fact",
    fact: "A cat's brain structure is 90% similar to a human's 🧩"
  },
  {
    title: "Shelter Facts",
    fact: "25% of shelter pets are purebred 🏆"
  },
  {
    title: "Did you know?",
    fact: "Cats have 32 muscles in each ear 👂"
  },
  {
    title: "Fun Fact",
    fact: "Dogs can smell human emotions 🌟"
  },
  {
    title: "Amazing Fact",
    fact: "Cats only meow to communicate with humans, not other cats 😺"
  },
  {
    title: "Shelter Facts",
    fact: "Senior pets often make the calmest and most grateful companions 👴"
  },
  {
    title: "Did you know?",
    fact: "A cat's purr vibrates at a frequency that promotes tissue healing 🌿"
  },
  {
    title: "Fun Fact",
    fact: "Dogs can learn new words as quickly as toddlers 📚"
  },
  {
    title: "Amazing Fact",
    fact: "Cats spend 50% of their waking hours grooming 🧹"
  },
  {
    title: "Shelter Facts",
    fact: "Mixed breed dogs often have fewer health problems 🏥"
  },
  {
    title: "Did you know?",
    fact: "Cats can rotate their ears 180 degrees 🎧"
  },
  {
    title: "Fun Fact",
    fact: "Dogs have three eyelids, including one for lubrication 👁️"
  },
  {
    title: "Amazing Fact",
    fact: "A cat's whiskers are the same width as their body 📏"
  },
  {
    title: "Shelter Facts",
    fact: "Adopted pets show endless gratitude to their new families ❤️"
  },
  {
    title: "Did you know?",
    fact: "Cats can't climb down trees head-first because of their claw structure 🌳"
  },
  {
    title: "Fun Fact",
    fact: "Dogs can learn more than 1,000 words with proper training 📖"
  },
  {
    title: "Amazing Fact",
    fact: "Cats make over 100 different vocal sounds, dogs make around 10 🗣️"
  },
  {
    title: "Shelter Facts",
    fact: "Many shelter pets were given up due to owner circumstances, not behavior 🏠"
  },
  {
    title: "Did you know?",
    fact: "A cat's tail helps them balance and communicate emotions 🎭"
  },
  {
    title: "Fun Fact",
    fact: "Dogs' noses are wet to help absorb scent chemicals 💧"
  },
  {
    title: "Amazing Fact",
    fact: "Cats can run at speeds of up to 30 mph ⚡"
  },
  {
    title: "Shelter Facts",
    fact: "Every adoption inspires others to choose shelter pets 🌟"
  },
  {
    title: "Did you know?",
    fact: "Cats can't see directly under their noses 👀"
  },
  {
    title: "Fun Fact",
    fact: "Dogs can detect diseases in humans with their keen sense of smell 🔍"
  },
  {
    title: "Amazing Fact",
    fact: "A cat's jaw can't move sideways 🦷"
  }
];

export default function PetFacts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFact] = React.useState(() => 
    facts[Math.floor(Math.random() * facts.length)]
  );

  useEffect(() => {
    if (containerRef.current) {
      // Initial fade in
      animate(
        containerRef.current,
        { 
          opacity: [0, 1],
          y: [20, 0],
          scale: [0.95, 1]
        },
        { 
          duration: 2.5,
          easing: [0.22, 1, 0.36, 1]
        }
      );

      // Subtle floating animation
      animate(
        containerRef.current,
        {
          y: [0, -3, 0],
          scale: [1, 1.005, 1]
        },
        {
          duration: 8,
          repeat: Infinity,
          easing: [0.33, 1, 0.68, 1]
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="text-center max-w-3xl px-6 transform-gpu">
      <div 
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent mb-8"
        style={{ 
          filter: 'brightness(1.2) contrast(1.1)',
          textShadow: '0 0 40px rgba(255,255,255,0.25)'
        }}
      >
        {currentFact.title}
      </div>
      <p 
        className="text-lg md:text-xl bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent leading-relaxed"
        style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}
      >
        {currentFact.fact}
      </p>
    </div>
  );
}