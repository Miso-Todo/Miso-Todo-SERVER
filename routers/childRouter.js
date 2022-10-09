const express = require('express');
const router = express.Router();

const errorHandler = require('../middleware/errorHandler');
const childController = require('../controllers/childController');

router.post('/signup', errorHandler(childController.signUp));

router.post('/login', errorHandler(childController.login));

module.exports = {
  router,
}