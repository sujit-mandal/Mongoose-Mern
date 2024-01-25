const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const {userRouter} = require("./routers/userRouter");
const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, //1 minute in milliseconds
  limit: 5,
  message: "Too many requests from this IP. Please try again later",
});

app.use(xssClean());
app.use(rateLimiter);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/test", rateLimiter, (req, res) => {
  res.status(200).send({
    message: "Server testing is working fine",
  });
});

app.use("/api/users", userRouter);

//client error handling
app.use((req, res, next) => {
  next(createError(404, "route not found"));
});

//server error handling
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
