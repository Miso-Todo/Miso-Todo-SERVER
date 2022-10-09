const express = require('express');
const router = express.Router();

const childController = require('../controllers/childController');

router.post('/signUp', childController.signUp);

module.exports = {
  router,
}