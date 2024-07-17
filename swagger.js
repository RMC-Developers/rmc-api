const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const doc = {
  info: {
    title: 'RMC',
    description: 'API Documentation for RMC APP'
  },
  servers: [
    {
      url: 'https://rmc-api.vercel.app',
      description: 'Production server'
    },
    {
      url: 'http://localhost:8080',
      description: 'Development server'
    }
  ]
};

const outputFile = './swagger-output.json';
const routes = ['./src/server.js'];

const options = {
  customCss: '.swagger-ui .topbar { display: none }'
}



swaggerAutogen(outputFile, routes, doc,options);