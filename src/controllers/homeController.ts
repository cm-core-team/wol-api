
// Controller for home

import { Request, Response } from "express";

// Typically handled into a controller folder
async function routeHandler(
  req: Request,
  res: Response,
  next: Function): Promise<void> {
  console.log("Hello, World!");
}

export default routeHandler;
