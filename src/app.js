const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ApiError = require("./utils/ApiError");
const app = express();
const router = require("./router");
const loggerMiddleware = require("./middleware/loggerMiddleware");
const swaggerUi = require("swagger-ui-express");
const mongoSanitize = require("express-mongo-sanitize");
const swaggerFile = require("../swagger_output.json"); // Generated Swagger file
const handleInvalidRoute = require("./middleware/invalidRoute");

// Middlewares
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(loggerMiddleware);
app.use(handleInvalidRoute);

// Apply mongoSanitize middleware
app.use(mongoSanitize());
app.use(
  mongoSanitize({
    replaceWith: "",
  })
);

// router index
app.use("/", router);
// api doc
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
  res.send("Boilerplate-BE");
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});

module.exports = app;
