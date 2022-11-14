import * as dotenv from "dotenv";
dotenv.config();

import morgan from "morgan";

import express from "express";

// importing the router
// When making local imports its important to add the .js extension because node is not smart enough to figure it out by itself
import bibleVerseRouter from "./routes/bibleVerseRoutes.js";
import { homeController } from "./controllers/homeController.js";
import process from "process";

// creating express app
const app = express();

// set secuirty headers

// app.use((req: Request, res: Response, next: Function) => {
//   // Middleware
//   // Ensure that the recipient is allowed to access the page
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );

//   next();
// });

// logging software for development
// logs http method, time it took to make request etc
console.log("The node environment is... ", process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// This is where we mount the routes

// Routes which devs using the api are going to be physically interacting with.
// app.use("/home", homeController);

app.use("/api/v1/", bibleVerseRouter);

// exporting express app so it can be used by other modules
export default app;
