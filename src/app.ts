import express from "express";
import fetch from "node-fetch";

const app = express();

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

export default app;
