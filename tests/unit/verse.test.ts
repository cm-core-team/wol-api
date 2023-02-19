import { jest } from "@jest/globals";

import app from "../../build/app";
import { verseTestCases } from "./testCases";

import request from "supertest";
import { describe } from "node:test";

jest.useFakeTimers();

async function testForVerse(testVerse: string, requestUrl: string) {
  const expectedVerse = testVerse;

  const response: request.Response = await request(app).get(requestUrl);

  expect(response.body.data.verse).toBe(expectedVerse);
}

// Using a loop to go through each test case
verseTestCases.forEach(testCase => {
  describe("Verse", (): void => {
    test("Test that the verse is correct. 📖", async (): Promise<void> => {
      await testForVerse(testCase.verse, testCase.requestUrl);
    });
  });
});
