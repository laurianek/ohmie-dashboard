import React, { useState, useEffect, useRef } from 'react';
import {
  calculate_rebase_for_x_days,
  getIntervalFromNow,
  getFormatIntervalFromNow,
  numberWithCommas,
} from '../util/index.js';
import { useStore } from '../store.jsx';

const shortTime = 500;

export default function YourStake() {
  const { userStack, setUserStack, currentBond, isLoading } = useStore();
  if (isLoading) return <Placeholder />;

  const [value, setValue] = useState(userStack);
  const timeoutRef = useRef({ index: undefined });
  const handleChange = (e) => setValue(e.target.value);

  const dayDiff = currentBond
    ? getIntervalFromNow({
        timestamp: currentBond.expiry_timestamp,
      })
    : { days: 20 };
  const rebases = calculate_rebase_for_x_days(userStack, dayDiff.days);

  useEffect(() => {
    if (userStack !== value) {
      clearTimeout(timeoutRef.current.index);
      timeoutRef.current.index = setTimeout(() => {
        const v = Number.isNaN(Number(value)) ? 0 : Number(value);
        setUserStack(v);
      }, shortTime);
    }
  }, [value, userStack, timeoutRef]);

  return (
    <div className="sm:grid sm:grid-cols-3 lg:grid-cols-2 gap-4">
      <div className="sm:col-span-2 sm:col-start-2 lg:col-span-1 lg:col-start-2">
        <label htmlFor="price" className="block text-sm font-medium">
          Your stack to exchange
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 top-0 flex items-center pl-3">
            <span className="text-lisbon-400 sm:text-sm">OHM</span>
          </div>
          <input
            type="number"
            className="block w-full sm:text-sm rounded-md border-lisbon-300 bg-lisbon-700 pl-14 pr-1 py-2 focus:outline-none focus:ring-2 focus:ring focus:ring-paris-400"
            placeholder="0.00"
            min={0}
            aria-describedby="your stack"
            value={value}
            onChange={handleChange}
          />
        </div>
        <div className="block text-sm font-medium mt-5">
          {currentBond
            ? `~ What you would get ${getFormatIntervalFromNow({
                timestamp: currentBond.expiry_timestamp,
              })} if you keep staking`
            : `~ What you would get if you keep staking for ${dayDiff.days} days`}
        </div>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-lisbon-400 sm:text-sm">OHM</span>
          </div>
          <div className="block w-full sm:text-sm rounded-md border-lisbon-700 border-2 bg-lisbon-600 pl-14 pr-1 py-2">
            {numberWithCommas(rebases.toFixed(4))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="sm:grid sm:grid-cols-3 lg:grid-cols-2 gap-4 animate-pulse">
      <div className="sm:col-span-2 sm:col-start-2 lg:col-span-1 lg:col-start-2">
        <div className="bg-lisbon-300 h-4 rounded mt-2" />
        <div className="bg-lisbon-300 h-4 rounded mt-2" />
        <div className="bg-lisbon-300 h-4 rounded mt-2" />
      </div>
    </div>
  );
}
