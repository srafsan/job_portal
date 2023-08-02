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
