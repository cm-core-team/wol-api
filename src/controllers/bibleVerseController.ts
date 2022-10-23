import request from 'request';
import { parse } from "node-html-parser";
import { Request, Response } from "express";

async function getVerse(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    request(
      `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.bookNumber}/1#study=discover&v=${req.params.bookNumber}:${req.params.chapter}:${req.params.verse}`,
      (err: Error, response: any, body: string) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Server-side error, aborted request." });
          return;
        }

        const data = parse(body);
        const verseNumber = parseInt(req.params.verse);
        const idString = `p${verseNumber + 1}`;

        const verse = data
          // getting all the elements with the "p" tag
          .getElementsByTagName("p")
          .filter(
            // matching the id to the right element
            (val) => val.id === idString && val.rawAttrs.includes(`class="sb"`)
          )
          // Map returns an array
          .map((val) => {
            // Remove non-alpha-whitespace characters e.g. <p>hello</p> => phellop
            const outputStr = val.text.replace(/[^a-zA-Z-.\s]/g, "").trim();
            return outputStr;
          });

        // sending response to the user
        const resultVerse = verse[0];

        if (!resultVerse) {
          res.status(400).json({ error: "Invalid entry, please check your request and retry." });
          return;
        }

        res.status(200).json({ data: `${resultVerse}` });
      }
    )
  } catch (err) {
    console.error(err);
    next(err);
  }
}

// exporting all the handler functions
export { getVerse };
