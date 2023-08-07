import { Role } from "./constants";

export interface IAuthProvider {
  id: bigint;
  name: string;
  email: string;
  password: string;
  role: Role;
  sid: string;
}

declare module "jsonwebtoken" {
  export interface ITokenPayload extends JwtPayload {
    sid: string;
    name: string;
    role: Role;
  }
}
export interface AuthRequest extends Request {
  user: IAuthProvider;
}

export interface DecodeJwtPayload {
  sid: string;
  name: string;
  email: string;
  role: number;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      decoded: DecodeJwtPayload;
    }
  }
}
