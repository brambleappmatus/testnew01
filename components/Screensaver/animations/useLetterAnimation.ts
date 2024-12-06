import { animate, spring } from '@motionone/dom';

export const useLetterAnimation = (element: Element, index: number) => {
  const startDelay = index * 0.3;
  
  const animateFloat = () => {
    const yOffset = -4 - Math.random() * 3; // Gentler vertical movement
    const xOffset = (index % 2 === 0 ? 1.5 : -1.5) * (1 + Math.random() * 0.2);
    const rotateAmount = (index % 2 === 0 ? 0.8 : -0.8) * (0.5 + Math.random() * 0.3);
    const duration = 5 + Math.random() * 2; // Slower overall movement

    animate(
      element,
      {
        y: [0, yOffset, 0],
        x: [0, xOffset, 0],
        rotate: [0, rotateAmount, 0],
        scale: [1, 1.008, 1]
      },
      {
        duration,
        delay: startDelay,
        easing: [0.25, 0.1, 0.25, 1], // Smoother easing curve
        repeat: Infinity,
        repeatDelay: 0.15 + Math.random() * 0.2
      }
    );
  };

  return animateFloat;
};

export const initialLetterAnimation = (elements: Element[]) => {
  return animate(
    elements,
    { 
      opacity: [0, 1],
      x: [-100, 0], // Start from left
      y: [20, 0],
      scale: [0.8, 1],
      rotate: [-8, 0]
    },
    { 
      duration: 4, // Slower initial animation
      delay: (_, i) => i * 0.35, // More delay between letters
      easing: spring({ 
        mass: 3.5,
        stiffness: 35,
        damping: 20,
        velocity: 0.5
      })
    }
  );
};