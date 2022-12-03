// mongoose types
import { Document } from "mongoose";

import { Request, Response } from "express";

import User from "../models/userModel.js";

async function getAllUsers(
  req: Request,
  res: Response,
  next: Function
): Promise<void> {
  try {
    const users: (Document<
      unknown,
      any,
      {
        [x: string]: any;
      }
    > & {
      [x: string]: any;
    } & Required<{
        _id: unknown;
      }>)[] = await User.find();

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
    const user: any = await User.create(req.body);

    res.status(200).json({
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

export { getAllUsers, createUser };
