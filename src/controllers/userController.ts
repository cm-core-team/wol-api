// mongoose types
import { Document } from "mongoose";

import { Request, Response } from "express";

import User from "../models/userModel";

interface UserBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

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

async function createUser(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    const { firstName, lastName, email, password }: UserBody = req.body;
    const user: any = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(200).json({
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

export { getAllUsers, createUser };
