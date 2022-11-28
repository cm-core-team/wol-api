import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Fade from "react-bootstrap/Fade";
import axios from 'axios';

import "./Verse.css";
import { getVerse } from "../../controllers/verseController";

// This is just a quick hack, I know it's not great design at the moment.
// This can be refractored later...
// A beautiful person helped here: https://gist.github.com/mastastealth/cd5e12f6c0960408a3ac.
// And I put this into a Python interpreter and converted it all to lowercase and stripped spaces.
// *Modern problems require modern solutions*
const books = [
  "genesis",
  "exodus",
  "leviticus",
  "numbers",
  "deuteronomy",
  "joshua",
  "judges",
  "ruth",
  "1samuel",
  "2samuel",
  "1kings",
  "2kings",
  "1chronicles",
  "2chronicles",
  "ezra",
  "nehemiah",
  "esther",
  "job",
  "psalm",
  "proverbs",
  "ecclesiastes",
  "songofsolomon",
  "isaiah",
  "jeremiah",
  "lamentations",
  "ezekiel",
  "daniel",
  "hosea",
  "joel",
  "amos",
  "obadiah",
  "jonah",
  "micah",
  "nahum",
  "habakkuk",
  "zephaniah",
  "haggai",
  "zechariah",
  "malachi",
  "matthew",
  "mark",
  "luke",
  "john",
  "acts",
  "romans",
  "1corinthians",
  "2corinthians",
  "galatians",
  "ephesians",
  "philippians",
  "colossians",
  "1thessalonians",
  "2 thessalonians",
  "1timothy",
  "2timothy",
  "titus",
  "philemon",
  "hebrews",
  "james",
  "1peter",
  "2peter",
  "1john",
  "2john",
  "3john",
  "jude",
  "revelation",
];

function Verse() {
  const [text, setText] = useState("");
  const [book, setBook] = useState(0);
  const [chapter, setChapter] = useState(0);
  const [verse, setVerse] = useState(0);
  const [textState, setTextState] = useState(false);

  return (
    <div className="verse">
      <input placeholder="Book" className="book-input field" onChange={(e) => setBook(e.target.value.replace(" ", "")
            .toLowerCase())} />
      <br />
      <input placeholder="Chapter" className="chapter-input field" onChange={(e) => setChapter(e.target.value.replace(" ", "")
            .toLowerCase())} />
      <br />
      <input placeholder="Verse" className="verse-input field" onChange={(e) => setVerse(e.target.value.replace(" ", "")
            .toLowerCase())} />
      <br />
      <Button
        variant="primary"
        onClick={() => {
          setTextState(false);
          console.log(book, chapter, verse);

          // Get the index of the bible book in the array.
          const versePromise = getVerse(books.indexOf(book) + 1, chapter, verse)
            .then((data) => {
              setText(data);
              // setTextState(true);
              setTextState(true);
            })
            .catch((err) => console.error(err));
        }}
      >
        Submit
      </Button>
      <Fade in={textState}>
        <h1>{text}</h1>
      </Fade>
    </div>
  );
}

export default Verse;
