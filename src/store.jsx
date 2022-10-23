import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useRef,
} from 'react';

const StoreContext = createContext(null);
StoreContext.displayName = 'StoreContext';

export const PARTIAL = 'partial';
export const ALL = 'all';
export const ONE = 'one';

export function useStoreTopLevel() {
  const [isLoading, setLoading] = useState(true);
  const isFetching = useRef(false);
  const [data, setData] = useState();
  const [currentBondId, setCurrentBond] = useState(undefined);
  const [shownBonds, setShownBonds] = useState(PARTIAL);
  const [userStack, setUserStack] = useState(1);
  const currentBond = currentBondId ? data.bonds[currentBondId] : undefined;

  const fetchDataFromServer = async () => {
    try {
      if (isFetching.current) return;
      isFetching.current = true;
      console.log('fetchDataFromServer');
      const res = await fetch('https://ohmie-dashboard-backend.herokuapp.com/');
      const _data = await res.json();
      setData(_data);
      isFetching.current = false;
    } catch (e) {
      // rollbar cannot fetch app
    }
  };

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

  useEffect(() => {
    function init() {
      return fetchDataFromServer();
    }
    init();
  }, []);

  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  return {
    data,
    isLoading,
    currentBondId,
    currentBond,
    shownBonds,
    userStack,
    changeCurrentBond,
    getBondCardClassName,
    toggleShownBonds,
    setUserStack,
    setData,
    fetchData: fetchDataFromServer,
  };
}

export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
