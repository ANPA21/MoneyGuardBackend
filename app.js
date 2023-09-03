const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const { usersRouter, transactionsRouter } = require("./routes");
const { error } = require("console");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", usersRouter);
app.use("/transactions", transactionsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
