const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  coinId: Number,
  action: String,
  amount: Number,
  price: Number,
  timestamp: Date
});

const traderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['CEO', 'Trader'],
    required: true
  },
  strategy: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  trades: [tradeSchema],  // Ajout du tableau de trades
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trader', traderSchema);
