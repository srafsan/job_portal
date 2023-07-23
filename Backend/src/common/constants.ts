export enum Role {
  admin = "admin",
  recruiter = "recruiter",
  applicant = "applicant",
}

export const adminMiddleware = [];
export const recruiterMiddleware = [];
export const applicantMiddleware = [];

export const accessTokenTimer = "600s";
export const refreshTokenTimer = "1h";
export let refreshTokens: string[] = [];
