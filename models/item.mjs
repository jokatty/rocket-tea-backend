export default function itemModel(sequelize, DataTypes) {
  return sequelize.define('item', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    itemName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    itemCategory: {
      // ideally we would like this datatype to be enum.ENUM(['popular', 'essentials', 'bottled']),
      // error faced: type:enum already exists
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    imageId: {
      type: DataTypes.STRING,
    },
    availableInTemp: {
      type: DataTypes.STRING(['hot', 'iced', 'both']),
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
