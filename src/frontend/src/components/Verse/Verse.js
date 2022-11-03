import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import './Verse.css';
import { getVerse } from "../../controllers/verseController";

// This is just a quick hack, I know it's not great design at the moment.
// This can be refractored later...
// A beautiful person helped here: https://gist.github.com/mastastealth/cd5e12f6c0960408a3ac.
// And I put this into a Python interpreter and converted it all to lowercase and stripped spaces.
// *Modern problems require modern solutions*
var books = [
  'genesis',         'exodus',          'leviticus',     'numbers',
  'deuteronomy',     'joshua',          'judges',        'ruth',
  '1samuel',         '2samuel',         '1kings',        '2kings',
  '1chronicles',     '2chronicles',     'ezra',          'nehemiah',
  'esther',          'job',             'psalm',         'proverbs',
  'ecclesiastes',    'songofsolomon',   'isaiah',        'jeremiah',
  'lamentations',    'ezekiel',         'daniel',        'hosea',
  'joel',            'amos',            'obadiah',       'jonah',
  'micah',           'nahum',           'habakkuk',      'zephaniah',
  'haggai',          'zechariah',       'malachi',       'matthew',
  'mark',            'luke',            'john',          'acts',
  'romans',          '1corinthians',    '2corinthians',  'galatians',
  'ephesians',       'philippians',     'colossians',    '1thessalonians',
  '2 thessalonians', '1timothy',        '2timothy',      'titus',
  'philemon',        'hebrews',         'james',         '1peter',
  '2peter',          '1john',           '2john',         '3john',
  'jude',            'revelation'
];

function Verse() {
  const [text, setText] = useState('');
  const [book, setBook] = useState(0);
  const [chapter, setChapter] = useState(0);
  const [verse, setVerse] = useState(0);

  return (
    <div className='verse'>
      <input placeholder='Book' className='book-input field' /><br />
      <input placeholder='Chapter' className='chapter-input field' /><br />
      <input placeholder='Verse' className='verse-input field' /><br />

      <Button variant='primary' onClick={() => {
        const book = document.getElementsByClassName('book-input')[0].value.replace(' ', '').toLowerCase();
        const chapter = document.getElementsByClassName('chapter-input')[0].value.replace(' ', '').toLowerCase();
        const verse = document.getElementsByClassName('verse-input')[0].value.replace(' ', '').toLowerCase();

        setBook(book);
        setChapter(chapter);
        setVerse(verse);

        // Get the index of the bible book in the array.
        const versePromise = getVerse(books.indexOf(book) + 1, parseInt(chapter), parseInt(verse), (text) => {
          setText(text);
        });
      }}>Submit</Button>

      <h1>{'Verse:' + text}</h1>
    </div>
  );
}

export default Verse;
