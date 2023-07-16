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
              type: 'string',
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
            },
          },
          required: ['dish_name', 'dish_ingredient'],
        },
        Customer: {
          type: 'object',
          properties: {
            customer_email: {
              type: 'string',
            },
            customer_name: {
              type: 'string',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
            customer_address: {
              type: 'string',
            },
            birthdate: {
              type: 'string',
              format: 'date',
            },
            provider: {
              type: 'string',
            },
            provider_id: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
          required: ['customer_email', 'customer_name', 'customer_address', 'birthdate', 'password'],
        },
      },
    },
  },
  apis: [path.resolve(__dirname, '../routes/*.js')], // Path to route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
