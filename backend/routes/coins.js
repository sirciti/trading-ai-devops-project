const express = require('express');
const router = express.Router();
const coinController = require('../controllers/coinController');

router.get('/', coinController.getAllCoins);
router.get('/:id', coinController.getCoinById);

module.exports = router;
