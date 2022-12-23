import expect from "expect";

import app from "../src/app";
import request from "supertest";

import axios, { AxiosResponse } from "axios";
import parse, { HTMLElement } from "node-html-parser";

const htmlData: AxiosResponse<any, any> = await axios.get(
    `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/1/1#study=discover`
);
const data: HTMLElement = parse(htmlData.data);
const amount: number = data.querySelectorAll(".v").length;

describe("Test to see whether the amount of verses returned is correct.", () => {
    test("Is the amount of verses correct ✅", async (): Promise<void> => {
        const response: request.Response = await request(app).get(
            "api/v1/bibleVerses/getVersesAmount/1/1"
        );
        expect(response.body.data).toBe(amount);
    });
});
