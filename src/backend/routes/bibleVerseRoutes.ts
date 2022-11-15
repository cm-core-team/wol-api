// Route for bibleVerseRoutes

// What a typical express route should look like
import express, { Request, Response, Router } from "express";

// importing the handler functions
import {
  getVerse,
  getVersesAmount,
} from "./../controllers/bibleVerseController.js";

// Create router
// Route name doesn't matter here
// That's my bad
const router: Router = express.Router();

// Mounting middleware on the route
router
  .route("/bibleVerses/getVersesAmount/:book/:chapter")
  .get(getVersesAmount);

router.route("/bibleVerses/getVerse/:book/:chapter/:verse").get(getVerse);
// Finally exporting the router so that it can be mounted onto the express "app" instance
// The name of the router doesnt matter here.
// As this is a default export it can be named whatever when importing
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
// A little bit of background to exporting in ts/js
export default router;
