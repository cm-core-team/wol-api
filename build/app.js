import * as dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });
import morgan from "morgan";
import express from "express";
import bibleVerseRouter from "./routes/bibleVerseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { homeController } from "./controllers/homeController.js";
const app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
});
process.env.NODE_ENV === "development"
    ? app.use(morgan("dev"))
    : app.use(morgan(":method :url :status"));
app.use("/api/v1/bibleVerses", bibleVerseRouter);
app.use("/api/v1/users", userRouter);
app.use("/", homeController);
export default app;
