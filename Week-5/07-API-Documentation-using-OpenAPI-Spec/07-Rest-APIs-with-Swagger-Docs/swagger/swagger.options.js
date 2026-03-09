const swaggerConfig = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "YT Node js APIs",
            description: "This is method 2 to generate API Documentation",
            version: "1.0.0"
        },
        servers: [
            {
                url: "https://postman-echo.com"
            }
        ]
    },
    apis: [
        "./routes/*.js",
        "./controllers/*.js"
    ]
};

const swaggerAPIOptions = swaggerConfig(options);
module.exports = swaggerAPIOptions;