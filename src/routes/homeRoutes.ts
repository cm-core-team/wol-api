
// Route for home

// What a typical express route should look like
import express from "express";

// Import handler from controller
import routeHandler from '../controllers/homeController.js';

// Create router
const router = express.Router();

// Mounting middleware on the route
router.use("/home/route", routeHandler);

// Finally exporting the router so that it can be mounted onto the express "app" instance
// The name of the router doesnt matter here.
// As this is a default export it can be named whatever when importing
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
// A little bit of background to exporting in ts/js
export default router;
