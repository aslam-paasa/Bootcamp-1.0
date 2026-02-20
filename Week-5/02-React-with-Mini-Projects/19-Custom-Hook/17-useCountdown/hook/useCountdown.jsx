import { useCallback, useEffect, useState } from 'react';


export default function useCountdown(options) {
  const { countStart, countStop = 0, intervalMs = 1000, isIncrement = false } = options;
  const [count, setCount] = useState(countStart);
  const [running, setRunning] = useState(false);

  const reset = useCallback(() => {
    setRunning(false);
    setCount(countStart);
  }, [countStart]);

  const start = useCallback(() => {
    setRunning(true);
  }, []);

  const stop = useCallback(() => {
    setRunning(false);
  }, []);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      if (count === countStop) return stop();

      if (isIncrement) {
        setCount((prev) => prev + 1);
      } else {
        setCount((prev) => prev - 1);
      }
    }, intervalMs);

    return () => clearInterval(id);
  }, [count, countStop, intervalMs, isIncrement, running]);

  return { count, start, stop, reset };
}
