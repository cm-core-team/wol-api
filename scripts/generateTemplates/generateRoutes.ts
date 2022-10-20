// Usage: 
// 1. Ensure you are in the project's root directory
// 2. Run: `npm run create-route {rootName}`

import fs from 'fs';
import path from 'path';

const routeName = process.argv[2];

// Root of the project
const root = path.resolve('./');

// Path, relative to the root of the project, to the routes folder
const fullPath = path.join(root, 'src/routes', routeName + '.ts');

// Typical template for creating routes
const template = `
// Route for ${routeName}

// What a typical express route should look like
import express from "express";

// Create router
const ${routeName} = express.Router();

function routeHandler(): void {
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