export default {
  base_stake_rate: 1.000065,
  bonds: {
    'OHM-20221103': {
      token_name: 'OHM-20221103',
      display_name: 'Ohm Bonds',
      total_num_holders: 6,
      total_supply: 1625,
      expiry_timestamp: new Date(2022, 10, 3) / 1000,
      last_refresh: Date.now() / 1000 - 60 * 3,
      best_price: 1.45,
      currency: 'OHM',
      live_markets: [
        {
          exchange: {
            name: 'Bond protocol',
          },
          price: 0.9748723,
          currency: 'OHM',
          buy_link: '#',
          discount: -3.34839, // in percentage
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
          end_timestamp: Date.now() / 1000,
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
      expiry_timestamp: new Date(2022, 10, 4) / 1000,
      last_refresh: Date.now() - 1000,
      best_price: 0.9512029,
      currency: 'OHM',
    },
    'OHM-20221112': {
      token_name: 'OHM-20221112',
      display_name: 'Ohm Bonds',
      total_num_holders: 6,
      total_supply: 1625,
      expiry_timestamp: new Date(2022, 10, 12) / 1000,
      last_refresh: Date.now() - 1000,
      best_price: 0.539024,
      currency: 'OHM',
    },
    'OHM-20221120': {
      token_name: 'OHM-20221120',
      display_name: 'Ohm Bonds',
      total_num_holders: 6,
      total_supply: 1625,
      expiry_timestamp: new Date(2022, 10, 20) / 1000,
      last_refresh: Date.now() - 1000,
      best_price: 0.65,
      currency: 'OHM',
    },
  },
};
