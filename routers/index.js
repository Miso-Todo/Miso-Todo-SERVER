const express = require('express')
const router = express.Router();

const childRouter = require('./childRouter');

router.use('/children', childRouter.router);

router.use('/oauth', childRouter.router);

module.exports = router;