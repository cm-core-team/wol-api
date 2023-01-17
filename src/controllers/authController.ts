import { Request, Response, NextFunction, CookieOptions } from "express";
import jwt, { Secret } from "jsonwebtoken";

import User, { IUser } from "./../models/userModel";
import catchAsync from "../utils/catchAsync";
import process from "process";

const jwtSecret: Secret = process.env.JWT_SECRET as Secret;
const jwtValidFor: string = process.env.JWT_EXPIRES_IN as string;
const jwtCookieValidFor: number = process.env
    .JWT_COOKIE_EXPIRES_IN as unknown as number;

const signToken = (userId: string): string => {
    return jwt.sign({ userId }, jwtSecret, {
        expiresIn: jwtValidFor,
    });
};

const createSendToken = (user: IUser, statusCode: number, res: Response) => {
    const token: string = signToken(user._id);
    const cookieOptions: CookieOptions = {
        expires: new Date(
            (Date.now() + jwtCookieValidFor) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
    res.cookie("jwt", token, cookieOptions);

    // Unable to literally set it to undefined.
    user.password = "undefined";

    // The token should not be sent in production...
    // ** DEVELOPMENT PURPOSES ONLY **
    res.status(statusCode).json({ status: "success", token, data: { user } });
};

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
