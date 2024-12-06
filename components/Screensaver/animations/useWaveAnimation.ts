import { animate } from '@motionone/dom';

export const useWaveAnimation = (element: Element, index: number, totalLetters: number) => {
  const frequency = 0.5; // Slower wave frequency
  const amplitude = 2.8; // Reduced amplitude
  const baseDelay = 2; // Increased delay between letters

  const animateWave = () => {
    const calculateY = (progress: number) => {
      const phase = (index / totalLetters) * Math.PI * 2;
      const wave1 = Math.sin(progress * Math.PI * 2 + phase);
      const wave2 = Math.sin(progress * Math.PI * 3 + phase) * 0.3;
      return -amplitude * (wave1 + wave2);
    };

    const keyframes = Array.from({ length: 240 }, (_, i) => { // More keyframes for smoother motion
      const progress = i / 239;
      return calculateY(progress * frequency);
    });

    animate(
      element,
      {
        y: keyframes,
        x: [0, 0.5, 0, -0.5, 0], // Very subtle horizontal movement
        rotate: [0, 0.3, 0, -0.3, 0], // Minimal rotation
        scale: [1, 1.005, 1, 1.005, 1] // Very subtle scale change
      },
      {
        duration: 18, // Much longer duration for slower movement
        delay: index * baseDelay,
        easing: [0.4, 0.1, 0.6, 0.9], // Smoother easing curve
        repeat: Infinity,
        repeatDelay: 0.2
      }
    );
  };

  return animateWave;
};

export const initialWaveAnimation = (elements: Element[]) => {
  return animate(
    elements,
    {
      opacity: [0, 1],
      x: [-30, 0], // Reduced initial movement
      y: [5, 0],
      scale: [0.95, 1],
      rotate: [-2, 0]
    },
    {
      duration: 3.5,
      delay: (_, i) => i * 0.4,
      easing: [0.2, 0.8, 0.2, 1] // Smoother spring-like easing
    }
  );
};