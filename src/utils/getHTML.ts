import axios, { AxiosResponse } from "axios";
import { parse, HTMLElement } from "node-html-parser";

/**
 * Helper function to get the verse text from WOL.
 *
 * @async
 *
 * @param url - The URL for the required HTML
 * @returns - HTML data
 */
const getHTML = async (url: string): Promise<HTMLElement> => {
  // Parsing the html
  const response: AxiosResponse<any, any> = await axios.get(url);
  const html: HTMLElement = parse(response.data);

  return html;
};

export default getHTML;
