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
              }
            },
            required: ['dish_name', 'dish_ingredient'],

          },
          Order_Add: {
            type: 'object',
            properties: {
              dish_id: {
                type: 'string',
              },
              order_description: {
                type: 'string',
              },
              customer_id: {
                type: 'string',
              },
            },
            required: ['dish_id', 'customer_id', 'order_description'],
          },
          Order_Update :{
            
            type: 'object',
            properties: {
              
              order_description: {
                type: 'string',
              },
              
            },
            required: [ 'order_description'],

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
          required: [
            'cook_name',
            'cook_info',
            'cook_phone',
            'cook_address',
            'cook_id',
          ],
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
      },
    },
  },
  apis: [path.resolve(__dirname, '../routes/*.js')], // Path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
