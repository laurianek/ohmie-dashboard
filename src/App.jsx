import React from 'react';
import { useStore, ALL } from './store.jsx';
import './App.css';
import Dashboard from './components/Dashboard';
import BondCard from './components/BondCard.jsx';
import YourStake from './components/YourStake.jsx';
import BondDisplay from './components/BondDisplay';
import { PlainButton } from './components/Buttons.jsx';

import data from './assets/sample-data.js';
import { classNames } from './util';

function App() {
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
        <PlainButton onClick={toggleShownBonds}>
          {shownBonds === ALL ? 'View less' : 'View all bonds'}
        </PlainButton>
      </div>

      <YourStake />
      <BondDisplay />

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
