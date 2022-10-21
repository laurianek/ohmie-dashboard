import React from 'react';
import { format } from 'date-fns';

import Header from './Header.jsx';
import { HeaderRow } from './Row.jsx';
import Cell from './Cell.jsx';
import MarketEmpty from './MarketEmpty.jsx';
import MarketDetails from './MarketDetails.jsx';
import { useStore } from '../../store.jsx';

export default function BondDisplay() {
  const { userStack, currentBond } = useStore();
  const subTitle = currentBond
    ? format(new Date(currentBond.expiry_timestamp * 1000), 'PPPp')
    : '';
  const liveMarkets =
    currentBond && currentBond.live_markets ? currentBond.live_markets : [];
  const secondaryMarkets =
    currentBond && currentBond.secondary_markets
      ? currentBond.secondary_markets
      : [];

  return (
    <>
      <Header
        title={currentBond ? currentBond.display_name : 'All Bond Markets'}
        subTitle={subTitle}
      />

      <div className="mt-5 border-y border-lisbon-900">
        <div className="sm:divide-y sm:divide-lisbon-400">
          <HeaderRow>
            <Cell className="pl-2 col-span-2">Live markets</Cell>
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
            <MarketEmpty>No current live markets available</MarketEmpty>
          )}
          <HeaderRow>
            <Cell className="pl-2 col-span-2">Secondary markets</Cell>
          </HeaderRow>
          {secondaryMarkets.length !== 0 &&
            secondaryMarkets.map((market, index) => (
              <MarketDetails
                userStack={userStack}
                market={market}
                bond={currentBond}
                key={`live-market-${index}`}
                index={index}
              />
            ))}
          {secondaryMarkets.length === 0 && (
            <MarketEmpty action={{ text: 'Add liquidity using Uniswap now' }}>
              No liquidity found in secondary markets
            </MarketEmpty>
          )}
        </div>
      </div>
    </>
  );
}
