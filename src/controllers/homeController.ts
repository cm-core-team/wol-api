import { NextFunction, Request, Response } from "express";

/**
 * Handler for the root route
 *
 * @async
 *
 * @param req
 * @param res
 * @param next
 */
async function homeController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        res.status(200).send("Welcome to the wol-api.");
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export { homeController };
