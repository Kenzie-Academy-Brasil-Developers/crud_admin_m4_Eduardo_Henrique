export interface IUser {
  id: number;
  name: string;
  email: string;
  admin?: boolean;
  active?: boolean;
}

export type IUserRequest = Omit<IUser, "id"> & {
  password: string;
};
