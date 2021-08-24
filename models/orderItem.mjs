export default function orderItemModel(sequelize, DataTypes) {
  return sequelize.define('order_item', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'items',
        key: 'id',
      },
    },
    sizeChoice: {
      type: DataTypes.STRING,
    },
    tempChoice: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { underscored: true });
}
