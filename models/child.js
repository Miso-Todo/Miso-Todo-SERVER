const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Child extends Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      uniqueNumber: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
      },
      kakaoId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: true,
      },
    }, {
      modelName: 'Child',
      tableName: 'children',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true,
      sequelize,
    });
  }
  static associate(db) {
    db.Child.hasMany(db.Task);
    db.Child.hasMany(db.Promise);
    db.Child.belongsTo(db.Modifier);
    db.Child.belongsTo(db.Profile);
    db.Child.belongsToMany(db.Protector, { through: 'Family' });
  }
};