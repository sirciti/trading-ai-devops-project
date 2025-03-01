const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// Dans un environnement réel, cette URL viendrait d'une variable d'environnement
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tradingai';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Routes
const traderRoutes = require('./routes/traders');
app.use('/api/traders', traderRoutes);

// Route principale
app.get('/', (req, res) => {
  res.json({ message: 'API de Trading IA opérationnelle' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});