const Sequelize = require('sequelize');
const child = require('./child');
const family = require('./family');
const modifier = require('./modifier');
const profile = require('./profile');
const promise = require('./promise');
const protector = require('./protector');
const task = require('./task');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Child = child;
db.Family = family;
db.Modifier = modifier;
db.Profile = profile;
db.Promise = promise;
db.Protector = protector;
db.Task = task;

Object.keys(db).forEach(modelName => {
  db[modelName].init(sequelize);
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;