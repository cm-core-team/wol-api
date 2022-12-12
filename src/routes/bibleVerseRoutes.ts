// Welcome to the bibleVerses route!

import { Router } from "express";

// Handlers
import {
  getVerse,
  getVersesAmount,
} from "./../controllers/bibleVerseController.js";

const router: Router = Router();

// Mounting middleware on the route
router.route("/getVersesAmount/:book/:chapter").get(getVersesAmount);

router.route("/getVerse/:book/:chapter/:verse").get(getVerse);

export default router;
