const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Task extends Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      child_completion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      guardian_completion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    }, {
      modelName: 'Task',
      tableName: 'tasks',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: false,
      sequelize,
    });
  }
  static associate(db) {
    db.Task.belongsTo(db.Child);
  }
};