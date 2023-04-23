import { compare } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";
import { IUser } from "../interfaces/user.interface";
import { responseUserSchema } from "../schemas/users.schemas";

export const ensureComparePassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userData = request.body
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
  response.locals.userLocals = responseUserSchema.parse(user)
  
  return next()
};
