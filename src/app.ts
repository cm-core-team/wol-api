import * as dotenv from "dotenv";
dotenv.config();

import morgan from "morgan";
import express from "express";

// importing the router
// When making local imports its important to add the .js extension because node is not smart enough to figure it out by itself
import bibleVerseRouter from "./routes/bibleVerseRoutes.js";

// creating express app
const app = express();

// logging software for development
// logs http method, time it took to make request etc
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// This is where we mount the routes
app.use("/api/v1/", bibleVerseRouter);

// leave this for later
// async function getVerse(): Promise<any> {
//   try {
//     const url: string = "https://wol.jw.org/en/wol/dx/r1/lp-e/1001070105/2";
//     const html = await fetch(url).then((data) => data.text());
//     console.log(html);
//   } catch (err) {
//     console.error(err);
//   }
// }

// exporting express app so it can be used by other modules
export default app;
