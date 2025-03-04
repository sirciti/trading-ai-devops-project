require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { fetchCryptoData, AITrader, SuperTraderAI } = require('./src/tradingLogic');
const { fetchAndStoreCoinData } = require('./services/coinmarketcap');
const { executeTrades } = require('./services/tradingService');
const { client, httpRequestDurationMicroseconds } = require('./src/metrics');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware pour mesurer la durée des requêtes
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route?.path || req.url, code: res.statusCode });
  });
  next();
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB Atlas'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Initialisation des traders et du superTrader
const traders = [
  new AITrader('Trader1', {}),
  new AITrader('Trader2', {}),
  new AITrader('Trader3', {}),
  new AITrader('Trader4', {})
];

const superTrader = new SuperTraderAI(traders);

// Routes
const traderRoutes = require('./routes/traders');
const coinRoutes = require('./routes/coins');
const tradeRoutes = require('./routes/trades');

app.use('/api/traders', traderRoutes);
app.use('/api/coins', coinRoutes);
app.use('/api/trades', tradeRoutes);

// Route principale
app.get('/', (req, res) => {
  res.json({ message: 'API de Trading IA opérationnelle' });
});

// Nouvelles routes
app.get('/api/market-data', async (req, res) => {
  const cryptoSymbols = ['BTC', 'ETH', 'EGLD', 'SOL', 'ATOM', 'OP', 'SAND'];
  const data = await fetchCryptoData(cryptoSymbols);
  res.json(data);
});

app.get('/api/trader-performance', (req, res) => {
  const performance = traders.map(trader => ({
    name: trader.name,
    portfolio: trader.portfolio
  }));
  res.json(performance);
});

// Endpoint pour exposer les métriques Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Mise à jour périodique des données et exécution des trades
setInterval(async () => {
  await fetchAndStoreCoinData();
  await executeTrades();
  await superTrader.analyze(); // Ajout de l'analyse du superTrader
}, 5 * 60 * 1000); // Toutes les 5 minutes

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  fetchAndStoreCoinData(); // Fetch initial data
  executeTrades(); // Execute initial trades
  superTrader.analyze(); // Initial superTrader analysis
});
