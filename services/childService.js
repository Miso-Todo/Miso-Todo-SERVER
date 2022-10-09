const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')

const { Child } = require('../models')
const { isLoggedIn, isNotLoggedIn } = require('../middleware');

const validatePassword = (password) => {
  const passwordRegex = /(?=.*\d)(?=.*[a-z]).{8,}/
  if(!passwordRegex.test(password)) {
    const error = new Error('INVALID_PASSWORD')
    error.statusCode = 400
    throw error
  }
}

const hashedPassword = async(plainPassword) =>{
    const saltRounds = 10
    const saltingPassword = await bcrypt.genSalt(saltRounds);
    
    return await bcrypt.hash(plainPassword, saltingPassword); 
}

const signUp = async (req, res, next) => {
  const { userId, password, name, kakaoId } = req.body;
  try {
    const exChildId = await Child.findOne({
      where: {
        userId: userId,
      }
    });
    if (exChildId) {
      return res.status(403).json({'message' : 'ERROR_ACCOUNT_ALREADY_EXIST'});
    }

    const exChildKakaoId = await Child.findOne({
      where: {
        kakaoId: kakaoId,
      }
    });
    if (exChildKakaoId) {
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
      password: password,
      name: name,
      uniqueNumber: UniqueNumber,
      kakaoId: kakaoId,
      ModifierId: 1,
      ProfileId:1
    });
    res.status(201).json({'message' : 'SUCCESS'});
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports ={
  signUp,
}