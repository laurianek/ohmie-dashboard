import React from 'react';

export function FakeInput({ children, currency }) {
  return (
    <div className="relative rounded-md shadow-sm text-sm flex-1 z-[-1]">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-lisbon-400">{currency}</span>
      </div>
      <div className="block flex-1 rounded-md border-lisbon-700 border-2 bg-lisbon-600 pl-14 pr-2 py-2">
        {children}
      </div>
    </div>
  );
}
