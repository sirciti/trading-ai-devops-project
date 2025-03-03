const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

router.get('/', tradeController.getAllTrades);
router.get('/trader/:traderId', tradeController.getTradesByTraderId);

module.exports = router;
