// What a typical express route should look like
import express from "express";

// Create router
const exampleRouter = express.Router();

// This would usually go in the controllers folder as a separate module to be imported
function routeHandler(): void {
  console.log("Hello, World!");
}

// Mounting middleware on the route
exampleRouter.use("/example/route", routeHandler);

// Finally exporting the router so that it can be mounted onto the express "app" instance
export default exampleRouter;
