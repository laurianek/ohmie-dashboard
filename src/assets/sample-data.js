export default {
  base_stake_rate: 1.000065,
  bonds: {
    'OHM-20221103': {
      token_name: 'OHM-20221103',
      display_name: 'Ohm Bonds',
      total_num_holders: 6,
      total_supply: 1625,
      expiry_timestamp: Date.now() + 1000,
      last_refresh: Date.now() - 1000,
      best_price: 1.45,
      currency: 'OHM',
      live_markets: [
        {
          exchange: {
            name: 'Bond protocol',
          },
          price: 1.04,
          currency: 'OHM',
          buy_link: '#',
          discount: '-3%',
          total_amount_available: undefined,
          remaining_available: 4000,
          min_sale_price: undefined,
          end_timestamp: undefined,
          max_bondable_single_tx: 400,
        },
        {
          exchange: {
            name: 'Gnosis Auctions',
          },
          price: 1.04,
          currency: 'OHM',
          buy_link: '#',
          discount: '-3%',
          total_amount_available: 10000,
          remaining_available: undefined,
          min_sale_price: 0.5,
          end_timestamp: Date.now(),
          max_bondable_single_tx: undefined,
        },
      ],
      secondary_markets: [
        {
          exchange: {
            name: 'Uniswap v3',
          },
          market_dept: 0,
          last_sale_price: 0,
        },
      ],
    },
    'OHM-20221104': {
      token_name: 'OHM-20221104',
      display_name: 'Ohm Bonds',
      total_num_holders: 6,
      total_supply: 1625,
      expiry_timestamp: Date.now() + 1000,
      last_refresh: Date.now() - 1000,
      best_price: 0.9512029,
      currency: 'OHM',
    },
    'OHM-20221112': {
      token_name: 'OHM-20221112',
      display_name: 'Ohm Bonds',
      total_num_holders: 6,
      total_supply: 1625,
      expiry_timestamp: Date.now() + 1000,
      last_refresh: Date.now() - 1000,
      best_price: 0.539024,
      currency: 'OHM',
    },
    'OHM-20221120': {
      token_name: 'OHM-20221120',
      display_name: 'Ohm Bonds',
      total_num_holders: 6,
      total_supply: 1625,
      expiry_timestamp: Date.now() + 1000,
      last_refresh: Date.now() - 1000,
      best_price: 0.65,
      currency: 'OHM',
    },
  },
};

const getStakingRewardFromNowTo = (tillDate) => {
  // product of 1.0000650 3 times a day till date
};
