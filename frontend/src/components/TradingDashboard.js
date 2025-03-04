import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TradingDashboard = () => {
  const [marketData, setMarketData] = useState({});
  const [traderPerformance, setTraderPerformance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const marketResponse = await axios.get('/api/market-data');
      setMarketData(marketResponse.data);

      const performanceResponse = await axios.get('/api/trader-performance');
      setTraderPerformance(performanceResponse.data);
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Market Data</h2>
      {Object.entries(marketData).map(([symbol, data]) => (
        <div key={symbol}>
          <h3>{symbol}</h3>
          <p>Price: ${data.quote.USD.price.toFixed(2)}</p>
        </div>
      ))}

      <h2>Trader Performance</h2>
      {traderPerformance.map(trader => (
        <div key={trader.name}>
          <h3>{trader.name}</h3>
          <p>USDC Balance: ${trader.portfolio.USDC.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default TradingDashboard;
