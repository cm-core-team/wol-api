// Development tools.
import * as dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });
import morgan from "morgan";

import express, { Express, Request, Response, NextFunction } from "express";

// Importing the routes.
import bibleVerseRouter from "./routes/bibleVerseRoutes";
import userRouter from "./routes/userRoutes";
import { homeController } from "./controllers/homeController";

// Express app.
const app: Express = express();

// Let express parse the request body.
app.use(express.json());

// Add headers
app.use(function (req: Request, res: Response, next: NextFunction) {
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

// Logging for development/production.
process.env.NODE_ENV === "development"
    ? app.use(morgan("dev"))
    : app.use(morgan(":method :url :status"));

// Routes for the API.
app.use("/api/v1/bibleVerses", bibleVerseRouter);
app.use("/api/v1/users", userRouter);
app.use("/", homeController);

// Exporting express app so it can be used by other modules.
export default app;
