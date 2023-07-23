import { NextFunction, Request, Response } from "express";

// middleware for doing role-based permissions
export default function permit(permissions: Boolean) {
  // return a middleware
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    console.log(permissions);

    console.log(user);
    next();

    //   if (user && permittedRoles.includes(user.role)) {
    //     next(); // role is allowed, so continue on the next middleware
    //   } else {
    //     res.status(403).json({message: "Forbidden"}); // user is forbidden
    //   }
  };
}
