// Welcome to the bibleVerses route!

import { Router } from "express";

// Handlers
import {
    getVerse,
    getVersesAmount,
} from "./../controllers/bibleVerseController";

const router: Router = Router();

// Route handling.
router.route("/getVersesAmount/:book/:chapter").get(getVersesAmount);

router.route("/getVerse/:book/:chapter/:verse").get(getVerse);

export default router;
