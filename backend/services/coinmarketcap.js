const axios = require('axios');
const Coin = require('../models/coin');

const CMC_API_KEY = process.env.CMC_API_KEY;
const CMC_API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

async function fetchAndStoreCoinData() {
  try {
    const response = await axios.get(CMC_API_URL, {
      headers: {
        'X-CMC_PRO_API_KEY': CMC_API_KEY
      },
      params: {
        'start': '1',
        'limit': '100',
        'convert': 'USD'
      }
    });

    const coins = response.data.data;

    for (let coin of coins) {
      await Coin.findOneAndUpdate(
        { id: coin.id },
        {
          name: coin.name,
          symbol: coin.symbol,
          price: coin.quote.USD.price,
          volume_24h: coin.quote.USD.volume_24h,
          market_cap: coin.quote.USD.market_cap,
          last_updated: coin.last_updated
        },
        { upsert: true, new: true }
      );
    }

    console.log('Coin data updated successfully');
  } catch (error) {
    console.error('Error fetching coin data:', error);
  }
}

module.exports = { fetchAndStoreCoinData };
