const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swagger = require('../handler/swagger');
const children = require('../docs/api/children/index');

class ApiDocs {
  #apiDocOption;
  #swagger;

  constructor() {
    this.#apiDocOption = {
      ...children,
    };

    this.#swagger = new swagger();
  };

  init() {
    this.#swagger.addAPI(this.#apiDocOption);
  };

  getSwaggerOption() {
    const { apiOption, setUpOption } = this.#swagger.getOption();

    const specs = swaggerJsDoc(apiOption);

    return {
      swaggerUI,
      specs,
      setUpOption,
    };
  };
};

module.exports = ApiDocs;