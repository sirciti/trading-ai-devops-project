const express = require('express');
const router = express.Router();
const traderController = require('../controllers/traderController');

// CRUD routes
router.get('/', traderController.getAllTraders);
router.get('/:id', traderController.getTraderById);
router.post('/', traderController.createTrader);
router.put('/:id', traderController.updateTrader);
router.delete('/:id', traderController.deleteTrader);

module.exports = router;