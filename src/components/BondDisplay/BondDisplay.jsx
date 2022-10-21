import React, { useState } from 'react';
import { format } from 'date-fns';
import { Transition } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { OmegaIcon } from '../Icons.jsx';
import {
  classNames,
  calculate_bond_return,
  calculate_percent_return_bond_vs_staking,
  getIntervalFromNow,
  numberWithCommas,
  getFormatIntervalFromNow,
} from '../../util';
import notificationOptions from './NotificationOptions.js';

import { PrimaryButton, SecondaryButton } from '../Buttons.jsx';
import Header from './Header.jsx';
import Row, { HeaderRow } from './Row.jsx';
import Cell from './Cell.jsx';
import { FakeInput } from './FakeInput.jsx';
import NotifyDropDown from './NotifyDropDown.jsx';
import { useStore } from '../../store.jsx';

export default function BondDisplay() {
  const { userStack, currentBond, data } = useStore();
  const subTitle = currentBond
    ? format(new Date(currentBond.expiry_timestamp * 1000), 'PPPp')
    : '';
  const liveMarkets =
    currentBond && currentBond.live_markets ? currentBond.live_markets : [];

  return (
    <>
      <Header
        title={currentBond ? currentBond.display_name : 'All Bond Markets'}
        subTitle={subTitle}
      />

      <div className="mt-5 border-y border-lisbon-900">
        <div className="sm:divide-y sm:divide-lisbon-400">
          <HeaderRow>
            <Cell className="pl-2">Live markets</Cell>
            <Cell className="sm:col-start-3">Price</Cell>
            <Cell>Discount</Cell>
            <Cell>Compare to staking</Cell>
            <Cell>You would get</Cell>
          </HeaderRow>
          {liveMarkets.length !== 0 &&
            liveMarkets.map((market, index) => (
              <MarketDetails
                userStack={userStack}
                market={market}
                bond={currentBond}
                key={`live-market-${index}`}
                index={index}
              />
            ))}
          {liveMarkets.length === 0 && (
            <>
              <div className="text-center">
                <div
                  data-name="Canvas"
                  className="w-1/2 min-w-[200px] mx-auto relative min-h-[150px]"
                >
                  <div
                    data-name="bond animated"
                    style={{
                      left: 'calc(50% + 20px)',
                      top: 'calc(50% + 10px)',
                    }}
                    className="bg-lisbon-600 border border-2 border-lisbon-300 w-[120px] h-[50px] rounded absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                  >
                    <OmegaIcon size={20} />
                  </div>
                  <div
                    data-name="bond animated"
                    style={{
                      left: 'calc(50% + 10px)',
                      top: 'calc(50% + 5px)',
                    }}
                    className="bg-lisbon-600 border border-2 border-lisbon-300 w-[120px] h-[50px] rounded absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                  >
                    <OmegaIcon size={20} />
                  </div>
                  <div
                    data-name="bond animated"
                    style={{ left: 'calc(50%)', top: 'calc(50%)' }}
                    className="bg-lisbon-600 border border-2 border-lisbon-300 w-[120px] h-[50px] rounded absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                  >
                    <OmegaIcon size={20} />
                  </div>
                </div>
                <h4 className="mt-2 font-medium">
                  No current live markets available
                </h4>
                <div className="mt-6">
                  <PrimaryButton size="md">
                    <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Add Liquidity (coming soon)
                  </PrimaryButton>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function getExtraStats(market, userStack = 0, userPL = 0) {
  const {
    price,
    currency,
    remaining_available,
    total_amount_available,
    min_sale_price,
    end_timestamp,
    max_bondable_single_tx,
  } = market;
  const base = [
    { label: 'Price', value: `${Number(price).toFixed(2)} ${currency}` },
    {
      label: 'Back for every 1 OHM you put in',
      value: `${numberWithCommas(userStack.toFixed(4))}`,
      className: userStack < 1 ? 'text-red-700' : 'text-lime-300',
    },
    {
      label: 'Compared to staking',
      value: `${numberWithCommas(userPL.toFixed(2))} %`,
      className: userPL < 0 ? 'text-red-700' : 'text-lime-300',
    },
  ];

  if (market.remaining_available) {
    return base.concat([
      {
        label: 'Remaining available',
        value: numberWithCommas(remaining_available),
      },
      {
        label: 'Max bondable in one transaction',
        value: numberWithCommas(max_bondable_single_tx),
      },
    ]);
  }
  return base.concat([
    {
      label: 'Total amount in auction',
      value: numberWithCommas(total_amount_available),
    },
    { label: 'Min. sale price', value: numberWithCommas(min_sale_price) },
    {
      label: 'Gnosis option ending',
      value: getFormatIntervalFromNow({ timestamp: end_timestamp }),
    },
  ]);
}

function MarketDetails({ market, userStack, bond, index }) {
  const [seeDetails, setSeeDetails] = useState({});
  const [options, setOptions] = useState(notificationOptions[0].text);

  const bondReturn = calculate_bond_return(userStack, market.price);
  const _1BondReturn = calculate_bond_return(1, market.price);
  const dayDiff = getIntervalFromNow({
    timestamp: bond.expiry_timestamp,
  });
  const comparisonPercent = calculate_percent_return_bond_vs_staking(
    userStack,
    market.price,
    dayDiff.days
  );
  const toggleSeeDetails = (key) => () =>
    setSeeDetails((state) => ({ ...state, [key]: !state[key] }));

  return (
    <Row className={!seeDetails[index] ? 'sm:gap-y-0' : 'sm:gap-y-4'}>
      <div className="font-medium sm:col-span-2 text-paris-500 text-xl sm:text-sm">
        {market.exchange.name}
      </div>
      <Cell label={'Price'}>
        {market.price} {market.currency}
      </Cell>
      <Cell
        label={'Discount'}
        className={parseFloat(market.discount) < 0 ? 'text-red-500' : ''}
      >
        {parseFloat(market.discount).toFixed(2)} %
      </Cell>
      <Cell
        label={'Comp. staking'}
        className={comparisonPercent < 0 ? 'text-red-500' : 'text-lime-300'}
      >
        {comparisonPercent.toFixed(2)} %
      </Cell>
      <Cell
        label={'You would get'}
        className="sm:col-span-2 flex justify-end flex-wrap gap-1.5"
      >
        <FakeInput currency={market.currency}>
          {numberWithCommas((bondReturn || 0).toFixed(4))}
        </FakeInput>
        <SecondaryButton
          className="min-w-[85px] min-h-[36px] my-0.5"
          onClick={toggleSeeDetails(index)}
        >
          {!seeDetails[index] ? 'See details' : 'Hide details'}
        </SecondaryButton>
        <PrimaryButton
          link={market.buy_link}
          className="min-w-[85px] min-h-[36px] my-0.5"
        >
          BUY
        </PrimaryButton>
      </Cell>

      <Cell className="col-span-5 col-start-3">
        <Transition
          show={!!seeDetails[index]}
          enter="transition duration-100"
          enterFrom="opacity-0 -translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="transition duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-10"
        >
          <div className="bg-lisbon-400 shadow rounded-lg px-4 py-5 sm:p-6 mt-3 text-black">
            <div className="grid grid-cols-3 gap-4">
              {getExtraStats(market, _1BondReturn, comparisonPercent).map(
                ({ label, value, className = 'text-parisII-50' }, i) => (
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
            <div className="mt-6 flex w-full gap-4 items-start sm:items-stretch">
              <PrimaryButton size="md" className="min-w-[120px]">
                <div>
                  Notify me <br />
                  <small>(coming soon)</small>
                </div>
              </PrimaryButton>

              <NotifyDropDown value={options} onChange={(v) => setOptions(v)} />
            </div>
          </div>
        </Transition>
      </Cell>
    </Row>
  );
}
