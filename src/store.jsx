import React, { useState, useContext, createContext } from 'react';

const StoreContext = createContext(null);
StoreContext.displayName = 'StoreContext';

export function useStoreTopLevel() {
  const [currentBondId, setCurrentBond] = useState(undefined);

  return {
    currentBondId,
    changeCurrentBond: (bond_token_name) => setCurrentBond(bond_token_name),
  };
}

export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
