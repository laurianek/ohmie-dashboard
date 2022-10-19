import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Counter from './Counter';
import Dashboard from './components/Dashboard';
import data from './assets/sample-data.js';

function App() {
  return (
    <Dashboard>
      <p>Ohm bonds | expiry 2022-11-03</p>
      <p>
        avaliable live market ?<span>price</span>
        <span>buy</span>
      </p>
      <p>gnosis opsion</p>
      <p>
        avalaible secondary market market ?(secondary market is when you buy
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
