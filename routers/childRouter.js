const express = require('express');
const passport = require('passport');
const router = express.Router();

const errorHandler = require('../middleware/errorHandler');
const childController = require('../controllers/childController');
const Swagger = require('../handler/swagger');
const swagger = new Swagger();

router.post('/signup', errorHandler(childController.signUp));

router.post('/login', errorHandler(childController.login));

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', errorHandler(childController.kakaoLogin));

module.exports = {
  router,
};