import console from "console";
import { Request, Response } from "express";

import axios from "axios";
import bent from "bent";
import { HTMLElement, parse } from "node-html-parser";


async function getVerse(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    const htmlData = await axios.get(
      `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.book}/${req.params.chapter}#study=discover&v=${req.params.book}:${req.params.chapter}:${req.params.verse}`
    );
    const data: HTMLElement = parse(htmlData.data);

    // id for the html element
    const idString: string = `v${req.params.book}-${req.params.chapter}-${req.params.verse}-1`;

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

    res.status(200).json({ data: verse });
  } catch (err) {
    res.status(400).json({ error: "Error on the server-side." })
    next(err);
  }
}

async function getVersesAmount(req: Request, res: Response, next: Function) {
  try {
    const htmlData = await axios.get(
      `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.book}/${req.params.chapter}#study=discover`
    );
    const data: HTMLElement = parse(htmlData.data);
    const finalVerse = data.querySelectorAll(".v").length;

    res.status(200).json({ data: finalVerse });
  } catch (err) {
    next(err);
  }
}

// exporting all the handler functions
export { getVerse, getVersesAmount };
