import axios from "axios";
import expect from "expect";
import { parse, HTMLElement } from "node-html-parser";

import { getVerseText } from "../src/controllers/bibleVerseController";


test("Test that the verse is correct. 📖", async (): Promise<void> => {
  const htmlData = await axios.get(
    `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/1/1#study=discover&v=1:1:1`
  );
  const data: HTMLElement = parse(htmlData.data);

  // id for the html element
  const idString: string = `v1-1-1-1`;

  // getting the verse text
  const verseTest: string = getVerseText(data, idString);

  const verseApi = await axios
    .get("http://localhost:3000/api/v1/bibleVerses/getVerse/1/1/1")
    .then((data) => data.data.data);

  expect(verseApi).toBe(verseTest);
});
