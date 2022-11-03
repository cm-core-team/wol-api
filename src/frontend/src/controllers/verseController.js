import bent from "bent";

const getVerse = async function (bookNum, chapter, verse) {
  const getJSON = bent("json");

  const obj = await getJSON(
    `http://127.0.0.1:3000/api/v1/bibleVerses/getVerse/${bookNum}/${chapter}/${verse}`
  );
  const verseText = obj.json();

  console.log(verseText);

  return verseText;
};
export { getVerse };
