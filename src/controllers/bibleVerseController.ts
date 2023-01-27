// Welcome to the controller for bibleVerses

import { Request, Response, NextFunction } from "express";
import { HTMLElement } from "node-html-parser";

import getHTML from "../utils/getHTML.js";
import catchAsync from "../utils/catchAsync.js";

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
        // Id for the html element containing the verse
        const idString = `v${req.params.book}-${req.params.chapter}-${req.params.verse}-1`;

        // Getting the verse text
        const html: HTMLElement = await getHTML(
            `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.book}/${req.params.chapter}#study=discover&v=${req.params.book}:${req.params.chapter}:${req.params.verse}`
        );

        const verse: string = html
            .getElementById(idString)
            .text.replace(/[0-9+*]/g, "")
            .trim();

        if (!verse) {
            res.status(400).json({
                error: "Invalid entry, please check your request and retry.",
            });
            next(new Error("Result is undefined!"));
        }
        res.status(200).json({ data: verse });
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
            `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.book}/${req.params.chapter}#study=discover`
        );

        if (!html)
            next(
                new Error("There seems to be an issue. Please try again later")
            );
        const amount = html.querySelectorAll(".v").length;

        res.status(200).json({ data: amount });
    }
);

const getNumberOfChapters = catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const html: HTMLElement = await getHTML(
            `https://wol.jw.org/en/wol/binav/r1/lp-e/nwtsty/${req.params.book}`
        );

        if (!html) next(new Error("Server is not responding"));

        const amount = html.querySelectorAll(".chapter").length;
        res.status(200).json({ data: amount });
    }
);

// Exporting all the handler functions
export { getVerse, getVersesAmount, getNumberOfChapters };
