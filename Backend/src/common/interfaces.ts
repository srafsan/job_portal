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

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: number;
  sid: string;
}

export interface IBlackListToken {
  tokenId: number;
  token: string;
}

export interface IJobs {
  id: number;
  name: string;
  description: string;
  salary: number;
  location: string;
  experience: number;
  deadline: string;
  post_by: number;
  image: string;
}