const demoLiveData = {};

export const simulator = (liveData) => {
  Object.keys(liveData.bonds).map((address) => {
    let cached = demoLiveData[address];
    if (!cached) {
      cached = sampleLiveMarket();
      demoLiveData[address] = cached;
    } else updateCached(cached);
    liveData.bonds[address].live_markets = [cached];
    liveData.bonds[address].best_price = cached.price;
  });
  console.log(liveData);
};

const updateCached = (cached) => {
  cached.price =
    cached.price < 0.85 ? randomNumFromInterval(1, 1.25) : cached.price - 0.013;
  cached.discount = 100 / cached.price - 100;
};

const sampleLiveMarket = () => {
  const price = randomNumFromInterval(0.97, 1.25);
  return {
    exchange: {
      name: 'Bond protocol',
    },
    price,
    currency: 'OHM',
    buy_link: '#',
    discount: 100 / price - 100, // in percentage
    total_amount_available: undefined,
    remaining_available: randomIntFromInterval(4000, 6000),
    min_sale_price: undefined,
    end_timestamp: undefined,
    max_bondable_single_tx: 400,
  };
};

function randomNumFromInterval(min, max) {
  return Math.random() * (max - min) + min;
}
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
