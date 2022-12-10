import { Request, Response } from "express";

import axios, { AxiosResponse } from "axios";

import { HTMLElement, parse } from "node-html-parser";

const getVerseText = async (url: string, id: string): Promise<string> => {
  try {
    // parsing the html
    const html: AxiosResponse<any, any> = await axios.get(url);
    const data: HTMLElement = parse(html.data);

    // getting the actual verse text
    return data
      .getElementById(id)
      .text.replace(/[0-9+*]/g, "")
      .trim();
  } catch (err) {
    throw err;
  }
};

async function getVerse(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    // id for the html element
    const idString: string = `v${req.params.book}-${req.params.chapter}-${req.params.verse}-1`;

    // getting the verse text
    const verse: string = await getVerseText(
      `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.book}/${req.params.chapter}#study=discover&v=${req.params.book}:${req.params.chapter}:${req.params.verse}`,
      idString
    );

    if (!verse) {
      res.status(400).json({
        error: "Invalid entry, please check your request and retry.",
      });
      next(Error("Result is undefined!"));
      return;
    }

    res.status(200).json({ data: verse });
  } catch (err: any) {
    res.status(500).json({ error: "Error on the server-side. " + err.message });
    next(err);
  }
}

async function getVersesAmount(
  req: Request,
  res: Response,
  next: Function
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

// exporting all the handler functions
export { getVerse, getVersesAmount, getVerseText };
