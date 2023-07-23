import jwt, { JwtPayload } from "jsonwebtoken";

export interface IAuthProvider {
  id: number;
  name: string;
  email: string;
  password: string;
  applicant: boolean;
  recruiter: boolean;
  admin: boolean;
  sid: string;
}

declare module "jsonwebtoken" {
  export interface ITokenPayload extends JwtPayload {
    sid: string;
    name: string;
    recruiter: boolean;
    admin: boolean;
    applicant: boolean;
  }
}
export interface AuthRequest extends Request {
  user: IAuthProvider;
}
