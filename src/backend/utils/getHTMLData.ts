import bent from "bent";
import { HTMLElement, parse } from "node-html-parser";

async function getHTML(url: string): Promise<HTMLElement> {
  try {
    // creating the bent function to get the html
    const getString: bent.RequestFunction<string> = bent("string");

    // getting the html
    const responseString: string = await getString(url);

    // converting html string to actual html
    const html: HTMLElement = parse(responseString);

    return html;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getHTML;
