import React from 'react';
import { useStore, ALL } from './store.jsx';
import './App.css';
import Dashboard from './components/Dashboard';
import BondCard from './components/BondCard.jsx';
import YourStake from './components/YourStake.jsx';

import data from './assets/sample-data.js';
import { classNames } from './util';
import { format } from 'date-fns';

function App() {
  const currentBond = Object.values(data.bonds)[0];

  const { currentBondId, shownBonds, getBondCardClassName, toggleShownBonds } =
    useStore();

  return (
    <Dashboard>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Object.values(data.bonds).map((bond, index) => (
          <BondCard
            key={bond.token_name}
            bond={bond}
            className={getBondCardClassName(
              index,
              bond.token_name === currentBondId
            )}
          />
        ))}
      </ul>
      <div className="flex justify-end pt-2 pb-3">
        <button
          onClick={toggleShownBonds}
          className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium leading-4 shadow-sm bg-transparent border-transparent text-paris-200 transition hover:border-paris-200 hover:text-paris-100 focus:outline-none focus:ring-2 focus:ring-paris-300 focus:border-paris-500"
        >
          {shownBonds === ALL ? 'View less' : 'View all bonds'}
        </button>
      </div>

      <YourStake />

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
        available live market ?<span>price</span>
        <span>buy</span>
      </p>
      <p>gnosis option</p>
      <p>
        available secondary market market ?(secondary market is when you buy
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
