import React from 'react';
import { format } from 'date-fns';
import { classNames } from '../util/index.js';
import { OmegaIcon } from './Icons.jsx';

export default function BondCard({ bond }) {
  return (
    <li className="col-span-1 divide-y divide-lisbon-200 rounded-lg bg-lisbon-800 shadow cursor-pointer group">
      <div className="relative overflow-hidden px-4 pt-14 pb-12 shadow sm:px-6 rounded-lg">
        <dt>
          <div className="absolute rounded-md bg-paris-500 group-hover:bg-paris-400 p-3 text-white">
            <OmegaIcon size={'35px'} aria-hidden="true" />
          </div>
          <p className="ml-16 pl-1 truncate text-sm font-medium text-lisbon-400">
            {format(new Date(bond.expiry_timestamp), 'PPPp')}
          </p>
        </dt>
        <dd className="ml-16 pl-1 flex items-baseline pb-6 sm:pb-7">
          <div className="absolute inset-x-0 top-0 px-4 py-4 sm:px-6">
            <div className="text-lg font-medium text-paris-500 group-hover:text-paris-400">
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
                className="font-medium text-paris-200 hover:text-paris-100"
              >
                View details
              </a>
            </div>
            <div
              className={classNames(
                'text-right font-medium text-paris-200 w-1/2'
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
