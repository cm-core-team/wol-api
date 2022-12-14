import { Request, Response, NextFunction } from "express";

// Protect middleware to protect routes from unauthorized requests from the wrong type of user.
/**
 * Middleware to protect routes from unauthorized requests.
 *
 * @param req
 * @param res
 * @param next
 * @param restrictTo
 */
async function protect(
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line capitalized-comments
  // restrictTo: string
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

/**
 * Middleware to log users in.
 *
 * @param req
 * @param res
 * @param next
 */
async function login(
  req: Request,
  res: Response,
  next: NextFunction
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
  next: NextFunction
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
