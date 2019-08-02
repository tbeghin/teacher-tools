export class User implements IUser {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}
