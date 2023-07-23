import { IAuthProvider } from "../common/interfaces";

export const getUserName = (user: IAuthProvider) => {
  return user.name;
};

export const getUserNameWithEmail = (name: string, email: string) => {
  return name + " " + email;
};
