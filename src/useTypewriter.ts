import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let interval: ReturnType<typeof setInterval>;

    const timer = setTimeout(() => {
      interval = setInterval(() => {
        if (index < text.length) {
          setDisplayed(text.substring(0, index + 1));
          index++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
