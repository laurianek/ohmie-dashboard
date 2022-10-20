import React, { useState, useContext, createContext } from 'react';
import initialData from './assets/sample-data.js';

const StoreContext = createContext(null);
StoreContext.displayName = 'StoreContext';

export const PARTIAL = 'partial';
export const ALL = 'all';
export const ONE = 'one';

export function useStoreTopLevel() {
  const [data, setData] = useState(initialData);
  const [currentBondId, setCurrentBond] = useState(undefined);
  const [shownBonds, setShownBonds] = useState(PARTIAL);
  const [userStack, setUserStack] = useState(1);
  const currentBond = currentBondId ? data.bonds[currentBondId] : undefined;

  const changeCurrentBond = (bondId) => {
    setShownBonds((v) => {
      setCurrentBond(bondId);
      if ((v === ONE || v === PARTIAL) && !bondId) return PARTIAL;
      if (v === PARTIAL && bondId) return PARTIAL;
      return ALL;
    });
  };
  const getBondCardClassName = (i, isActive) => {
    if (shownBonds === ALL) return '';
    if (shownBonds === PARTIAL && isActive) return '';
    if (shownBonds === PARTIAL && i < 2) return '';
    if (shownBonds === PARTIAL && i < 3) return 'hidden lg:block';
    return 'hidden';
  };

  const toggleShownBonds = () =>
    currentBondId
      ? shownBonds === ALL
        ? setShownBonds(PARTIAL)
        : setShownBonds(ALL)
      : shownBonds === ALL
      ? setShownBonds(PARTIAL)
      : setShownBonds(ALL);

  return {
    data,
    currentBondId,
    currentBond,
    shownBonds,
    userStack,
    changeCurrentBond,
    getBondCardClassName,
    toggleShownBonds,
    setUserStack,
    setData,
  };
}

export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
