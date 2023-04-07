/* eslint-disable no-console */
// ENV
import * as dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });

// Importing the express app to create the server.
import app from "./app.js";
import getAllLocales from "./utils/getAllLocales.js";

// Some error handling
process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const PORT: string | undefined = process.env.PORT;

// Starting the server
const server = app.listen(PORT, (): void => {
  console.log("Server running on http://localhost:" + PORT);
});

// More error handling
process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close((): void => {
    process.exit(1);
  });
});
