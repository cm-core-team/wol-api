import app from "./app.js";

const PORT = 3000;

// creating the server
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
