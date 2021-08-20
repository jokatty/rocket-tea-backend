import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

import itemModel from './item.mjs';
import orderModel from './order.mjs';
import orderItemModel from './orderItem.mjs';
import userModel from './user.mjs';
import storeModel from './store.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Item = itemModel(sequelize, Sequelize.DataTypes);
db.Order = orderModel(sequelize, Sequelize.DataTypes);
db.OrderItem = orderItemModel(sequelize, Sequelize.DataTypes);
db.User = userModel(sequelize, Sequelize.DataTypes);
db.Store = storeModel(sequelize, Sequelize.DataTypes);

// --- M-to-M with through table
db.Store.belongsToMany(db.User, { through: db.Order });
db.User.belongsToMany(db.Store, { through: db.Order });
// Define 1-M associations between orders table and associated tables
db.User.hasMany(db.Order);
db.Order.belongsTo(db.User);
db.Store.hasMany(db.Order);
db.Order.belongsTo(db.Store);

// --- M-to-M with through table
db.Item.belongsToMany(db.Order, { through: db.OrderItem });
db.Order.belongsToMany(db.Item, { through: db.OrderItem });
// Define 1-M associations between orders table and associated tables
db.Item.hasMany(db.OrderItem);
db.OrderItem.belongsTo(db.Item);
db.Order.hasMany(db.OrderItem);
db.OrderItem.belongsTo(db.Order);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
