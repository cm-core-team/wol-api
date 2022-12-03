import { Request, Response } from "express";

async function homeController(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    res.status(200).send("Welcome to the wol-api.");
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export { homeController };
