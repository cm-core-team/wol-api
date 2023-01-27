import { jest, expect } from "@jest/globals";

import app from "../src/app";
import request from "supertest";

import getHTML from "../src/utils/getHTML";

jest.useFakeTimers();

// THIS TEST IS OFF LIMITS FOR NOW
// NEED TO FIX AN ISSUE AS I HAVE REFACTORED SOME CODE
test("Test that the verse is correct. 📖", async (): Promise<void> => {
    // Ids for the html element.
    const ids: string[] = [
        "v1-1-1-1",
        "v59-4-8-1",
        "v66-21-4-1",
        "v19-37-11-1",
        "v40-24-7-1",
    ];

    // Getting the verse text.
    const verseTest1: HTMLElement = await getHTML(
        "https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/1/1#study=discover&v=1:1:1"
    );
    const verseTest2: HTMLElement = await getHTML(
        "https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/59/4#study=discover&v=59:4:8"
    );
    const verseTest3: HTMLElement = await getHTML(
        "https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/66/21#study=discover&v=66:21:4"
    );
    const verseTest4: HTMLElement = await getHTML(
        "https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/19/37#study=discover&v=19:37:11"
    );
    const verseTest5: HTMLElement = await getHTML(
        "https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/40/24#study=discover&v=40:24:7"
    );

    // Responses directly from the api.
    // Made multiple requests to make sure that all the verses are correct.
    const response1: request.Response = await request(app).get(
        "/api/v1/bibleVerses/getVerse/1/1/1"
    );
    const response2: request.Response = await request(app).get(
        "/api/v1/bibleVerses/getVerse/59/4/8"
    );
    const response3: request.Response = await request(app).get(
        "/api/v1/bibleVerses/getVerse/66/21/4"
    );
    const response4: request.Response = await request(app).get(
        "/api/v1/bibleVerses/getVerse/19/37/11"
    );
    const response5: request.Response = await request(app).get(
        "/api/v1/bibleVerses/getVerse/40/24/7"
    );

    // Comparing api response to whatever is seen on the wol website.
    expect(response1.body.data).toBe(verseTest1);
    expect(response2.body.data).toBe(verseTest2);
    expect(response3.body.data).toBe(verseTest3);
    expect(response4.body.data).toBe(verseTest4);
    expect(response5.body.data).toBe(verseTest5);
});
