import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

import User, { IUser } from "./../models/userModel";
import catchAsync from "../utils/catchAsync";
import process from "process";

const signToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET as Secret, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user: IUser, statusCode: number, res: Response) => {
    const token: string = signToken(user._id);
    const cookieOptions: object = {
        expires: new Date(
            ((Date.now() +
                process.env.JWT_COOKIE_EXPIRES_IN) as unknown as number) *
                24 *
                60 *
                60 *
                1000
        ),
    };
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
