import { useState, useCallback, useRef, useEffect } from 'react';

export function useScreensaver(timeout: number = 5000) {
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isUserActiveRef = useRef(true);
  const lastActivityRef = useRef(Date.now());

  const startScreensaver = useCallback(() => {
    if (!isUserActiveRef.current && !isActive) {
      setIsActive(true);
      setIsVisible(true);
    }
  }, [isActive]);

  const stopScreensaver = useCallback(() => {
    isUserActiveRef.current = true;
    lastActivityRef.current = Date.now();
    
    if (isActive) {
      setIsActive(false);
      setIsVisible(false);
    }
  }, [isActive]);

  const checkInactivity = useCallback(() => {
    const now = Date.now();
    const timeSinceLastActivity = now - lastActivityRef.current;

    if (timeSinceLastActivity >= timeout) {
      isUserActiveRef.current = false;
      startScreensaver();
    }
  }, [timeout, startScreensaver]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }

    lastActivityRef.current = Date.now();
    isUserActiveRef.current = true;
    timeoutRef.current = setInterval(checkInactivity, 1000);
  }, [checkInactivity]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, [resetTimer]);

  return {
    isActive,
    isVisible,
    startScreensaver,
    stopScreensaver,
    resetTimer
  };
}