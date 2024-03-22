import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'TimeThrive',
    description: 'TimeThrive documentation',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./api.ts', '../src/router/routes.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
