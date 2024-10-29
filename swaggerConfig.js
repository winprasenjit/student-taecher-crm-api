const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Your API', // Title (required)
      version: '1.0.0', // Version (required)
    },
    servers: [
      {
        url: 'http://localhost:5000', // Replace with your server URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes folder
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};

// http://localhost:5000/api-docs/