export default function storeModel(sequelize, DataTypes) {
  return sequelize.define('store', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    storeName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
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
