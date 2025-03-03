const Trader = require('../models/trader');

exports.getTradesByTraderId = async (req, res) => {
  try {
    const trader = await Trader.findById(req.params.traderId);
    if (!trader) {
      return res.status(404).json({ message: 'Trader not found' });
    }
    res.status(200).json(trader.trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTrades = async (req, res) => {
  try {
    const traders = await Trader.find();
    const allTrades = traders.flatMap(trader => trader.trades);
    res.status(200).json(allTrades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
