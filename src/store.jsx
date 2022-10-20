import React, { useState, useContext, createContext } from 'react';

const StoreContext = createContext(null);
StoreContext.displayName = 'StoreContext';

export const PARTIAL = 'partial';
export const ALL = 'all';
export const ONE = 'one';

export function useStoreTopLevel() {
  const [currentBondId, setCurrentBond] = useState(undefined);
  const [shownBonds, setShownBonds] = useState(PARTIAL);

  const changeCurrentBond = (bondId) => {
    setShownBonds((v) => {
      setCurrentBond(bondId);
      if (v === ONE && !bondId) return PARTIAL;
      if (v === PARTIAL && bondId) return ONE;
      return ALL;
    });
  };
  const getBondCardClassName = (i, isActive) => {
    if (shownBonds === ALL) return '';
    if (shownBonds === ONE && isActive) return '';
    if (shownBonds === PARTIAL && i < 2) return '';
    if (shownBonds === PARTIAL && i < 3) return 'hidden lg:block';
    return 'hidden';
  };

  const toggleShownBonds = () =>
    currentBondId
      ? shownBonds === ALL
        ? setShownBonds(ONE)
        : setShownBonds(ALL)
      : shownBonds === ALL
      ? setShownBonds(PARTIAL)
      : setShownBonds(ALL);

  return {
    currentBondId,
    shownBonds,
    changeCurrentBond,
    getBondCardClassName,
    toggleShownBonds,
  };
}

export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
