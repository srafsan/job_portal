export interface IAuthProvider {
  sid: string,
  id: string | number,
  role: string,
  username: string,
  email: string,
  phone?: string,
  last_login: string
}

export interface JwtPayload {
  [key: string]: any;
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
}

export interface ITokenPayload extends  JwtPayload {
  name: string,
  recruiter: boolean,
  admin: boolean,
  applicant: boolean
}