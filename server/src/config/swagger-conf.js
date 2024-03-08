import dotenv from "dotenv";
import swaggerJsDoc from "swagger-jsdoc";

dotenv.config();

const PORT = process.env.PORT || 4000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web-shop",
      version: "0.1.0",
      description: "Fakestore api",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["**/routes/*.js", "src/components/schema/*.yaml"],
};

const specs = swaggerJsDoc(options);

export default specs;
