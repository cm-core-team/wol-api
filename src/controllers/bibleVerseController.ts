// Welcome to the controller for bibleVerses

import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { HTMLElement, parse } from "node-html-parser";

// Helper function to get the verse text.
const getVerseText = async (url: string, id: string): Promise<string> => {
    // Parsing the html
    const html: AxiosResponse<any, any> = await axios.get(url);
    const data: HTMLElement = parse(html.data);

    // Getting the actual verse text
    return data
        .getElementById(id)
        .text.replace(/[0-9+*]/g, "")
        .trim();
};

// Handler for getting a single verse.
async function getVerse(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        // Id for the html element
        const idString = `v${req.params.book}-${req.params.chapter}-${req.params.verse}-1`;

        // Getting the verse text
        const verse: string = await getVerseText(
            `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.book}/${req.params.chapter}#study=discover&v=${req.params.book}:${req.params.chapter}:${req.params.verse}`,
            idString
        );

        if (!verse) {
            res.status(400).json({
                error: "Invalid entry, please check your request and retry.",
            });
            next(Error("Result is undefined!"));
        }

        res.status(200).json({ data: verse });
    } catch (err: unknown) {
        // Res.status(500).json({ error: "Error on the server-side. " + err.message });
        next(err);
    }
}

async function getVersesAmount(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const htmlData: AxiosResponse<any, any> = await axios.get(
            `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.book}/${req.params.chapter}#study=discover`
        );
        const data: HTMLElement = parse(htmlData.data);
        const amount: number = data.querySelectorAll(".v").length;

        res.status(200).json({ data: amount });
    } catch (err) {
        next(err);
    }
}

// Exporting all the handler functions
export { getVerse, getVersesAmount, getVerseText };
