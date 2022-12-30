import { Request, Response, NextFunction } from "express";

import User, { IUser } from "./../models/userModel";
import catchAsync from "../utils/catchAsync";

/**
 * Middleware to protect routes from unauthorized requests.
 *
 * @async
 *
 * @param req
 * @param res
 * @param next
 * @param restrictTo
 */
const protect = catchAsync(
    async (
        req: Request,
        res: Response,
        next: NextFunction
        // eslint-disable-next-line capitalized-comments
        // restrictTo: string[]
    ): Promise<void> => {
        /*
         *
         * Route protection （￣︶￣）↗
         *
         */
    }
);

/**
 * Middleware to log users in.
 *
 * Parses the request body and checks the credentials to see if they match up in the DB.
 *
 * @async
 *
 * @param req
 * @param res
 * @param next
 */
const login = catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { email, password }: IUser = req.body;

        // Check if there is an email or password
        if (!email || !password)
            next(new Error("An email or password is required."));

        // Find user in the db
        const user = await User.findOne({ email }).select("+password");

        // Check if user exists in db
        if (!user) next(new Error("The email or password is incorrect"));

        // Send JWT if everything is correct
    }
);

/**
 * Middleware to sign up new users and log them in.
 *
 * @async
 *
 * @param req
 * @param res
 * @param next
 */

const signup = catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const newUser: IUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });

        // Send a jwt
    }
);

export { protect, login, signup };
