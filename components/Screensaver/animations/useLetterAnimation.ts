import { animate } from '@motionone/dom';

export const useLetterAnimation = (element: Element, index: number) => {
  const startDelay = index * 0.3;
  
  const animateFloat = () => {
    const yOffset = -3 - Math.random() * 2;
    const xOffset = (index % 2 === 0 ? 1 : -1) * (0.8 + Math.random() * 0.2);
    const rotateAmount = (index % 2 === 0 ? 0.5 : -0.5) * (0.3 + Math.random() * 0.2);
    const duration = 6 + Math.random() * 2;

    animate(
      element,
      {
        y: [0, yOffset, 0],
        x: [0, xOffset, 0],
        rotate: [0, rotateAmount, 0],
        scale: [1, 1.005, 1]
      },
      {
        duration,
        delay: startDelay,
        easing: [0.4, 0.1, 0.4, 1],
        repeat: Infinity
      }
    );
  };

  return animateFloat;
};

export const initialLetterAnimation = (elements: Element[]) => {
  animate(
    elements,
    { 
      opacity: [0, 1],
      x: [-50, 0],
      y: [10, 0],
      scale: [0.9, 1],
      rotate: [-5, 0]
    },
    { 
      duration: 3,
      delay: (_, i) => i * 0.25,
      easing: [0.22, 1, 0.36, 1]
    }
  );
};