import React from 'react';
import { format } from 'date-fns';
import { classNames } from '../../util';
import data from '../../assets/sample-data.js';

import { PrimaryButton, SecondaryButton } from '../Buttons.jsx';
import Header from './Header.jsx';
import Row, { HeaderRow } from './Row.jsx';
import Cell from './Cell.jsx';
import { FakeInput } from './FakeInput.jsx';

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
