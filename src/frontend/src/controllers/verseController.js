import bent from "bent";

const getVerse = async function (bookNum, chapter, verse) {
  const getJSON = bent("json");
  const obj = await getJSON(
    `http://127.0.0.1:3001/api/v1/bibleVerses/getVerse/${bookNum}/${chapter}/${verse}`
  );
  const verseText = obj.data;

  return verseText;
};
export { getVerse };
