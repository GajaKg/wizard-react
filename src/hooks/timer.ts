import { useEffect, useState, useRef } from 'react';

export function useTimer(startFrom: number = 100, step: number = 5) {
  const [counter, setCounter] = useState<number>(startFrom);
  const [timesUp, setTimesUp] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(intervalRef.current!);
          setTimesUp(true);
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const updateTime = (isCorrect: boolean): void => {
    if (timesUp) return;

    setCounter((prevCounter) => {
      const newCounter = isCorrect ? prevCounter + step : prevCounter - step;
      if (newCounter <= 0) {
        setTimesUp(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return 0;
      }
      return newCounter;
    });
  };

  const resetTimer = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCounter(startFrom);
    setTimesUp(false);
  };

  return {
    counter,
    updateTime,
    timesUp,
    resetTimer,
    step,
  };
}
