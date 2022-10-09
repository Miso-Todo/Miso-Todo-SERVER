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
      child_signature: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      guardian_signature: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      task_completion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      promise_completion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      promise_photo_url: {
        type: DataTypes.STRING(2000),
        allowNull: true,
      },
      start_date: {
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