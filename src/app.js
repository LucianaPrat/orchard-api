import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

const swaggerJsdoc = require('swagger-jsdoc');

app.use(express.json());
app.use(cors());
app.use(routes);
 
const swaggerUi = require('swagger-ui-express');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'], 
};

const openapiSpecification = swaggerJsdoc(options);

 
 
routes.use('/api-docs', swaggerUi.serve);
 
routes.get('/api-docs', swaggerUi.setup(openapiSpecification));

app.get('/', async (req, res) => {
  res.send('Welcome to Orchard API!');
});

export default app;
