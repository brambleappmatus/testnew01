import { animate, type AnimationOptions } from '@motionone/dom';

interface LetterAnimationOptions extends Partial<AnimationOptions> {
  repeat?: number;
  delay?: number;
}

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
        transform: [
          'translate3d(0, 0, 0) rotate(0deg) scale(1)',
          `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(${rotateAmount}deg) scale(1.005)`,
          'translate3d(0, 0, 0) rotate(0deg) scale(1)'
        ]
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
      transform: [
        'translate3d(-50px, 10px, 0) rotate(-5deg) scale(0.9)',
        'translate3d(0, 0, 0) rotate(0deg) scale(1)'
      ]
    },
    { 
      duration: 3,
      delay: (_, i) => i * 0.25,
      easing: [0.22, 1, 0.36, 1]
    }
  );
};