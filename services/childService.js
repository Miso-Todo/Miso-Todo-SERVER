const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport');

const { Child } = require('../models')
const secretKey = require('../config/secretKey').secretKey;
const options = require('../config/secretKey').options;

const signUp = async (req, res, next) => {
  const { userId, password, name, kakaoId } = req.body;
  try {
    const duplicateId = await Child.findOne({
      where: {
        userId: userId,
      }
    });
    if (duplicateId) {
      return res.status(403).json({'message' : 'ERROR_ACCOUNT_ALREADY_EXIST'});
    }

    const duplicateKakaoId = await Child.findOne({
      where: {
        kakaoId: kakaoId,
      }
    });
    if (duplicateKakaoId) {
      return res.status(403).json({'message' : 'ERROR_KAKAOID_ALREADY_EXIST'});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    let UniqueNumber;
    while(true){
      const randomNumber = Math.floor(new Date().getTime() * Math.random() / 100000)
      const randomNumberLength = String(randomNumber).length;
      if(randomNumberLength === 6){
        UniqueNumber = randomNumber;
        const exUniqueNumber = Child.findOne({
          where: {
            uniqueNumber: UniqueNumber,
          }
        });
        if(!exUniqueNumber){
          UniqueNumber = randomNumber;
        }
        break;
      };
    };
    await Child.create({
      userId: userId,
      password: hashedPassword,
      name: name,
      uniqueNumber: UniqueNumber,
      kakaoId: kakaoId,
      ModifierId: 1,
      ProfileId:1
    });
    res.status(201).json({'message' : 'SUCCESS_SIGN_UP'});
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const login = async (req, res) => {
  try {
    passport.authenticate('local', (passportError, user, info) => {
      if (passportError || !user) {
      res.status(400).json({ message: info });
      return;
    }
    req.login(user, { session: false }, (loginError) => {
      if (loginError) {
        res.send(loginError);
        return;
      }
    const payload = {
      id: user.userId,
      name: user.name,
      auth: user.uniqueNumber
    };
		const token = jwt.sign(payload, secretKey, options);
    res.json({ message:'SUCCESS_LOGIN', token });
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  signUp,
  login
}