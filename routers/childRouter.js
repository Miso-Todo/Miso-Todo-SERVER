const express = require('express');
const passport = require('passport');
const router = express.Router();

const { validateToken } = require('../middleware/auth.js');
const errorHandler = require('../middleware/errorHandler');
const childController = require('../controllers/childController');
const Swagger = require('../handler/swagger');
const swagger = new Swagger();

router.post('/signup', errorHandler(childController.signUp));

router.post('/login', errorHandler(childController.login));

router.get('/info', validateToken, errorHandler(childController.getInfo));

router.patch('/info/update', validateToken, errorHandler(childController.updateInfo));

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', errorHandler(childController.kakaoLogin));

module.exports = {
  router,
};

