import app from "./app.js";

import * as dotenv from "dotenv";
dotenv.config();

// creating the server
app.listen(process.env.PORT, () => {
  console.log("Server running on http://localhost:" + process.env.PORT);
});
