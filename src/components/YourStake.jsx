import React, { useState } from 'react';
import { calculate_rebase_for_x_days } from '../util/index.js';

export default function YourStake() {
  const [value, setValue] = useState('');
  const handleChange = (e) => setValue(e.target.value);
  const rebases = calculate_rebase_for_x_days(value, 20);

  return (
    <div className="sm:grid sm:grid-cols-3 lg:grid-cols-2 gap-4">
      <div
        key="here"
        className="sm:col-span-2 sm:col-start-2 lg:col-span-1 lg:col-start-2"
      >
        <label htmlFor="price" className="block text-sm font-medium">
          Your stack to exchange
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-lisbon-400 sm:text-sm">OHM</span>
          </div>
          <input
            type="number"
            className="block w-full sm:text-sm rounded-md border-lisbon-300 bg-lisbon-700 pl-14 pr-1 py-2 focus:outline-none focus:ring-2 focus:ring focus:ring-paris-400"
            placeholder="0.00"
            aria-describedby="your stack"
            value={value}
            onChange={handleChange}
          />
        </div>
        <div className="block text-sm font-medium mt-5">
          ~ What you would get if you keep staking till {'date'}
        </div>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-lisbon-400 sm:text-sm">OHM</span>
          </div>
          <div className="block w-full sm:text-sm rounded-md border-lisbon-700 border-2 bg-lisbon-600 pl-14 pr-1 py-2">
            {Number(rebases).toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  );
}
