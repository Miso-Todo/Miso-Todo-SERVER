const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Family extends Model {
  static init(sequelize) {
    return super.init({
      relationship: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    }, {
      modelName: 'Family',
      tableName: 'family',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
      sequelize,
    });
  }
  static associate(db) {}
};