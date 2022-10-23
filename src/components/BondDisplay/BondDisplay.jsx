import React from 'react';

import Header from './Header.jsx';
import { HeaderRow } from './Row.jsx';
import Cell from './Cell.jsx';
import MarketEmpty from './MarketEmpty.jsx';
import MarketDetails from './MarketDetails.jsx';
import { useStore } from '../../store.jsx';
import { getFormatBondExpiry } from '../../util/index.js';

export default function BondDisplay() {
  const { userStack, currentBond, data, isLoading } = useStore();
  if (isLoading) return <Placeholder />;

  const subTitle = currentBond
    ? getFormatBondExpiry({ timestamp: currentBond.expiry_timestamp })
    : '';
  const liveMarkets =
    currentBond && currentBond.live_markets
      ? currentBond.live_markets
      : getAllMarketType('live', data);
  const secondaryMarkets =
    currentBond && currentBond.secondary_markets
      ? currentBond.secondary_markets
      : getAllMarketType('secondary', data);

  return (
    <>
      <Header
        title={currentBond ? currentBond.display_name : 'All Bond Markets'}
        subTitle={subTitle}
      />

      <div className="mt-5 border-t border-lisbon-900">
        <div className="sm:divide-y sm:divide-lisbon-400">
          <HeaderRow>
            <Cell className="pl-2 sm:col-span-2">Live markets</Cell>
            <Cell className="sm:col-start-3">Price</Cell>
            <Cell>Discount</Cell>
            <Cell>Compare to staking</Cell>
            <Cell className="sm:col-span-2">You would get</Cell>
          </HeaderRow>
          {liveMarkets.length !== 0 &&
            liveMarkets.map((market, index) => (
              <MarketDetails
                userStack={userStack}
                market={market}
                expiryTimestamp={
                  currentBond?.expiry_timestamp || market.bond_expiry_timestamp
                }
                key={`live-market-${index}`}
                index={index}
              />
            ))}
          {liveMarkets.length === 0 && (
            <MarketEmpty>No current live markets available</MarketEmpty>
          )}
          <HeaderRow>
            <Cell className="pl-2 sm:col-span-2">Secondary markets</Cell>
            <Cell>Price</Cell>
            <Cell>Compare to staking</Cell>
            <Cell className="sm:col-span-3">You would get</Cell>
          </HeaderRow>
          {secondaryMarkets.length !== 0 &&
            secondaryMarkets.map((market, index) => (
              <MarketDetails
                userStack={userStack}
                market={market}
                expiryTimestamp={
                  currentBond?.expiry_timestamp || market.bond_expiry_timestamp
                }
                key={`live-market-${index}`}
                index={index}
                isSecondary
              />
            ))}
          {secondaryMarkets.length === 0 && (
            <MarketEmpty
              actions={[
                { text: 'Add liquidity (coming soon)' },
                { text: 'Request liquidity (coming soon)' },
              ]}
            >
              No liquidity found in secondary markets
            </MarketEmpty>
          )}
        </div>
      </div>
    </>
  );
}

function getAllMarketType(type, data) {
  if (type === 'live')
    return Object.values(data.bonds)
      .map(({ live_markets, expiry_timestamp }) =>
        live_markets.map((m) => ({
          ...m,
          bond_expiry_timestamp: expiry_timestamp,
          _extra: {
            label:
              'Bond for ' +
              getFormatBondExpiry({ timestamp: expiry_timestamp }),
          },
        }))
      )
      .flat();
  return Object.values(data.bonds)
    .map(({ secondary_markets, expiry_timestamp }) =>
      secondary_markets.map((m) => ({
        ...m,
        bond_expiry_timestamp: expiry_timestamp,
        _extra: {
          label:
            'Bond for ' + getFormatBondExpiry({ timestamp: expiry_timestamp }),
        },
      }))
    )
    .flat();
}

function Placeholder() {
  return (
    <div className="py-12 animate-pulse">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {[1, 2, 3, 4].map((feature) => (
              <div key={feature} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-lisbon-300" />
                  <p className="ml-16 text-lg font-medium leading-6 bg-lisbon-300 w-24 h-4 rounded" />
                </dt>
                <dd className="mt-2 ml-16 text-base">
                  <div className="bg-lisbon-300 h-4 rounded mt-2" />
                  <div className="bg-lisbon-300 h-4 rounded mt-2" />
                  <div className="bg-lisbon-300 h-4 rounded mt-2" />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
