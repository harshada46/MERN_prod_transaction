// src/App.js
import React from 'react';
import TransactionList from './components/TransactionList';
import TransactionStatistics from './components/TransactionStatistics';
function App() {
  return (
    <div className="App">
      <TransactionList />
      <TransactionStatistics/>
    </div>
  );
}

export default App;
