import React, { useState } from 'react';
import { format } from 'date-fns';
import { classNames } from '../util/index.js';
import { OmegaIcon } from './Icons.jsx';
import { useStore } from '../store.jsx';

export default function BondCard({ bond, className }) {
  const { changeCurrentBond, currentBondId } = useStore();
  const isActive = currentBondId === bond.token_name;

  return (
    <li
      className={classNames(
        className,
        'col-span-1 divide-y divide-lisbon-200 rounded-lg bg-lisbon-800 shadow cursor-pointer group'
      )}
      onClick={() => changeCurrentBond(bond.token_name)}
    >
      <div className="relative overflow-hidden px-4 pt-14 pb-12 shadow sm:px-6 rounded-lg">
        <dt>
          <div
            className={classNames(
              isActive
                ? 'bg-parisII-400'
                : 'bg-paris-500 group-hover:bg-paris-400',
              'absolute rounded-md p-3 text-white'
            )}
          >
            <OmegaIcon size={'35px'} aria-hidden="true" />
          </div>
          <p className="ml-16 pl-1 truncate text-sm font-medium text-lisbon-400">
            {format(new Date(bond.expiry_timestamp), 'PPPp')}
          </p>
        </dt>
        <dd className="ml-16 pl-1 flex items-baseline pb-6 sm:pb-7">
          <div className="absolute inset-x-0 top-0 px-4 py-4 sm:px-6">
            <div
              className={classNames(
                isActive
                  ? 'text-parisII-500 group-hover:text-parisII-400'
                  : 'text-paris-500 group-hover:text-paris-400',
                'text-lg font-medium'
              )}
            >
              {bond.display_name}
            </div>
          </div>
          <p className="text-2xl font-semibold text-lisbon-100">
            {Number(bond.best_price).toFixed(2)}
          </p>
          <p className="ml-1 flex items-baseline text-lisbon-100 text-sm font-semibold">
            {bond.currency}
          </p>
          <div className="absolute flex inset-x-0 bottom-0 bg-lisbon-900 px-4 py-4 sm:px-6">
            <div className="text-sm w-1/2">
              <a
                href="#"
                className={classNames(
                  isActive
                    ? 'text-parisII-100 hover:text-parisII-50'
                    : 'text-paris-200 hover:text-paris-100',
                  'font-medium'
                )}
              >
                View details
              </a>
            </div>
            <div
              className={classNames(
                isActive ? 'text-parisII-100' : 'text-paris-200',
                'text-right font-medium w-1/2'
              )}
            >
              Live
            </div>
          </div>
        </dd>
      </div>
    </li>
  );
}
