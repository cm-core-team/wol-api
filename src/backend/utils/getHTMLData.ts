import axios from "axios";
import { HTMLElement, parse } from "node-html-parser";

async function getHTML(url: string): Promise<HTMLElement> {
  try {
    // creating the bent function to get the html
    // const getString: bent.RequestFunction<string> = bent("string");


    // getting the html
    console.log('[*] Requesting data from wol.jw.org...');
    const responseString: string = await axios.get(url);
    console.log(responseString);

    console.log('[*] Parsing request...');
    // converting html string to actual html
    const html: HTMLElement = parse(responseString);

    return html;
  } catch (err) {
    // console.error(err);
    throw err;
  }
}

export default getHTML;
