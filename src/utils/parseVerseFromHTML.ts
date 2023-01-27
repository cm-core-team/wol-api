import { HTMLElement } from "node-html-parser";

// Small helper to parse the verses
function parseVerseFromHTML(html: HTMLElement, idString: string): string {
  // Parsing the verse as plain text
  const verse: string = html
    .getElementById(idString)
    .text.replace(/[0-9+*]/g, "")
    .trim();

  return verse;
}

export default parseVerseFromHTML;
