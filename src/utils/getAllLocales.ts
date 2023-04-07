import { HTMLElement } from "node-html-parser";
import getHTML from "./getHTML";

const url = "https://wol.jw.org/en/wol/li/r1/lp-e";
const localesHTML: HTMLElement = await getHTML(url);

function getAllLocales(): (string | undefined)[] | undefined {
  const locales = localesHTML
    .querySelector(".librarySelection")
    ?.getElementsByTagName("a")
    .map((el, i) => {
      return el.getAttribute("data-locale");
    });

  return locales;
}

export default getAllLocales;
