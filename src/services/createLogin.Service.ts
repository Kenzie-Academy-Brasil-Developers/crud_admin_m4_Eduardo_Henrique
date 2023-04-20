import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { IUserRequest, IUser } from "../interfaces/user.interface";
import { client } from "../database";
import { AppError } from "../error";
import { strict } from "assert";
export const createLoginService = async (userData: IUserRequest) => {
  const queryString = `
      SELECT
          *
      FROM
          users
      WHERE
          email = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userData.email],
  };
  const queryResult: QueryResult<IUser> = await client.query(queryConfig);
  const user: IUser = queryResult.rows[0];
  const passwordMatch: boolean = await compare(
    userData.password,
    user.password
  );

  if (user == undefined) {
    throw new AppError("Invalid email or password!", 401);
  }
  if (!passwordMatch) {
    throw new AppError("Invalid email or password!", 401);
  }
  const token: string | undefined = sign(
    { id: user.id,
      isAdmin: user.admin },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.id),
    }
  );
  return token;
};
