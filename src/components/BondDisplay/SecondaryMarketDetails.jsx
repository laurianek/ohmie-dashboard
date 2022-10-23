import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { ChartBarIcon, PlusIcon } from '@heroicons/react/24/solid';
import {
  ChartBarIcon as OChartBarIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline';
import { notificationOptions2 } from './notificationOptions.js';
import {
  calculate_bond_return,
  calculate_percent_return_bond_vs_staking,
  classNames,
  getIntervalFromNow,
  numberWithCommas,
} from '../../util/index.js';

import Row from './Row.jsx';
import Cell from './Cell.jsx';
import { FakeInput } from './FakeInput.jsx';
import { PrimaryButton, SecondaryButton } from '../Buttons.jsx';
import NotifyDropDown from './NotifyDropDown.jsx';
const display_notification = false;

export default function SecondaryMarketDetails({
  market,
  userStack,
  expiryTimestamp,
  total_supply,
}) {
  const [seeDetails, setSeeDetails] = useState(false);
  const [options, setOptions] = useState(notificationOptions2[0].text);

  const isMarketOpen = market.price !== -1;

  const bondReturn =
    isMarketOpen && calculate_bond_return(userStack, market.price);
  const dayDiff = getIntervalFromNow({
    timestamp: expiryTimestamp,
  });

  const comparisonPercent =
    isMarketOpen &&
    calculate_percent_return_bond_vs_staking(
      userStack,
      market.price,
      dayDiff.days
    );
  const toggleSeeDetails = () => setSeeDetails((v) => !v);

  return (
    <Row className={!seeDetails ? 'sm:gap-y-0' : 'sm:gap-y-4'}>
      <div className="font-medium sm:col-span-2 text-paris-500 text-xl sm:text-sm">
        {market.exchange.name} <br />
        {market._extra?.label}
      </div>
      <Cell label={'Price'}>
        {isMarketOpen ? market.price : 'No ask on the market yet'}{' '}
        {market.currency}
      </Cell>
      <Cell
        label={'Comp. staking'}
        className={
          !isMarketOpen
            ? 'text-lisbon-400'
            : comparisonPercent < 0
            ? 'text-red-500'
            : 'text-lime-300'
        }
      >
        {isMarketOpen ? comparisonPercent.toFixed(2) : '-'} %
      </Cell>
      <Cell
        label={'You would get'}
        className="flex justify-end flex-wrap gap-1.5 sm:col-span-3"
      >
        <FakeInput currency={market.currency}>
          {numberWithCommas((bondReturn || 0).toFixed(4))}
        </FakeInput>
        <PrimaryButton
          link={market.buy_link}
          className="min-w-[85px] min-h-[36px] my-0.5"
          colour="green"
        >
          BUY
        </PrimaryButton>
        <PrimaryButton
          link={market.sell_link}
          className="min-w-[85px] min-h-[36px] my-0.5"
          colour="red"
        >
          SELL
        </PrimaryButton>
        <SecondaryButton
          className="my-0.5"
          colour="yellow"
          onClick={toggleSeeDetails}
        >
          {seeDetails ? (
            <OChartBarIcon className="w-5 h-5" />
          ) : (
            <ChartBarIcon className="w-5 h-5" />
          )}
        </SecondaryButton>
      </Cell>

      <Cell className="col-span-5 col-start-3">
        <Transition
          show={!!seeDetails}
          enter="transition duration-100"
          enterFrom="opacity-0 -translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="transition duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-10"
        >
          <div className="bg-lisbon-400 shadow rounded-lg px-4 py-5 sm:p-6 mt-3 text-black">
            <div className="grid grid-cols-2 gap-4">
              {getExtraStats(market, total_supply).map(
                ({ value, label, className = '' }, i) => (
                  <div key={`${label}-${i}`} className="">
                    <div className="mt-1 flex items-baseline justify-between md:block lg:flex">
                      <div
                        className={classNames(
                          className,
                          'flex items-baseline text-lg sm:text-xl font-semibold truncate'
                        )}
                      >
                        {value}
                      </div>
                    </div>
                    <div className="text-sm font-normal">{label}</div>
                  </div>
                )
              )}
            </div>
            <div className="">
              <div className="mt-6 flex gap-2 items-center flex-col md:flex-row">
                <SecondaryButton
                  size="md"
                  colour="yellow"
                  as="a"
                  href={market.liquidity_link}
                  target="_blank"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Add Liquidity{' '}
                  <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2 -mr-1" />
                </SecondaryButton>
                <SecondaryButton size="md" colour="yellow">
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  <span>
                    Request liquidity{' '}
                    <small className="whitespace-nowrap ">(coming soon)</small>
                  </span>
                </SecondaryButton>
              </div>
            </div>
            {display_notification && (
              <div className="mt-6 flex w-full gap-4 items-start sm:items-stretch">
                <PrimaryButton size="md" className="min-w-[120px]">
                  <div>
                    Notify me <br />
                    <small>(coming soon)</small>
                  </div>
                </PrimaryButton>

                <NotifyDropDown
                  value={options}
                  onChange={(v) => setOptions(v)}
                  options={notificationOptions2}
                />
              </div>
            )}
          </div>
        </Transition>
      </Cell>
    </Row>
  );
}

function getExtraStats(market, total_supply) {
  const { currency, pairs } = market;
  return [
    {
      label: 'Total supply',
      value: `${numberWithCommas(total_supply.toFixed(2))} ${currency}`,
    },
    {
      label: 'Swap pairs',
      value: (
        <>
          {pairs[0]}{' '}
          <ArrowsRightLeftIcon className="w-5 h-5 shrink-0 relative top-0.5 mx-1" />{' '}
          {pairs[1]}
        </>
      ),
    },
  ];
}
