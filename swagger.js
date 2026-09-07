const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node JS Project API",
            version: "1.0.0",
            description: "Interactive API documentation for my Node.js application",
            contact: {
                name: "Developer Support",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development Server",
            },
        ],
    },

    apis: ["./routes/*.js", "./app.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = (app) => {
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocs)
    );
};
