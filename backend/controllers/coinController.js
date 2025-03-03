const Coin = require('../models/coin');

exports.getAllCoins = async (req, res) => {
  try {
    const coins = await Coin.find();
    res.status(200).json(coins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCoinById = async (req, res) => {
  try {
    const coin = await Coin.findOne({ id: req.params.id });
    if (!coin) {
      return res.status(404).json({ message: 'Coin not found' });
    }
    res.status(200).json(coin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
