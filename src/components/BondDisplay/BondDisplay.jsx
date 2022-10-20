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

      <div className="mt-5 border-y border-lisbon-900">
        <div className="sm:divide-y sm:divide-lisbon-400">
          <HeaderRow>
            <Cell className="sm:col-start-3">Price</Cell>
            <Cell>Discount</Cell>
            <Cell>Compare to staking</Cell>
            <Cell>You would get</Cell>
          </HeaderRow>
          <Row>
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
              <FakeInput currency={'OHM'}>{12.78}</FakeInput>
              <SecondaryButton className="min-w-[85px] min-h-[36px] my-0.5">
                See Details
              </SecondaryButton>
              <PrimaryButton className="min-w-[85px] min-h-[36px] my-0.5">
                BUY
              </PrimaryButton>
            </Cell>
          </Row>

          <Row>
            <Cell>Application for</Cell>
            <Cell>Backend Developer</Cell>
          </Row>
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

function HeaderRow({ children }) {
  return (
    <div className="py-4 hidden sm:grid sm:grid-cols-7 sm:gap-4 sm:items-center sm:py-1 text-sm bg-lisbon-700">
      {children}
    </div>
  );
}

function Row({ children }) {
  return (
    <div className="py-4 sm:grid sm:grid-cols-7 sm:gap-4 sm:items-center sm:py-5 text-sm">
      {children}
    </div>
  );
}

function Cell({ children, className = '', label = '' }) {
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

function FakeInput({ children, currency }) {
  return (
    <div className="relative rounded-md shadow-sm text-sm flex-1">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-lisbon-400">{currency}</span>
      </div>
      <div className="block flex-1 rounded-md border-lisbon-700 border-2 bg-lisbon-600 pl-14 pr-2 py-2">
        {children}
      </div>
    </div>
  );
}
