const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
require("dotenv").config()
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Afalgugn API",
      version: "1.0.0",
      description: "A well organized backend api for",
    },
    servers: [{ url:process.env.BACKEND_URL}],
  },
  
 apis: [
  path.join(__dirname, "./auth/**/*.js")
]

};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
