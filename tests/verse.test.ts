import expect from "expect";

import app from "../src/app";
import request from "supertest";

import { getVerseText } from "../src/controllers/bibleVerseController";

jest.setTimeout(10000000);

test("Test that the verse is correct. 📖", async (): Promise<void> => {
  // ids for the html element
  const ids: string[] = [
    "v1-1-1-1",
    "v59-4-8-1",
    "v66-21-4-1",
    "v19-37-11-1",
    "v40-24-7-1",
  ];

  // getting the verse text
  const verseTest1: string = await getVerseText(
    "https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/1/1#study=discover&v=1:1:1",
    ids[0]
  );
  const verseTest2: string = await getVerseText(
    "https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/59/4#study=discover&v=59:4:8",
    ids[1]
  );
  const verseTest3: string = await getVerseText(
    "https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/66/21#study=discover&v=66:21:4",
    ids[2]
  );
  const verseTest4: string = await getVerseText(
    "https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/19/37#study=discover&v=19:37:11",
    ids[3]
  );
  const verseTest5: string = await getVerseText(
    "https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/40/24#study=discover&v=40:24:7",
    ids[4]
  );

  // responses directly from the api
  // made multiple requests to make sure that all the verses are correct
  const response1 = await request(app).get(
    "/api/v1/bibleVerses/getVerse/1/1/1"
  );
  const response2 = await request(app).get(
    "/api/v1/bibleVerses/getVerse/59/4/8"
  );
  const response3 = await request(app).get(
    "/api/v1/bibleVerses/getVerse/66/21/4"
  );
  const response4 = await request(app).get(
    "/api/v1/bibleVerses/getVerse/19/37/11"
  );
  const response5 = await request(app).get(
    "/api/v1/bibleVerses/getVerse/40/24/7"
  );

  // comparing api response to whatever is seen on the wol website
  expect(response1.body.data).toBe(verseTest1);
  expect(response2.body.data).toBe(verseTest2);
  expect(response3.body.data).toBe(verseTest3);
  expect(response4.body.data).toBe(verseTest4);
  expect(response5.body.data).toBe(verseTest5);
});
