import { HTMLElement } from "node-html-parser";

// Small helper to parse the verses
function parseVerseFromHTML(html: HTMLElement, idString: string): string {
  const verse: string = html
    .querySelectorAll(".v")
    .filter(el => el.id.includes(idString))
    .map(line =>
      line.text
        .replace(/[0-9+*]/g, "")
        .trimStart()
        .trimEnd()
    )
    .join(" ");

  return verse;
}

export default parseVerseFromHTML;
