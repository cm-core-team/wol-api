import express from "express";
import fetch from "node-fetch";

// importing the router
import exampleRouter from "./routes/exampleRoute";

// creating express app
const app = express();

app.use("api/v1", exampleRouter);

// testing
async function getVerse(): Promise<any> {
  try {
    const url: string = "https://wol.jw.org/en/wol/dx/r1/lp-e/1001070105/2";
    const html = await fetch(url).then((data) => data.text());
    console.log(html);
  } catch (err) {
    console.error(err);
  }
}

await getVerse();

// exporting express app so it can be used by other modules
export default app;
