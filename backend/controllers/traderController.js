const Trader = require('../models/trader');

// Get all traders
exports.getAllTraders = async (req, res) => {
  try {
    const traders = await Trader.find();
    res.status(200).json(traders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single trader
exports.getTraderById = async (req, res) => {
  try {
    const trader = await Trader.findById(req.params.id);
    if (!trader) {
      return res.status(404).json({ message: 'Trader not found' });
    }
    res.status(200).json(trader);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new trader
exports.createTrader = async (req, res) => {
  const trader = new Trader(req.body);
  try {
    const newTrader = await trader.save();
    res.status(201).json(newTrader);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a trader
exports.updateTrader = async (req, res) => {
  try {
    const trader = await Trader.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    if (!trader) {
      return res.status(404).json({ message: 'Trader not found' });
    }
    res.status(200).json(trader);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a trader
exports.deleteTrader = async (req, res) => {
  try {
    const trader = await Trader.findByIdAndDelete(req.params.id);
    if (!trader) {
      return res.status(404).json({ message: 'Trader not found' });
    }
    res.status(200).json({ message: 'Trader deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
