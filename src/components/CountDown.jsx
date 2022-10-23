import React, { useState, useEffect, useRef } from 'react';

const _1sec = 1000;

export default function Countdown({
  initialCount = 0,
  restart,
  onCountFinished,
}) {
  const [isCounting, setIsCounting] = useState(true);
  const [count, setCount] = useState(initialCount); // in seconds
  const [_restart, setRestart] = useState();
  const ref = useRef({ index: undefined });

  const reduceCounter = () => {
    setCount((v) => {
      if (v <= 0) {
        setIsCounting(false);
        clearTimeout(ref.current.index);
        setTimeout(onCountFinished, 50);
        return 0;
      }
      return v - 1;
    });
    ref.current.index = setTimeout(() => {
      reduceCounter();
    }, _1sec);
  };

  const pause = () => clearTimeout(ref.current.index);

  useEffect(() => {
    if (restart !== _restart && isCounting) {
      setIsCounting(false);
    } else if (restart !== _restart && !isCounting) {
      setCount(initialCount);
      setIsCounting(true);
      clearTimeout(ref.current.index);
      setRestart(restart);
      reduceCounter();
      console.log('restart count', restart, initialCount, isCounting);
    }
  }, [restart, _restart, initialCount, isCounting]);

  return (
    <div className="component-countdown relative w-[40px] h-[40px] text-center">
      <div
        className="inline-block leading-[40px]"
        style={{ color: 'currentcolor' }}
      >
        {count}
      </div>
      {isCounting && (
        <svg
          className="absolute inset-0 w-[40px] h-[40px]"
          style={{ transform: 'rotateX(-180deg) rotateZ(90deg)' }}
        >
          <circle
            r="18"
            cx="20"
            cy="20"
            style={{ animationDuration: `${initialCount}s` }}
          />
        </svg>
      )}
    </div>
  );
}
