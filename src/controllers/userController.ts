import { Document } from "mongoose";
import { Request, Response } from "express";
import User from "../models/userModel.js";

// Typings for user request body
interface UserBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Returns all the users currently stored in the DB.
async function getAllUsers(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    // TODO:
    const users = await User.find();

    res.status(200).json({
      results: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
}

// Creates a new user and stores it on the DB.
async function createUser(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    // Parsing the request body
    const { firstName, lastName, email, password }: UserBody = req.body;

    // Creating new user.
    const user: any = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    // Sending response back to client
    res.status(200).json({
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

export { getAllUsers, createUser };
