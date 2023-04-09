import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

const swaggerJsdoc = require("swagger-jsdoc");
var cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3100",
    methods: "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(routes);

const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);

routes.use("/api-docs", swaggerUi.serve);

routes.get("/api-docs", swaggerUi.setup(openapiSpecification));

app.get("/", async (req, res) => {
  res.send("Welcome to Orchard API!");
});

export default app;
