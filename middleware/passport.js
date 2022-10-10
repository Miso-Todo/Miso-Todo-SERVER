const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: KakaoStrategy } = require('passport-kakao');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const { Child } = require('../models')

dotenv.config();

const passportConfig = { usernameField: 'userId', passwordField: 'password' };

const passportVerify = async (userId, password, done) => {
  try {
    const child = await Child.findOne({ where: { userId: userId } });
    if (!child) {
      console.log(child)
      done(null, false, 'INVALID_ACCOUNT');
      return;
    };

    const compareResult = await bcrypt.compare(password, child.password);
    
    if (compareResult) {
      done(null, child);
      return;
    };
    done(null, false, 'INVALID_PASSWORD');
  } catch (error) {
    console.error(error);
    done(error);
  }
};

const passportKakaoConfig = {
  clientID: process.env.KAKAO_CLIENT_ID,
  clientSecret: process.env.KAKAO_CLIENT_SECRET,
  callbackURL: process.env.KAKAO_REDIRECT_URI
};

const passportKakaoVerify = async (accessToken, refreshToken, profile, done) => {
  const kakaoId = profile.id;
  try {
    const exChild = await Child.findOne({
      where: { kakaoId: profile.id },
    });
    if (!exChild) {
      done(null, false, { kakaoId });
    };
    if (exChild) {
      done(null, exChild);
    };
  } catch(error) {
    console.error(error);
    done(error);
  };
};

module.exports = () => {
  passport.use('local', new LocalStrategy(passportConfig, passportVerify));
  passport.use('kakao', new KakaoStrategy(passportKakaoConfig,passportKakaoVerify));
};