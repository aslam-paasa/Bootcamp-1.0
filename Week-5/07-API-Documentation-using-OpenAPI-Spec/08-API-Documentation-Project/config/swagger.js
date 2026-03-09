const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Swagger Configuration:
 *
 * swaggerDefinition:
 * - openapi  : version of OpenAPI spec we are using (3.0.0)
 * - info     : basic info about your API (title, version, description)
 * - servers  : base URL of your API
 *
 * components → schemas:
 * - Reusable data models referenced across multiple routes.
 * - Defined once here and referenced using $ref anywhere.
 * - $ref: '#/components/schemas/Product' means:
 *   "use the Product schema defined below"
 *
 * apis:
 * - Array of file paths where swagger-jsdoc will look for @swagger comments.
 * - './routes/**\/*.js' means look in ALL files inside routes folder.
 */
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Shop API',
            version: '1.0.0',
            description: 'API documentation for Admin and Customer routes'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development Server'
            }
        ],
        components: {
            schemas: {
                /**
                 * Product Schema:
                 * - Describes the shape of a Product object.
                 * - Used in request body (create/update) and response.
                 */
                Product: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            example: 'iPhone 15'
                        },
                        price: {
                            type: 'number',
                            example: 999
                        },
                        category: {
                            type: 'string',
                            example: 'electronics'
                        },
                        rating: {
                            type: 'number',
                            example: 4.8
                        },
                        stock: {
                            type: 'number',
                            example: 10
                        }
                    }
                },
                /**
                 * Order Schema:
                 * - Describes the shape of an Order object.
                 */
                Order: {
                    type: 'object',
                    properties: {
                        customerName: {
                            type: 'string',
                            example: 'Mohammad'
                        },
                        product: {
                            type: 'string',
                            example: '64abc123def456...',
                            description: 'MongoDB Product ID'
                        },
                        quantity: {
                            type: 'number',
                            example: 2
                        },
                        status: {
                            type: 'string',
                            example: 'pending',
                            enum: ['pending', 'shipped', 'delivered', 'cancelled']
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/**/*.js'] // scan all route files for @swagger comments
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };