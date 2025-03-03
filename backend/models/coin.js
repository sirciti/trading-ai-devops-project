const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  volume_24h: { type: Number, required: true },
  market_cap: { type: Number, required: true },
  last_updated: { type: Date, required: true }
});

module.exports = mongoose.model('Coin', coinSchema);
