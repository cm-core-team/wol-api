import { Request, Response } from "express";

// Protect middleware to protect routes from unauthorized requests from the wrong type of user.
async function protect(
  req: Request,
  res: Response,
  next: Function,
  restrictTo: string
): Promise<void> {
  try {
    /*
     *
     * Route protection （￣︶￣）↗
     *
     */
  } catch (err) {
    next(err);
  }
}

// Middleware to log users in if their credentials are correct.
async function login(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    /**
     *
     * Do authentication stuff
     *
     */
  } catch (err) {
    next(err);
  }
}

// Middleware to sign users up and log them in.
async function signup(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    /**
     *
     * Do more authentication stuff
     *
     */
  } catch (err) {
    next(err);
  }
}

export { protect, login, signup };
