import { sign } from "jsonwebtoken";
import "dotenv/config";
import { IUserResponse } from "../interfaces/user.interface";
export const createLoginService = async (user: IUserResponse) => {
  const token: string | undefined = sign(
    { isAdmin: user.admin, },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.id),
    }
  );
  return { token };
}
