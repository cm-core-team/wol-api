import bent from "bent";

import { HTMLElement, parse } from "node-html-parser";
import { Request, Response } from "express";
import console from "console";

// get html function
import getHTML from "../utils/getHTMLData";

async function getVerse(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    const data: HTMLElement = await getHTML(
      `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.book}/${req.params.chapter}#study=discover&v=${req.params.bookNumber}:${req.params.chapter}:${req.params.verse}`
    );

    // id for the html element
    const idString: string = `v${req.params.book}-${req.params.chapter}-${req.params.verse}-1`;
    console.log(idString);

    // extracting verse text with the id
    const verse: string = data
      .getElementById(idString)
      // Remove non-alpha-whitespace characters e.g. <p>hello</p> => phellop
      .text.replace(/[0-9+*]/g, "")
      .trim();

    // checking if the verse was extracted
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
