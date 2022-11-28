// Usage:
// 1. Ensure you are in the project's root directory
// 2. Run: `npm run create-route {rootName}`

import fs from "fs";
import path from "path";

const routeName = process.argv[2];

// Regex to check if routeName is a valid name (doesn't contain special or numerical characters)
const isAcceptable = /^[a-zA-Z]+$/.test(routeName);

if (!isAcceptable) {
  console.error(
    "Invalid route name. Please enter something that doesn't contain numbers or special characters."
  );
  process.exit(-1);
}

// Root of the project
const root = path.resolve("./");

// Path, relative to the root of the project, to the routes folder
const routesPath = path.join(root, "src/backend/routes", routeName + "Routes.ts");
const controllerPath = path.join(root, "src/backend/controllers", routeName + "Controller.ts");

// Controller file relative to routes directory
const relativeControllerFilename = path.join('../controllers', routeName + "Controller.js");

// Typical template for routes
const routesTemplate = `
// Route for ${routeName}

// What a typical express route should look like
import express from "express";

// Import handler from controller
import routeHandler from '${relativeControllerFilename}';

// Create router
const router = express.Router();

// Mounting middleware on the route
router.use("/${routeName}/route", routeHandler);

// Finally exporting the router so that it can be mounted onto the express "app" instance
// The name of the router doesnt matter here.
// As this is a default export it can be named whatever when importing
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
// A little bit of background to exporting in ts/js
export default router;
`;

// Typical template for controller
const controllerTemplate = `
// Controller for ${routeName}

import { Request, Response } from "express";

// Typically handled into a controller folder
async function routeHandler(
  req: Request,
  res: Response,
  next: Function): Promise<void> {
  console.log("Hello, World!");
}

export default routeHandler;
`;

// Write to routes
fs.writeFile(routesPath, routesTemplate, (err) => {
  if (err) {
    // Failure
    console.error(err);
  } else {
    // Success
    console.info("Route created successfully!");
  }
});

// Write to controller
fs.writeFile(controllerPath, controllerTemplate, (err) => {
  if (err) {
    // Failure
    console.error(err);
  } else {
    // Success
    console.info("Controller created successfully!");
  }
});
