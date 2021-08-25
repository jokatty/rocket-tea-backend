module.exports = {
  up: async (queryInterface, Sequelize) => {
    // ====================================================== USERS TABLE
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // ====================================================== STORES TABLE
    await queryInterface.createTable('stores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      login: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      store_name: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // ====================================================== ITEMS TABLE
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      item_name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      item_category: {
        // ideally we would like this datatype to be enum.ENUM(['popular', 'essentials', 'bottled']),
        // error faced: type:enum already exists
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DECIMAL,
      },
      image_id: {
        type: Sequelize.STRING,
      },
      available_in_temp: {
        type: Sequelize.ENUM(['hot', 'iced', 'both']),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // ====================================================== ORDERS TABLE
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      store_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'stores',
          key: 'id',
        },
      },
      pick_up_time: {
        type: Sequelize.STRING,
      },
      // ideally we would like this datatype to be enum.ENUM(['sent', 'accepted', 'complete']),
      // error faced: type:enum already exists
      order_status: {
        type: Sequelize.STRING,
      },
      total_amount: {
        type: Sequelize.DECIMAL,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // ====================================================== ORDER_ITEMS TABLE
    await queryInterface.createTable('order_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'orders',
          key: 'id',
        },
      },
      item_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'items',
          key: 'id',
        },
      },
      size_choice: {
        type: Sequelize.STRING,
      },
      temp_choice: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      item_total: {
        type: Sequelize.DECIMAL,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await Promise.all([
      queryInterface.dropTable('order_items'),
      queryInterface.dropTable('orders'),
    ]);
    await Promise.all([
      queryInterface.dropTable('items'),
      queryInterface.dropTable('users'),
      queryInterface.dropTable('stores'),
    ]);
  },
};
