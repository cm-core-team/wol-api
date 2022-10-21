import { Request, Response } from "express";
import fetch from "node-fetch";
import { parse } from "node-html-parser";

async function getVerse(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    const html = await fetch(
      `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.bookNumber}/1#study=discover&v=${req.params.bookNumber}:${req.params.chapter}:${req.params.verse}`
    )
      .then((data) => data.text())
      .then((data) => parse(data));
    console.log(html);

    res.json({ data: `${html}` });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

function test(req: Request, res: Response, next: Function) {
  res.json({ endpoint: "hit" });
  console.log("Endpoint hit");
}

// exporting all the handler functions
export { getVerse, test };
