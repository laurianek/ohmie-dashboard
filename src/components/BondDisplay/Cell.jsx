import React from 'react';
import { classNames } from '../../util/index.js';

export default function Cell({ children, className = '', label = '' }) {
  return (
    <div className={classNames(className, 'mt-1.5 sm:mt-0')}>
      {label && (
        <span className="inline-flex sm:hidden items-center font-semibold text-lisbon-400 mr-2">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
