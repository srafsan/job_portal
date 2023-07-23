import { IAuthProvider } from "../../src/common/interfaces";

declare global {
  namespace Express {
    interface Request {
      user: IAuthProvider;
    }
  }
}
