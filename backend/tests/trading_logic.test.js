const { analyzeMarket, decideTrade } = require('../src/tradingLogic');

describe('Trading Logic', () => {
  test('analyzeMarket returns market trend', () => {
    const marketData = { /* mock data */ };
    expect(analyzeMarket(marketData)).toBeDefined();
  });

  test('decideTrade returns valid trade decision', () => {
    const analysis = { trend: 'up', confidence: 0.8 };
    const decision = decideTrade(analysis);
    expect(decision).toHaveProperty('action');
    expect(decision).toHaveProperty('amount');
  });
});
