// const short = require('short-uuid');

// const translator = short();
module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('orders', [
    // =========================================== ON-GOING ORDERS
    // =============== Order 1
    {
      user_id: 1,
      store_id: 2,
      pick_up_time: '14:00',
      order_status: 'sent',
      total_amount: 12,
      receipt_num: Math.floor(100000 + Math.random() * 900000),
      created_at: new Date(),
      updated_at: new Date(),
    },
    // =============== Order 2
    {
      user_id: 1,
      store_id: 2,
      pick_up_time: '11:30',
      order_status: 'accepted',
      total_amount: 8,
      receipt_num: Math.floor(100000 + Math.random() * 900000),
      created_at: new Date(),
      updated_at: new Date(),
    },
    // =============== Order 3
    {
      user_id: 1,
      store_id: 1,
      pick_up_time: '14:00',
      order_status: 'sent',
      total_amount: 8,
      receipt_num: Math.floor(100000 + Math.random() * 900000),
      created_at: new Date(),
      updated_at: new Date(),
    },
    // =============== Order 4
    {
      user_id: 1,
      store_id: 1,
      pick_up_time: '11:30',
      order_status: 'sent',
      total_amount: 8,
      receipt_num: Math.floor(100000 + Math.random() * 900000),
      created_at: new Date(),
      updated_at: new Date(),
    },

    // ============================================= PAST ORDERS
    // =============== Order 5
    {
      user_id: 1,
      store_id: 4,
      pick_up_time: '10:30',
      order_status: 'complete',
      total_amount: 8.5,
      receipt_num: Math.floor(100000 + Math.random() * 900000),
      created_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 4),
      updated_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 4),
    },
    // =============== Order 6
    {
      user_id: 1,
      store_id: 4,
      pick_up_time: '12:30',
      order_status: 'complete',
      total_amount: 8,
      receipt_num: Math.floor(100000 + Math.random() * 900000),
      created_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 6),
      updated_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 6),
    },
    // =============== Order 7
    {
      user_id: 1,
      store_id: 3,
      pick_up_time: '12:30',
      order_status: 'complete',
      total_amount: 12,
      receipt_num: Math.floor(100000 + Math.random() * 900000),
      created_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 7),
      updated_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 7),
    },
  ], {}),

  down: async (queryInterface) => {
    console.log('deleting seed data from orders ==============>');
    await queryInterface.bulkDelete('orders', null, {});
  },
};
