import React from 'react';
import { classNames } from '../util';

export function PlainButton({ onClick, children, className = '', size }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'inline-flex text-center items-center border px-3 py-2 font-medium leading-4 shadow-sm bg-transparent border-transparent text-paris-200 transition hover:border-paris-200 hover:text-paris-100 focus:outline-none focus:ring-2 focus:ring-paris-300 focus:border-paris-500',
        size === 'lg'
          ? 'text-xl rounded-lg'
          : size === 'md'
          ? 'text-lg rounded-lg'
          : 'text-sm rounded-md',
        className
      )}
    >
      {children}
    </button>
  );
}

export function PrimaryButton({ onClick, children, className = '', size }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        'inline-flex justify-center text-center items-center border border-transparent bg-paris-600 px-2.5 py-1.5 font-medium text-white shadow-sm hover:bg-paris-700 focus:outline-none focus:ring-2 focus:ring-paris-500 focus:ring-offset-2',
        size === 'lg'
          ? 'text-lg rounded-md'
          : size === 'md'
          ? 'text-base rounded-md'
          : 'text-xs rounded',
        className
      )}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ onClick, children, className = '', size }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        'inline-flex justify-center text-center items-center border border-transparent bg-paris-50 px-2.5 py-1.5 font-medium text-paris-700 hover:bg-paris-200 focus:outline-none focus:ring-2 focus:ring-paris-500 focus:ring-offset-2',
        size === 'lg'
          ? 'text-lg rounded-md'
          : size === 'md'
          ? 'text-base rounded-md'
          : 'text-xs rounded',
        className
      )}
    >
      {children}
    </button>
  );
}
