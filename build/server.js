import * as dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });
import app from "./app.js";
import * as mongoose from "mongoose";
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});
const PORT = process.env.PORT;
mongoose.set("strictQuery", true);
mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.vmbese9.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log("Database has been connected."));
const server = app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
