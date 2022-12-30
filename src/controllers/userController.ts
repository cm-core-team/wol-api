import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import catchAsync from "../utils/catchAsync";

/**
 * Returns all the users from the database.
 *
 * @async
 *
 * @param req
 * @param res
 * @param next
 */
const getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const users = await User.find();

        res.status(200).json({
            results: users.length,
            data: users,
        });
    }
);

/**
 * Creates a new user and stores it on the DB.
 *
 * @async
 *
 * @param req
 * @param res
 * @param next
 */
const createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        // Parsing the request body
        const { firstName, lastName, email, password }: IUser = req.body;

        // Creating new user.
        const user = new User({
            firstName,
            lastName,
            email,
            password,
        });

        // Sending response back to client
        res.status(200).json({
            data: user,
        });
    }
);

export { getAllUsers, createUser };
