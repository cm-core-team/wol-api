import bent from "bent";

import { parse } from "node-html-parser";
import { Request, Response } from "express";
import console from "console";

async function getVerse(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    const getString = await bent("string");
    // `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.bookNumber}/1#study=discover&v=${req.params.bookNumber}:${req.params.chapter}:${req.params.verse}`

    const responseString = await getString(
      `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.bookNumber}/${req.params.chapter}#study=discover&v=${req.params.bookNumber}:${req.params.chapter}:${req.params.verse}`
    );

    const data = parse(responseString);
    const idString: string = `v${req.params.bookNumber}-${req.params.chapter}-${req.params.verse}-1`;
    console.log(idString);

    const verse = data
      .getElementById(idString)
      // Remove non-alpha-whitespace characters e.g. <p>hello</p> => phellop
      .text.replace(/[0-9+*]/g, "")
      .trim();

    if (!verse) {
      res.status(400).json({
        error: "Invalid entry, please check your request and retry.",
      });
      next(Error("Result is undefined!"));
      return;
    }

    // sending response to the user
    res.status(200).json({ data: verse });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

// exporting all the handler functions
export { getVerse };
