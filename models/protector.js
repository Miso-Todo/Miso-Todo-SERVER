const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Protector extends Model {
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
      checker: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      kakaoId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: true,
      },
    }, {
      modelName: 'Protector',
      tableName: 'protectors',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true,
      sequelize,
    });
  }
  static associate(db) {
    db.Protector.belongsTo(db.Modifier);
    db.Protector.belongsTo(db.Profile);
    db.Protector.belongsToMany(db.Child, { through: 'Family' });
  }
};