import { Request, Response, NextFunction } from "express";

/**
 * Function to get rid of repetitive try... catch blocks
 *
 * @param fn - The async function to execute
 * @returns Returns a function
 */
const catchAsync = (fn: any): any => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
