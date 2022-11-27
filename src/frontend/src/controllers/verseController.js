import axios from "axios";

const getVerse = async function (bookNum, chapter, verse) {
  try {
    const json = await axios.get(
      `http://127.0.0.1:3001/api/v1/bibleVerses/getVerse/${bookNum}/${chapter}/${verse}`
    );

    const text = await json.data.data;

    return text;
  } catch (err) {
    console.error(err);
  }
};
export { getVerse };
