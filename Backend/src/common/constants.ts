export enum Role {
  admin = 1,
  recruiter = 2,
  applicant = 3,
  public = 4,
}

export const accessTokenTimer = "600s";
export const refreshTokenTimer = "1h";
export let refreshTokens: string[] = [];

export const statusMessages = {
  404: { detail: "Not Found" },
};
