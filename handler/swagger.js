const swaggerOpenApiVersion = '3.0.0';
const dotenv = require('dotenv');

dotenv.config();

const swaggerInfo = {
  title: '미소의 할일',
  version: '1.0.0',
  description: '아이의 할 일을 보호자와 함께 확인하여 꾸준함과 성실함 증진에 목적을 두는 서비스',
};

const swaggerTags = [
  {
    name: 'Children',
    description: '아이 API',
  },
];

const swaggerSchemes = ['http', 'https'];

const swaggerSecurityDefinitions = {
  ApiKeyAuth: {
    type: 'apiKey',
    name: 'Authorization',
    in: 'header',
  },
};

const swaggerProduces = ['application/json'];

const swaggerLicense = {
  name: process.env.LICENSE_NAME,
  url: process.env.API_SPECIFICATIONS
};

const swaggerContact = {
  name: process.env.DEVELOPER_NAME,
  url: process.env.DEVELOPER_GITHUB,
  email: process.env.DEVELOPER_EMAIL,
};

const swaggerServers = [
  {
    url: process.env.DOMAIN,
  },
];

const swaggerSecurityScheme = {
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'Token',
    name: 'Authorization',
    description: '인증 토큰 값을 넣어주세요.',
    in: 'header',
  },
};

const swaggerComponents = {
  JWT_ERROR: {
    description: 'jwt token Error',
    type: 'object',
    properties: {
      401: {
        type: 'Error token 변조 에러',
      },
    },
  },
  SERVER_ERROR: {
    description: 'SERVER ERROR',
    type: 'object',
    properties: {
      500: {
        type: 'Internal Error',
        code: 800,
      },
    },
  },
  DB_ERROR: {
    description: 'SERVER DB ERROR',
    type: 'object',
    properties: {
      500: {
        type: 'DB ERROR',
        code: 500,
      },
    },
  },
};

class swagger {
  static #uniqueSwaggerInstance;
  #paths = [{}];
  #option = {};
  #setUpOption = {};

  /**
   *
   * @returns {swagger}
   */
  constructor() {
    if (!swagger.#uniqueSwaggerInstance) {
      this.#init();
      swagger.#uniqueSwaggerInstance = this;
    }

    return swagger.#uniqueSwaggerInstance;
  }

  #init() {
    this.#option = {
      definition: {
        openapi: swaggerOpenApiVersion,
        info: swaggerInfo,
        servers: swaggerServers,
        license: swaggerLicense,
        schemes: swaggerSchemes,
        contact: swaggerContact,
        securityDefinitions: swaggerSecurityDefinitions,
        produces: swaggerProduces,
        components: {
          securitySchemes: swaggerSecurityScheme,
          schemas: swaggerComponents,
        },
        tags: swaggerTags,
      },
      apis: [],
    };
    this.#setUpOption = {
      explorer: true,
    };
  }

  addAPI(api) {
    this.#paths.push(api);
  }

  #processAPI() {
    const path = {};

    for (let i = 0; i < this.#paths.length; i += 1) {
      for (const [key, value] of Object.entries(this.#paths[i])) {
        path[key] = value;
      }
    }

    return path;
  }

  getOption() {
    const path = this.#processAPI();
    this.#option.definition.paths = path;

    return {
      apiOption: this.#option,
      setUpOption: this.#setUpOption,
    };
  }
}

module.exports = swagger;