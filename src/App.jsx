import React from 'react';
import { useStore, ALL } from './store.jsx';
import './App.css';
import Dashboard from './components/Dashboard';
import BondCard from './components/BondCard.jsx';
import YourStake from './components/YourStake.jsx';
import BondDisplay from './components/BondDisplay';
import { PlainButton } from './components/Buttons.jsx';

function App() {
  const {
    currentBondId,
    shownBonds,
    getBondCardClassName,
    toggleShownBonds,
    data,
    isLoading,
  } = useStore();

  return (
    <Dashboard>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {!isLoading &&
          Object.values(data?.bonds).map((bond, index) => (
            <BondCard
              key={bond.token_name}
              bond={bond}
              className={getBondCardClassName(
                index,
                bond.token_name === currentBondId
              )}
            />
          ))}
        {isLoading && [1, 2].map((i) => <BondCard key={i} />)}
      </ul>
      <div className="flex justify-end pt-2 pb-3">
        {!isLoading && (
          <PlainButton onClick={toggleShownBonds}>
            {shownBonds === ALL ? '[-] View less' : '[+] View all bonds'}
          </PlainButton>
        )}
      </div>
      <YourStake />
      <BondDisplay />

      {/*<p>*/}
      {/*  available secondary market ?(secondary market is when you buy*/}
      {/*  from another user instead of the protocol)*/}
      {/*</p>*/}
      {/*<p>total quantity (Market dept)</p>*/}
      {/*<p>my holdings</p>*/}
      {/*<p>sell on the secondary market</p>*/}
      {/*<p>redeem (number of days till can redeem)</p>*/}
      {/*<p>staking rebase rate</p>*/}
      {/*<p>request secondary market liquidity</p>*/}
    </Dashboard>
  );
}

export default App;
