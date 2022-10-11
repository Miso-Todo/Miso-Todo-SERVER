const express = require('express');
const router = express.Router();

const childRouter = require('../routers/childRouter');
const ApiDocs = require('../docs/index');

function getSwaggerOption() {
  const apiDocs = new ApiDocs();
  apiDocs.init();

  return apiDocs.getSwaggerOption();
}

module.exports = (app) => {
  const { swaggerUI, specs, setUpOption } = getSwaggerOption();

  app.use('/children', childRouter.router);
  app.use('/oauth', childRouter.router);
  app.use('/api', swaggerUI.serve, swaggerUI.setup(specs, setUpOption));
};