import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { StoreProvider, useStoreTopLevel } from './store.jsx';

const Main = () => {
  const store = useStoreTopLevel();
  return (
    <StoreProvider value={store}>
      <App />
    </StoreProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
