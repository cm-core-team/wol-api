
// What a typical express route should look like
import express from "express";

// Create router
const testRoute = express.Router();

function routeHandler(): void {
  console.log("Hello, World!");
}

// Mounting middleware on the route
testRoute.use("/testRoute/route", routeHandler);

// Finally exporting the router so that it can be mounted onto the express "app" instance
export default testRoute;
