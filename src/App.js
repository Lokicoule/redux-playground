import React from 'react';
import './App.css';
import Tasks from './components/Tasks';
import configureStore from './store/configureStore';
import StoreContext from './contexts/storeContexts';

const store = configureStore();

function App() {
  return (
    <StoreContext.Provider value={store}>
      <Tasks></Tasks>
    </StoreContext.Provider>
  );
}

export default App;
