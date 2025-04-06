// api-gateway/src/utils/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const YAML = require('yamljs');

const options = {
  definition: YAML.load('./swagger.yaml'),
  apis: [],
};

module.exports = swaggerJSDoc(options);