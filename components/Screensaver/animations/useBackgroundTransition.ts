import { animate } from '@motionone/dom';

export const useBackgroundTransition = (element: Element) => {
  return animate(
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