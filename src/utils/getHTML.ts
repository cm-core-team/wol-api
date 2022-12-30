import axios, { AxiosResponse } from "axios";
import parse, { HTMLElement } from "node-html-parser";

/**
 * Helper function to get the verse text from WOL.
 *
 * @async
 *
 * @param url - This is the url for the required verse.
 * @returns - The verse text as a string.
 */
const getHTML = async (url: string): Promise<HTMLElement> => {
    // Parsing the html
    const html: AxiosResponse<any, any> = await axios.get(url);
    const data: HTMLElement = parse(html.data);

    return data;
};

export default getHTML;
