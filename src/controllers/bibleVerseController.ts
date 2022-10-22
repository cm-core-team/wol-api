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

    const verseNumber = parseInt(req.params.verse);
    const idString = `p${verseNumber + 1}`;

    const verse = html
      .getElementsByTagName("p")
      .filter(
        (val) => val.id === idString && val.rawAttrs.includes(`class="sb"`)
      )
      // Map returns an array
      .map((val) => {
        const outputStr = val.text.replace(/[^a-zA-Z-.\s]/g, "").trim();
        return outputStr;
      });

    res.json({ data: `${verse[0]}` });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

// exporting all the handler functions
export { getVerse };
