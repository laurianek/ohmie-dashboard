import React from 'react';

export function HeaderRow({ children }) {
  return (
    <div className="py-4 hidden sm:grid sm:grid-cols-7 sm:gap-4 sm:items-center sm:py-1 text-sm bg-lisbon-700">
      {children}
    </div>
  );
}

export default function Row({ children }) {
  return (
    <div className="py-4 sm:grid sm:grid-cols-7 sm:gap-4 sm:items-center sm:py-5 text-sm">
      {children}
    </div>
  );
}
