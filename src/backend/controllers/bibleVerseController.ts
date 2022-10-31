import bent from "bent";

import { HTMLElement, parse } from "node-html-parser";
import { Request, Response } from "express";
import console from "console";

async function getVerse(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    // Creating a function which will return a string response from the url
    const getString: bent.RequestFunction<string> = await bent("string");

    // The string response from the website
    const responseString: string = await getString(
      `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.bookNumber}/${req.params.chapter}#study=discover&v=${req.params.bookNumber}:${req.params.chapter}:${req.params.verse}`
    );

    // id for the html element
    const idString: string = `v${req.params.bookNumber}-${req.params.chapter}-${req.params.verse}-1`;
    console.log(idString);

    // converting data into manipulatable html
    const data: HTMLElement = parse(responseString);

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

// exporting all the handler functions
export { getVerse };
