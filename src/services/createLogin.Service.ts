import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import { QueryConfig, QueryResult } from "pg";
import { IUserRequest, IUser, IUserResponse } from "../interfaces/user.interface";
import { client } from "../database";
import { AppError } from "../error";
export const createLoginService = async (user: IUserResponse) => {

  
  const token: string | undefined = sign(
    { id: user.id,email:user.email ,isAdmin: user.admin,active: user.active },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.id),
    }
  );
  return { token };
}
