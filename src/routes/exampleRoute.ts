// What a typical express route should look like
import express from "express";

// creating the router which is basically like a mini-application according to the express docs
// http://expressjs.com/en/5x/api.html#router -> docs explains it a lot better than I ever will :|
const exampleRouter = express.Router();

// This would usually go in the controllers folder as a separate module to be imported
function routeHandler(): void {
  console.log("Hello");
}

// Mounting middleware on the route
exampleRouter.use("/example/route", routeHandler);

// Finally exporting the router so that it can be mounted onto the express "app" instance
export default exampleRouter;
