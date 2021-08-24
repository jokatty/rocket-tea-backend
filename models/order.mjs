export default function orderModel(sequelize, DataTypes) {
  return sequelize.define('order', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    storeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'stores',
        key: 'id',
      },
    },
    pickUpTime: {
      type: DataTypes.STRING,
    },
    // ideally we would like this datatype to be enum.ENUM(['sent', 'accepted', 'complete']),
    // error faced: type:enum already exists
    orderStatus: {
      type: DataTypes.STRING,
    },
    totalAmount: {
      type: DataTypes.DECIMAL,
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
