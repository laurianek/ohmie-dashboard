import React from 'react';
import { format } from 'date-fns';
import { classNames } from '../../util';
import data from '../../assets/sample-data.js';
import { PrimaryButton, SecondaryButton } from '../Buttons.jsx';

export default function BondDisplay() {
  const userStack = 9.45;
  const currentBond = Object.values(data.bonds)[0];
  const market = currentBond.live_markets[0];

  return (
    <>
      <Header
        title={currentBond.display_name}
        subTitle={format(new Date(currentBond.expiry_timestamp), 'PPPp')}
      />

      <div className="mt-5 border-t border-lisbon-200">
        <div className="sm:divide-y sm:divide-lisbon-200">
          <div className="py-4 hidden sm:grid sm:grid-cols-7 sm:gap-4 sm:items-center sm:py-1 text-sm bg-lisbon-500">
            <Cell className="sm:col-start-3">Price</Cell>
            <Cell>Discount</Cell>
            <Cell>Compare to staking</Cell>
            <Cell>You would get</Cell>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-7 sm:gap-4 sm:items-center sm:py-5 text-sm">
            <div className="font-medium sm:col-span-2 text-paris-500 text-xl sm:text-sm">
              {market.exchange.name}
            </div>
            <Cell label={'Price'}>{market.price} OHM</Cell>
            <Cell label={'Discount'}>{market.discount}</Cell>
            <Cell label={'Comp. staking'}>{market.discount}</Cell>
            <Cell
              label={'You would get'}
              className="sm:col-span-2 flex justify-end flex-wrap gap-1.5"
            >
              <div className="relative rounded-md shadow-sm text-sm flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-lisbon-400">OHM</span>
                </div>
                <div className="block flex-1 rounded-md border-lisbon-700 border-2 bg-lisbon-600 pl-14 pr-2 py-2">
                  {12.78}
                </div>
              </div>
              <SecondaryButton className="min-w-[85px] my-0.5">
                see details
              </SecondaryButton>
              <PrimaryButton className="min-w-[85px] my-0.5">BUY</PrimaryButton>
            </Cell>
          </div>

          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-lisbon-500">
              Application for
            </dt>
            <dd className="mt-1 text-sm text-lisbon-900 sm:col-span-2 sm:mt-0">
              Backend Developer
            </dd>
          </div>
        </div>
      </div>
    </>
  );
}

function Header({ title, subTitle }) {
  return (
    <div className="mt-12">
      <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
        <h3 className="ml-2 mt-2 text-xl font-medium leading-6">{title}</h3>
        <p className="ml-2 mt-1 truncate text-sm text-paris-200">{subTitle}</p>
      </div>
    </div>
  );
}

function Cell({ children, className = '', label = '' }) {
  return (
    <div className={classNames('mt-1.5 sm:col-span-1 sm:mt-0', className)}>
      {label && (
        <span className="inline-flex sm:hidden items-center font-semibold text-lisbon-400 mr-2">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
