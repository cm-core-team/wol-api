import request from 'request';
import { parse } from "node-html-parser";
import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

async function getVerse(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    axios.get(`https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/${req.params.bookNumber}/1#study=discover&v=${req.params.bookNumber}:${req.params.chapter}:${req.params.verse}`)
      .then((axiosRes: AxiosResponse) => {
        const data = parse(axiosRes.data);
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
          .map((val) => val.text.replace(/[^a-zA-Z-.\s]/g, "").trim());

        // sending response to the user
        const resultVerse = verse[0];
        console.log(verse);

        if (!resultVerse) {
          res.status(400).json({ error: "Invalid entry, please check your request and retry." });
          next(Error('Result is undefined!'));
          return;
        }

        res.status(200).json({ data: `${resultVerse}` });
      })
      .catch((err: Error) => {
        console.error(err);
        res.status(500).json({ error: "Server-side error, aborted request." });

        next(err);
        return;
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

// exporting all the handler functions
export { getVerse };
