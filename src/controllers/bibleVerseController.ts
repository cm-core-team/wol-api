import { Request, Response, NextFunction } from "express";
import { HTMLElement } from "node-html-parser";

import getHTML from "../utils/getHTML.js";
import catchAsync from "../utils/catchAsync.js";
import parseVerseFromHTML from "../utils/parseVerseFromHTML.js";

/**
 * Handler for getting a single verse
 *
 * @async
 *
 * @param req
 * @param res
 * @param next
 */
const getVerse = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const htmlForVerse: HTMLElement = await getHTML(
      `https://wol.jw.org/${req.params.lang}/wol/b/r1/lp-e/nwtsty/${req.params.book}/${req.params.chapter}#study=discover&v=
      ${req.params.book}:
      ${req.params.chapter}:
      ${req.params.verse}`
    );

    const idString = `v${req.params.book}-${req.params.chapter}-${req.params.verse}-`;
    const verse: string = parseVerseFromHTML(htmlForVerse, idString);

    const htmlForNumberOfChapters: HTMLElement = await getHTML(
      `https://wol.jw.org/${req.params.lang}/wol/binav/r1/lp-e/nwtsty/${req.params.book}`
    );
    const amountOfChapters =
      htmlForNumberOfChapters.querySelectorAll(".chapter").length;

    const data = { verse, amountOfChapters };

    if (!verse) {
      res.status(400).json({
        error: "Invalid entry, please check your request and retry.",
      });
      next(new Error("Result is undefined!"));
    }
    res.status(200).json({ data });
  }
);

/**
 * Handler for getting the amount of verses of a certain chapter.
 *
 * @async
 *
 * @param req
 * @param res
 * @param next
 */
const getVersesAmount = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const html: HTMLElement = await getHTML(
      `https://wol.jw.org/${req.params.lang}/wol/b/r1/lp-e/nwtsty/${req.params.book}/${req.params.chapter}#study=discover`
    );

    if (!html)
      next(new Error("There seems to be an issue. Please try again later"));

    const amountOfVerses = html.querySelectorAll(".v").length;

    res.status(200).json({ data: amountOfVerses });
  }
);

const getNumberOfChapters = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const html: HTMLElement = await getHTML(
      `https://wol.jw.org/${req.params.lang}/wol/binav/r1/lp-e/nwtsty/${req.params.book}`
    );

    if (!html) next(new Error("Server is not responding"));

    const amountOfChapters = html.querySelectorAll(".chapter").length;
    res.status(200).json({ data: amountOfChapters });
  }
);

const getVersesInChapter = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { book, chapter } = req.params;
    const html: HTMLElement = await getHTML(
      `https://wol.jw.org/${req.params.lang}/wol/b/r1/lp-e/nwtsty/${book}/${chapter}#study=discover`
    );

    if (!html) {
      next(new Error("Invalid request, please try again."));
    }

    const elementsContainingVerses: HTMLElement[] = html.querySelectorAll(".v");

    const versesArray: string[] = elementsContainingVerses.map(
      (verse: HTMLElement, verseNum: number) => {
        return verse.text.replace(/[0-9+*]/g, "").trim();
      }
    );

    res.status(200).json({ data: versesArray });
  }
);

// Exporting all the handler functions
export { getVerse, getVersesAmount, getNumberOfChapters, getVersesInChapter };
