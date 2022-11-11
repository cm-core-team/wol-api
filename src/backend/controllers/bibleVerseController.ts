import request from "request";
import { parse } from "node-html-parser";
import { Request, Response } from "express";
import console from "console";

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
          res
            .status(500)
            .json({ error: "Server-side error, aborted request." });

    // id for the html element
    const idString: string = `v${req.params.bookNumber}-${req.params.chapter}-${req.params.verse}-1`;
    console.log(idString);

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
          res
            .status(400)
            .json({
              error: "Invalid entry, please check your request and retry.",
            });
          next(Error("Result is undefined!"));
          return;
        }

        res.status(200).json({ data: `${resultVerse}` });
      }
    );
  } catch (err) {
    // logging the error and sending error to next middleware
    console.error(err);
    next(err);
  }
}

async function getVersesAmount(req: Request, res: Response, next: Function) {
  try {
    const data = await getHTML(
      `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.book}/${req.params.chapter}#study=discover`
    );
  } catch (err) {}
}

// exporting all the handler functions
export { getVerse };
