const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const AppError = require("./utils/AppError");

const app = express();

// SET SECURITY HTTP HEADER
app.use(helmet());

// Data sanitization against noSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameters pollution
app.use(
  hpp({
    whitelist: [],
  }),
);

// RATE LIMIT
const limiter = rateLimit({
  max: process.env.MAX_RATE_LIMIT,
  windowMs: process.env.MAX_RATE_LIMIT_TIME * 60 * 1000, // unit: minutes
  message: `Too many requests from this IP, please try again after ${process.env.MAX_RATE_LIMIT_TIME} minutes !`,
});

app.use("/api", limiter);

// set environment
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
);

// Handle when no match any routes
app.all("*", (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404)),
);

module.exports = app;
