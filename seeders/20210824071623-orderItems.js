module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('order_items', [
    // =========================================== ON-GOING ORDERS
    // =============== Order 1
    {
      order_id: 1,
      item_id: 2,
      size_choice: 'regular',
      temp_choice: 'hot',
      quantity: 2,
      item_total: 8,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      order_id: 1,
      item_id: 4,
      size_choice: 'regular',
      temp_choice: 'cold',
      quantity: 1,
      item_total: 4,
      created_at: new Date(),
      updated_at: new Date(),
    },

    // =============== Order 2
    {
      order_id: 2,
      item_id: 2,
      size_choice: 'regular',
      temp_choice: 'hot',
      quantity: 1,
      item_total: 4,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      order_id: 2,
      item_id: 4,
      size_choice: 'regular',
      temp_choice: 'cold',
      quantity: 1,
      item_total: 4,
      created_at: new Date(),
      updated_at: new Date(),
    },

    // ============================================= PAST ORDERS
    // =============== Order 3
    {
      order_id: 3,
      item_id: 1,
      size_choice: 'regular',
      temp_choice: 'hot',
      quantity: 1,
      item_total: 4.5,
      created_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 4),
      updated_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 4),
    },
    {
      order_id: 3,
      item_id: 2,
      size_choice: 'regular',
      temp_choice: 'cold',
      quantity: 1,
      item_total: 4,
      created_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 4),
      updated_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 4),
    },

    // =============== Order 4
    {
      order_id: 4,
      item_id: 3,
      size_choice: 'regular',
      temp_choice: 'hot',
      quantity: 1,
      item_total: 4,
      created_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 6),
      updated_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 6),
    },
    {
      order_id: 4,
      item_id: 3,
      size_choice: 'regular',
      temp_choice: 'cold',
      quantity: 1,
      item_total: 4,
      created_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 6),
      updated_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 6),
    },

    // =============== Order 5
    {
      order_id: 5,
      item_id: 11,
      size_choice: 'regular',
      temp_choice: 'cold',
      quantity: 1,
      item_total: 6,
      created_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 7),
      updated_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 7),
    },
    {
      order_id: 5,
      item_id: 10,
      size_choice: 'regular',
      temp_choice: 'cold',
      quantity: 4,
      item_total: 6,
      created_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 7),
      updated_at: new Date(Date.now() - ((3600 * 1000 * 24)) * 7),
    },
  ], {}),

  down: async (queryInterface) => {
    console.log('deleting seed data from orderItems ==============>');
    await queryInterface.bulkDelete('order_items', null, {});
  },
};
