import React from 'react';
import { classNames, getFormatBondExpiry } from '../util/index.js';
import { OmegaIcon } from './Icons.jsx';
import { useStore } from '../store.jsx';

export default function BondCard({ bond, className }) {
  const { changeCurrentBond, currentBondId, isLoading } = useStore();
  if (isLoading) return <Placeholder />;

  const isActive = currentBondId === bond.address;
  const isRedeemable = bond.expiry_timestamp * 1000 < Date.now();
  const toggleActiveBond = () => {
    if (isActive) {
      changeCurrentBond(undefined);
      return;
    }
    changeCurrentBond(bond.address);
  };

  const bondPrice = bond.best_price
    ? Number(bond.best_price).toFixed(2)
    : 'Not priced';

  return (
    <li
      className={classNames(
        className,
        'col-span-1 divide-y divide-lisbon-200 rounded-lg bg-lisbon-800 shadow cursor-pointer group'
      )}
      onClick={toggleActiveBond}
    >
      <div className="relative overflow-hidden px-4 pt-14 pb-12 shadow sm:px-6 rounded-lg">
        <dt>
          <div
            className={classNames(
              isActive
                ? 'bg-parisII-400'
                : isRedeemable
                ? 'bg-lisbon-400 group-hover:bg-lisbon-300'
                : 'bg-paris-500 group-hover:bg-paris-400',
              'absolute rounded-md p-3 text-white'
            )}
          >
            <OmegaIcon size={'35px'} aria-hidden="true" />
          </div>
          <p className="ml-16 pl-1 truncate text-sm font-medium text-lisbon-400">
            {getFormatBondExpiry({ timestamp: bond.expiry_timestamp })}
          </p>
        </dt>
        <dd className="ml-16 pl-1 flex items-baseline pb-6 sm:pb-7">
          <div className="absolute inset-x-0 top-0 px-4 py-4 sm:px-6">
            <div
              className={classNames(
                isActive
                  ? 'text-parisII-500 group-hover:text-parisII-400'
                  : isRedeemable
                  ? 'text-lisbon-400 group-hover:text-lisbon-300'
                  : 'text-paris-500 group-hover:text-paris-400',
                'text-lg font-medium truncate'
              )}
            >
              {bond.display_full_name}
            </div>
          </div>
          <p className="text-2xl font-semibold text-lisbon-100">{bondPrice}</p>
          <p className="ml-1 flex items-baseline text-lisbon-100 text-sm font-semibold">
            {bond.currency}
          </p>
          <div className="absolute flex inset-x-0 bottom-0 bg-lisbon-900 px-4 py-4 sm:px-6">
            <div className="text-sm w-1/2">
              <a
                href="#"
                className={classNames(
                  isActive
                    ? 'text-parisII-100 group-hover:text-parisII-50'
                    : isRedeemable
                    ? 'text-lisbon-200 group-hover:text-lisbon-100'
                    : 'text-paris-200 group-hover:text-paris-100',
                  'font-medium'
                )}
              >
                {isActive ? 'Current' : 'View details'}
              </a>
            </div>
            <div
              className={classNames(
                isActive
                  ? 'text-parisII-100'
                  : isRedeemable
                  ? 'text-lisbon-200'
                  : 'text-paris-200',
                'font-medium w-1/2 flex items-center justify-end'
              )}
            >
              {bond.live_markets.length > 0 ? 'Live' : 'Secondary'}{' '}
              <PulsingDot />
            </div>
          </div>
        </dd>
        {isRedeemable && (
          <div className="bg-lime-500 absolute right-[1px] top-[1px] text-sm text-lisbon-800 px-2 py-1 rounded-sm box-border rounded-tr-lg">
            Redeemable
          </div>
        )}
      </div>
    </li>
  );
}

function PulsingDot() {
  return (
    <div className="ring-container inline-block relative ml-2">
      <div
        data-name="ringring"
        className="border-[1px] border-current absolute w-[12px] h-[12px] rounded-full left-[-1px] top-[-1px] opacity-70 animate-ping"
      />
      <div
        data-name="circle"
        className="w-[10px] h-[10px] bg-current rounded-full"
      />
    </div>
  );
}

function Placeholder() {
  return (
    <li className="col-span-1 rounded-lg border border-4 border-lisbon-300 shadow box-border animate-pulse">
      <div className="relative overflow-hidden px-4 pt-14 pb-12 shadow sm:px-6 rounded-lg">
        <div className="absolute rounded-md p-3 text-lisbon-600 bg-lisbon-300 box-border">
          <OmegaIcon size={'35px'} aria-hidden="true" />
        </div>
        <div className="absolute inset-x-0 top-0 px-4 py-4 sm:px-6">
          <div className="bg-lisbon-300 h-4 rounded mt-2" />
        </div>
        <p className="ml-20 bg-lisbon-300 h-4 rounded" />
        <p className="ml-20 bg-lisbon-300 h-4 rounded mt-4 " />
      </div>
    </li>
  );
}
