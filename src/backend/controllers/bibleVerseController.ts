import console from "console";
import { Request, Response } from "express";

import bent from "bent";
import { HTMLElement, parse } from "node-html-parser";

import getHTML from "../utils/getHTMLData.js";

async function getVerse(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    const data: HTMLElement = await getHTML(
      `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.bookNumber}/${req.params.chapter}#study=discover&v=${req.params.bookNumber}:${req.params.chapter}:${req.params.verse}`
    );

    // id for the html element
    const idString: string = `v${req.params.bookNumber}-${req.params.chapter}-${req.params.verse}-1`;
    console.log(idString);

    // getting the verse text
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

    res.status(200).json({ data: `${verse}` });
  } catch (err) {
    // logging the error and sending error to next middleware
    console.error(err);
    next(err);
  }
}

async function getVersesAmount(req: Request, res: Response, next: Function) {
  try {
    console.log(req.params.book, req.params.chapter);

    const getString: bent.RequestFunction<string> = bent("string");
    const resString: string = await getString(
      `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.book}/${req.params.chapter}#study=discover`
    );

    const data: HTMLElement = await parse(resString);
    const finalVerse: number = document.querySelectorAll(".v").length;

    console.log(finalVerse);

    res.status(200).json({ data: finalVerse });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

// exporting all the handler functions
export { getVerse, getVersesAmount };
