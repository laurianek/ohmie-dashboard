import React from 'react';
import { format } from 'date-fns';
import { classNames } from '../../util';
import data from '../../assets/sample-data.js';

import { PrimaryButton, SecondaryButton } from '../Buttons.jsx';
import Header from './Header.jsx';
import Row, { HeaderRow } from './Row.jsx';
import Cell from './Cell.jsx';
import { FakeInput } from './FakeInput.jsx';
import { useStore } from '../../store.jsx';
import { calculate_bond_return } from '../../util';

export default function BondDisplay() {
  const { userStack } = useStore();
  const currentBond = Object.values(data.bonds)[0];
  const market = currentBond.live_markets[0];
  const bondReturn = calculate_bond_return(userStack, market.price);

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
            <Cell label={'Price'}>
              {market.price} {market.currency}
            </Cell>
            <Cell label={'Discount'}>{market.discount}</Cell>
            <Cell label={'Comp. staking'}>{market.discount}</Cell>
            <Cell
              label={'You would get'}
              className="sm:col-span-2 flex justify-end flex-wrap gap-1.5"
            >
              <FakeInput currency={market.currency}>
                {(bondReturn || 0).toFixed(4)}
              </FakeInput>
              <SecondaryButton className="min-w-[85px] min-h-[36px] my-0.5">
                See Details
              </SecondaryButton>
              <PrimaryButton
                link={market.buy_link}
                className="min-w-[85px] min-h-[36px] my-0.5"
              >
                BUY
              </PrimaryButton>
            </Cell>
            <Cell className="col-span-5 col-start-3">
              <div className="bg-lisbon-400 shadow rounded-lg px-4 py-5 sm:p-6 mt-3 text-black">
                <div className="grid grid-cols-3 gap-4">
                  {getExtraStats(market, bondReturn).map(
                    ({ label, value, className = 'text-parisII-50' }, i) => (
                      <div key={`${label}-${i}`}>
                        <div className="mt-1 flex items-baseline justify-between md:block lg:flex">
                          <div
                            className={classNames(
                              className,
                              'flex items-baseline text-xl font-semibold'
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
              </div>
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
    { label: 'Price', value: `${price} ${currency}` },
    {
      label: 'Back for every 1 OHM you put in',
      value: `${userStack.toFixed(4)}`,
      className: userStack < 1 ? 'text-red-700' : 'text-green-300',
    },
    { label: 'Compared to staking', value: userPL },
  ];

  if (market.remaining_available) {
    return base.concat([
      { label: 'Remaining available', value: remaining_available },
      {
        label: 'Max bondable in one transaction',
        value: max_bondable_single_tx,
      },
    ]);
  }
  return base.concat([
    { label: 'Total amount in auction', value: total_amount_available },
    { label: 'Min. sale price', value: min_sale_price },
    { label: 'Gnosis option ending', value: end_timestamp },
  ]);
}
