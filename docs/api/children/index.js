const signUp = require('./signUp');
const login = require('./login');
const info = require('./info');

module.exports = {
  ...signUp,
  ...login,
  ...info,
};