import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TradeList = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trades');
        setTrades(response.data);
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    };

    fetchTrades();
    const interval = setInterval(fetchTrades, 60000); // Rafraîchir toutes les minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Recent Trades</h2>
      <table>
        <thead>
          <tr>
            <th>Trader</th>
            <th>Coin</th>
            <th>Action</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr key={index}>
              <td>{trade.traderId}</td>
              <td>{trade.coinId}</td>
              <td>{trade.action}</td>
              <td>{trade.amount}</td>
              <td>${trade.price.toFixed(2)}</td>
              <td>{new Date(trade.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeList;
