const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Promise extends Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      day: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      type: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      childSignature: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      guardianSignature: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      taskCompletion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      promiseCompletion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      promisePhotoUrl: {
        type: DataTypes.STRING(2000),
        allowNull: true,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    }, {
      modelName: 'Promise',
      tableName: 'promises',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: true,
      sequelize,
    });
  }
  static associate(db) {
    db.Promise.belongsTo(db.Child);
  }
};