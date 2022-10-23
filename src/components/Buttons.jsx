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

export function PrimaryButton({
  onClick,
  children,
  className = '',
  size,
  colour,
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        'inline-flex justify-center text-center items-center border border-transparent px-2.5 py-1.5 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
        size === 'lg'
          ? 'text-lg rounded-md'
          : size === 'md'
          ? 'text-base rounded-md'
          : 'text-xs rounded',
        () => {
          switch (colour) {
            case 'green':
              return 'bg-lime-600 hover:bg-lime-700 focus:ring-lime-500';
            case 'red':
              return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
            default:
              return 'bg-paris-600 hover:bg-paris-700 focus:ring-paris-500';
          }
        },
        className
      )}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  onClick,
  children,
  className = '',
  size,
  colour,
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        'inline-flex justify-center text-center items-center border border-transparent px-2.5 py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
        size === 'lg'
          ? 'text-lg rounded-md'
          : size === 'md'
          ? 'text-base rounded-md'
          : 'text-xs rounded',
        () => {
          switch (colour) {
            case 'yellow':
              return 'bg-white text-parisII-700 hover:bg-parisII-200 focus:ring-parisII-500';
            default:
              return 'bg-white text-paris-700 hover:bg-paris-200 focus:ring-paris-500';
          }
        },
        className
      )}
    >
      {children}
    </button>
  );
}
