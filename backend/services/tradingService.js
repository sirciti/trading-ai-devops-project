const Trader = require('../models/trader');
const Coin = require('../models/coin');

async function executeTrades() {
  try {
    const traders = await Trader.find({ active: true });
    const coins = await Coin.find().sort({ market_cap: -1 }).limit(10);

    for (let trader of traders) {
      for (let coin of coins) {
        const decision = makeTradeDecision(trader, coin);
        if (decision.action !== 'hold') {
          await recordTrade(trader, coin, decision);
        }
      }
    }
    console.log('Trades executed successfully');
  } catch (error) {
    console.error('Error executing trades:', error);
  }
}

function makeTradeDecision(trader, coin) {
  // Logique simplifiée pour la démonstration
  const random = Math.random();
  if (random < 0.4) return { action: 'buy', amount: 100 };
  if (random < 0.8) return { action: 'sell', amount: 100 };
  return { action: 'hold' };
}

async function recordTrade(trader, coin, decision) {
  const trade = {
    traderId: trader._id,
    coinId: coin.id,
    action: decision.action,
    amount: decision.amount,
    price: coin.price,
    timestamp: new Date()
  };
  
  trader.trades.push(trade);
  await trader.save();
}

module.exports = { executeTrades };

