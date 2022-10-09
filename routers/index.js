const express = require('express')
const router = express.Router();

const childRouter = require('./childRouter');

router.use('/children', childRouter.router);

module.exports = router;