import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import { QueryConfig, QueryResult } from "pg";
import { IUserRequest, IUser } from "../interfaces/user.interface";
import { client } from "../database";
import { AppError } from "../error";
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
  if (queryResult.rows.length === 0) {
    throw new AppError("Wrong email/password", 401);
  }
  
  const user: IUser = queryResult.rows[0];

  const passwordMatch: boolean = await compare(
    userData.password,
    user.password
  );
  
  if (!passwordMatch) {
    throw new AppError("Wrong email/password", 401);
  }
  
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
