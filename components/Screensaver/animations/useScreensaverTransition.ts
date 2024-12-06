import { animate, AnimationControls } from '@motionone/dom';

export const fadeIn = (element: Element) => {
  animate(
    element,
    { 
      opacity: [0, 1],
      scale: [1.1, 1],
      filter: ['blur(20px)', 'blur(0px)']
    },
    { 
      duration: 1.2,
      easing: [0.22, 1, 0.36, 1]
    }
  );
};

export const fadeOut = (element: Element) => {
  animate(
    element,
    { 
      opacity: [1, 0],
      scale: [1, 1.05],
      filter: ['blur(0px)', 'blur(10px)']
    },
    { 
      duration: 0.8,
      easing: [0.4, 0, 0.2, 1]
    }
  );
};