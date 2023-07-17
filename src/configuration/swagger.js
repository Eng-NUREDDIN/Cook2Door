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
        Cook_Get_By_ID: {
          type: 'object',
          properties: {
            cook_id: {
              type: 'string',
            },
          },
          required: ['cook_id'],
        },
        Cook_Add: {
          type: 'object',
          properties: {
            cook_name: {
              type: 'string',
            },
            cook_info: {
              type: 'string',
            },
            cook_address: {
              type: 'string',
            },
            cook_phone: {
              type: 'string',
            },
            cook_id: {
              type: 'string',
            },
          },
          required: ['cook_name', 'cook_info', 'cook_phone', 'cook_address'],
        },
        Cook_Update: {
          type: 'object',
          properties: {
            cook_name: {
              type: 'string',
            },
            cook_info: {
              type: 'string',
            },
            cook_address: {
              type: 'string',
            },
            cook_phone: {
              type: 'string',
            },
            cook_id: {
              type: 'string',
            },
          },
          required: ['cook_name', 'cook_info', 'cook_phone', 'cook_address', 'cook_id'],
        },
        Cook_Delete: {
          type: 'object',
          properties: {
            cook_id: {
              type: 'string',
            },
          },
          required: ['cook_id'],
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
            customer_address: {
              type: 'string',
            },
            birthdate: {
              type: 'string',
              format: 'date',
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
