const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

const { Child } = require('../models')

const passportConfig = { usernameField: 'userId', passwordField: 'password' };

const passportVerify = async (userId, password, done) => {
  try {
    const child = await Child.findOne({ where: { userId: userId } });
    if (!child) {
      done(null, false, 'INVALID_ACCOUNT');
      return;
    }

    const compareResult = await bcrypt.compare(password, child.password);
    
    if (compareResult) {
      done(null, child);
      return;
    }
    done(null, false, 'INVALID_PASSWORD');
  } catch (error) {
    console.error(error);
    done(error);
  }
};

module.exports = () => {
  passport.use('local', new LocalStrategy(passportConfig, passportVerify));
};