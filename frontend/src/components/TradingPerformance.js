import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const TradingPerformance = () => {
  const [performanceData, setPerformanceData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trades');
        const trades = response.data;

        // Traitement des données pour le graphique
        const traderPerformance = {};
        trades.forEach((trade) => {
          if (!traderPerformance[trade.traderId]) {
            traderPerformance[trade.traderId] = [];
          }
          traderPerformance[trade.traderId].push({
            timestamp: new Date(trade.timestamp),
            amount: trade.action === 'buy' ? -trade.amount : trade.amount,
          });
        });

        const datasets = Object.entries(traderPerformance).map(([traderId, trades]) => {
          const cumulativePerformance = trades.reduce((acc, trade, index) => {
            const prevValue = index > 0 ? acc[index - 1].value : 0;
            return [...acc, { timestamp: trade.timestamp, value: prevValue + trade.amount }];
          }, []);

          return {
            label: `Trader ${traderId}`,
            data: cumulativePerformance.map((point) => point.value),
            fill: false,
            borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          };
        });

        const labels = datasets[0].data.map((_, index) => `Day ${index + 1}`);

        setPerformanceData({
          labels,
          datasets,
        });
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    fetchPerformanceData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Trading Performance Over Time',
      },
    },
  };

  return (
    <div>
      <h2>Trading Performance</h2>
      <Line options={options} data={performanceData} />
    </div>
  );
};

export default TradingPerformance;
