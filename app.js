const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const usersRouter = require("./routes/usersRoutes/users");
const transactionsRouter = require("./routes/api/transactions");


app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());


// routers

app.use("/users", usersRouter);
app.use("/api/transactions", transactionsRouter)



app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
