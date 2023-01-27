import { Router } from "express";
import { getVerse, getVersesAmount, getNumberOfChapters, } from "./../controllers/bibleVerseController.js";
const router = Router();
router.route("/getVerse/:book/:chapter/:verse").get(getVerse);
router.route("/getVersesAmount/:book/:chapter").get(getVersesAmount);
router.route("/getNumberOfChapters/:book/").get(getNumberOfChapters);
export default router;
