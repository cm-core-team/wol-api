import { Request } from "express";

// protect middleware to protect routes from unauthorized requests from the wrong type of user
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

async function loginUser(
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

async function signupUser(
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

export { protect, loginUser, signupUser };
