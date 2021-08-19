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
        type: DataTypes.ENUM(['popular', 'seasonal', 'bottled']),
      },
      price: {
        type: DataTypes.INTEGER,
      },
      imageId: {
        type: DataTypes.STRING,
      },
      availableInTemp: {
        type: DataTypes.ENUM(['hot', 'iced', 'both']),
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
