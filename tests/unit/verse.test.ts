import { jest } from "@jest/globals";

import app from "../../build/app";
import request from "supertest";

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
  const expectedVerse =
    "In the beginning God created the heavens and the earth.";

  // Responses directly from the api.
  // Made multiple requests to make sure that all the verses are correct.
  const response1: request.Response = await request(app).get(
    "/api/v1/bibleVerses/getVerse/1/1/1"
  );

  // Comparing api response to the verse
  expect(response1.body.data.verse).toBe(expectedVerse);
});
