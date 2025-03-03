import React, { useState } from 'react';
import styles from './App.module.css';
import TradeList from './components/TradeList';
import CoinList from './components/CoinList';
import TradingPerformance from './components/TradingPerformance';

function App() {
  const [traders, setTraders] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Trader',
    strategy: ''
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Trading AI Platform</h1>
      </header>
      <main className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h2>{editing ? 'Edit Trader' : 'Add New Trader'}</h2>
            {/* Formulaire d'ajout/édition de trader */}
          </div>
          <div className={styles.column}>
            <h2>Traders List</h2>
            {/* Liste des traders */}
          </div>
        </div>
        
        <div className={styles.grid}>
          <div className={styles.column}>
            <CoinList />
          </div>
          <div className={styles.column}>
            <TradeList />
          </div>
        </div>
        
        <div className={styles.fullWidth}>
          <TradingPerformance />
        </div>
      </main>
    </div>
  );
}

export default App;
