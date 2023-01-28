// Welcome to the bibleVerses route!

import { Router } from "express";

// Handlers
import {
  getVerse,
  getVersesAmount,
  getNumberOfChapters,
  getVersesInChapter,
} from "./../controllers/bibleVerseController.js";

const router: Router = Router();

// Route handling.

router.route("/getVerse/:book/:chapter/:verse").get(getVerse);
router.route("/getVersesAmount/:book/:chapter").get(getVersesAmount);
router.route("/getNumberOfChapters/:book").get(getNumberOfChapters);
router.route("/getVersesInChapter/:book/:chapter").get(getVersesInChapter);

export default router;
