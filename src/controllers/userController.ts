import { Request, Response } from "express";

import User from "../models/userModel";

async function getAllUsers(req: Request, res: Response, next: Function) {
  try {
    res
      .status(200)
      .json({
        data: "This route is currently being made... please try again soon",
      });
  } catch (err) {
    next(err);
  }
}

export { getAllUsers };
