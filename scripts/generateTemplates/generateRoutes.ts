// Usage: 
// 1. Ensure you are in the project's root directory
// 2. Run: `npm run create-route {rootName}`

import fs from 'fs';
import path from 'path';

const routeName = process.argv[2];

// Regex to check if routeName is a valid name (doesn't contain special or numerical characters)
const isAcceptable = /^[a-zA-Z]+$/.test(routeName);

if (!isAcceptable)
{
    console.error('Invalid route name. Please enter something that doesn\'t contain numbers or special characters.');
    process.exit(-1);
}

// Root of the project
const root = path.resolve('./');

// Path, relative to the root of the project, to the routes folder
const fullPath = path.join(root, 'src/routes', routeName + '.ts');

// Typical template for creating routes
const template = `
// Route for ${routeName}

// What a typical express route should look like
import express, { Request, Response } from "express";

// Create router
const ${routeName} = express.Router();

// Typically handled into a controller folder
function routeHandler(req: Request, res: Response, next: Function): void {
  console.log("Hello, World!");
}

// Mounting middleware on the route
${routeName}.use("/${routeName}/route", routeHandler);

// Finally exporting the router so that it can be mounted onto the express "app" instance
export default ${routeName};
`;

// Write file to destination
fs.writeFile(fullPath, template, (err) => {
    if (err) {
        // File writing failed
        console.error(err);
    } else {
        // Success
        console.info(routeName + ' created successfully!');
    }
});