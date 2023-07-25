import { NextFunction, Request, Response } from "express";

// middleware for doing role-based permissions
export default function permit(permissions: Boolean) {
  // return a middleware
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    next();
  };
}
