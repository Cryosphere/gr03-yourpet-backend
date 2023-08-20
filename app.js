const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const authRouter = require("./routes/api/auth");
const newsRouter = require("./routes/api/news");
const noticesRouter = require("./routes/api/notices");
const sponsorsRouter = require("./routes/api/sponsors");
const userRouter = require("./routes/api/user");
const swaggerDocument = require("./swagger.json");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRouter);
app.use("/api/news", newsRouter);
app.use("/api/notices", noticesRouter);
app.use("/api/sponsors", sponsorsRouter);
app.use("/api/user", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
  console.log("s;lkdfjslkdfj");
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
