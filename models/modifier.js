const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Modifier extends Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    }, {
      modelName: 'Modifier',
      tableName: 'modifiers',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: false,
      sequelize,
    });
  }
  static associate(db) {
    db.Modifier.hasMany(db.Child);
    db.Modifier.hasMany(db.Protector);
  }
};