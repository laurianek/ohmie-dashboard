import React from 'react';
import {
  EnvelopeIcon,
  PhoneIcon,
  PaperClipIcon,
} from '@heroicons/react/20/solid';
import reactLogo from './assets/react.svg';
import './App.css';
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import Dashboard from './components/Dashboard';

import data from './assets/sample-data.js';
import { classNames } from './util';
import { format } from 'date-fns';

function App() {
  const currentBond = Object.values(data.bonds)[0];

  return (
    <Dashboard>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Object.values(data.bonds).map((bond) => (
          <li
            key={bond.token_name}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
          >
            <div className="relative overflow-hidden px-4 pt-14 pb-12 shadow sm:px-6 rounded-lg">
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3 text-white">
                  <OmegaIcon size={'35px'} aria-hidden="true" />
                </div>
                <p className="ml-16 pl-1 truncate text-sm font-medium text-gray-500">
                  {format(new Date(bond.expiry_timestamp), 'PPPp')}
                </p>
              </dt>
              <dd className="ml-16 pl-1 flex items-baseline pb-6 sm:pb-7">
                <div className="absolute inset-x-0 top-0 px-4 py-4 sm:px-6">
                  <div className="text-lg font-medium text-indigo-600 hover:text-indigo-500">
                    {bond.display_name}
                  </div>
                </div>
                <p className="text-2xl font-semibold text-gray-900">
                  {Number(bond.best_price).toFixed(2)}
                </p>
                <p className="ml-1 flex items-baseline text-gray-900 text-sm font-semibold">
                  {bond.currency}
                </p>
                <div className="absolute flex inset-x-0 bottom-0 divide-x bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm w-1/2">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View details
                    </a>
                  </div>
                  <div
                    className={classNames(
                      'text-right font-medium text-indigo-600 w-1/2'
                    )}
                  >
                    Live
                  </div>
                </div>
              </dd>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="text"
            name="price"
            id="price"
            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="0.00"
            aria-describedby="price-currency"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm" id="price-currency">
              USD
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-xl font-medium leading-6">
            {currentBond.display_name}
          </h3>
          <p className="ml-2 mt-1 truncate text-sm text-indigo-200">
            {format(new Date(currentBond.expiry_timestamp), 'PPPp')}
          </p>
        </div>
      </div>

      {[1].map(() => {
        const market = currentBond.live_markets[0];
        return (
          <div className="mt-5 border-t border-gray-200">
            <div className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-7 sm:gap-4 sm:items-center sm:py-1 text-sm bg-slate-500">
                <div className="mt-1 sm:col-span-1 sm:mt-0 sm:col-start-3">
                  Price in OHM
                </div>
                <div className="mt-1 sm:col-span-1 sm:mt-0">Discount</div>
                <div className="mt-1 sm:col-span-1 sm:mt-0">
                  Compare to staking
                </div>
                <div className="mt-1 sm:col-span-1 sm:mt-0">You would get</div>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-7 sm:gap-4 sm:items-center sm:py-5 text-sm">
                <div className="font-medium sm:col-span-2">
                  {market.exchange.name}
                </div>
                <div className="mt-1 sm:col-span-1 sm:mt-0">{market.price}</div>
                <div className="mt-1 sm:col-span-1 sm:mt-0">
                  {market.discount}
                </div>
                <div className="mt-1 sm:col-span-1 sm:mt-0">
                  {market.discount}
                </div>
                <div className="mt-1 sm:col-span-1 sm:mt-0">{12.78}</div>
                <div className="mt-1 sm:col-span-1 sm:mt-0 sm:justify-self-end">
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    see details
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    buy
                  </button>
                </div>
              </div>

              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  Application for
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  Backend Developer
                </dd>
              </div>
            </div>
          </div>
        );
      })}

      <p>Ohm bonds | expiry 2022-11-03</p>
      <p>
        avaliable live market ?<span>price</span>
        <span>buy</span>
      </p>
      <p>gnosis opsion</p>
      <p>
        avalaible secondary market market ?(secondary market is when you buy
        from another user instead of the protocol)
      </p>
      <p>total quantity (Market dept)</p>
      <p>my holdings</p>
      <p>sell on the secondary market</p>
      <p>redeem (number of days till can redeem)</p>
      <p>staking rebase rate</p>

      <p>price comparison from stating</p>
    </Dashboard>
  );
}

export default App;

function OmegaIcon({ size = '10px' }) {
  return (
    <svg
      viewBox="0 0 94.501 94.501"
      width={size}
      height={size}
      style={{ stroke: 'currentcolor', fill: 'currentcolor' }}
    >
      <g>
        <path
          d="M34.07,78.892l-2.623-2.155c-3.064-2.513-13.056-11.978-13.056-28.296c0-17.932,11.818-29.52,30.112-29.52
		c17.839,0,28.922,10.948,28.922,28.573c0,16.471-9.248,25.965-13.226,29.284l-2.571,2.149v11.014h32.873V75.582H83.936
		c5.209-8.365,7.848-17.799,7.848-28.088c0-25.68-17.393-42.934-43.279-42.934C22.325,4.561,4.041,22.606,4.041,48.44
		c0,9.521,2.705,19.052,7.663,27.142H0v14.359h34.071L34.07,78.892L34.07,78.892z"
        />
      </g>
    </svg>
  );
}
