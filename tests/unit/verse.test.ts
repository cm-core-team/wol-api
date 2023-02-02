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

describe("Verse", (): void => {
  test("Test that the verse is correct. 📖", async (): Promise<void> => {
    await testForVerse(verseTestCases[0].verse, verseTestCases[0].requestUrl);
  });
});

describe("Verse", (): void => {
  test("Test that the verse is correct.", async (): Promise<void> => {
    await testForVerse(verseTestCases[1].verse, verseTestCases[1].requestUrl);
  });
});

describe("Verse", (): void => {
  test("Test that the verse is correct.", async (): Promise<void> => {
    await testForVerse(verseTestCases[2].verse, verseTestCases[2].requestUrl);
  });
});
describe("Verse", (): void => {
  test("Test that the verse is correct.", async (): Promise<void> => {
    await testForVerse(verseTestCases[3].verse, verseTestCases[3].requestUrl);
  });
});
describe("Verse", (): void => {
  test("Test that the verse is correct.", async (): Promise<void> => {
    verseTestCases[4].verse, verseTestCases[4].requestUrl;
  });
});
