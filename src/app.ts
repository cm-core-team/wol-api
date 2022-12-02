// dev stuff
import * as dotenv from "dotenv";
dotenv.config({ path: "./build/.env" });
import morgan from "morgan";

// express
import express, { Express } from "express";

// importing the router
// When making local imports its important to add the .js extension because node is not smart enough to figure it out by itself
import bibleVerseRouter from "./routes/bibleVerseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { homeController } from "./controllers/homeController.js";

// creating express app
const app: Express = express();

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Pass to next layer of middleware
  next();
});

/**
 * logging software for development
 * logs http method, time it took to make request etc
 */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan(":method :url :status"));
}

/**
 * // This is where we mount the routes
 * Routes which devs using the api are going to be physically interacting with.
 * app.use("/home", homeController);
 */
// app.use("/", homeController);
app.use("/api/v1/", bibleVerseRouter);
app.use("/api/v1/users", userRouter);

// exporting express app so it can be used by other modules
export default app;
