const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Cook2Door',
        version: '1.0.0',
        description: 'API documentation for Cook2Door Project',
      },
      components: {
        schemas: {
          Dish_Add: {
            type: 'object',
            properties: {
              dish_name: {
                type: 'string',
              },
              dish_ingredient: {
                type: 'string',
              },
              cook_id: {
                type: 'integer',
              },
            },
            required: ['dish_name', 'dish_ingredient', 'cook_id'],
          },
          Dish_Update: {
            type: 'object',
            properties: {
              dish_name: {
                type: 'string',
              },
              dish_ingredient: {
                type: 'string',
              }
            },
            required: ['dish_name', 'dish_ingredient'],
          },
        },
      },
    },
    apis: [path.resolve(__dirname, '../routes/*.js')], // Path to your route files
  };
  
  const specs = swaggerJsdoc(options);

  module.exports = specs;