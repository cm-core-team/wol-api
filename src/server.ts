/* eslint-disable no-console */
// ENV
import * as dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });

// Importing the express app to create the server.
import app from "./app";

// DB
import * as mongoose from "mongoose";

// Some error handling
process.on("uncaughtException", (err: Error) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

// The port the server will run on
const PORT: string | undefined = process.env.PORT;

// Connect to mongo db
mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.vmbese9.mongodb.net/?retryWrites=true&w=majority`
    )
    .then((): void => console.log("Database has been connected."));

mongoose.set("strictQuery", true);

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
