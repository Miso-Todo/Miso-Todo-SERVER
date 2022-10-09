const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Profile extends Model {
  static init(sequelize) {
    return super.init({
      photoUrl: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
    }, {
      modelName: 'Profile',
      tableName: 'profiles',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
      sequelize,
    });
  }
  static associate(db) {
    db.Profile.hasMany(db.Child);
    db.Profile.hasMany(db.Protector);
  }
};