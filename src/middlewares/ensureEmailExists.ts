import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IUser, IUserRequest } from "../interfaces/user.interface";
import { client } from "../database";
import { AppError } from "../error";

export const ensureEmailExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const emailUser: IUserRequest = request.body.email;

  const queryString: string = `
      SELECT 
          *
      FROM
          users
      WHERE
          email = $1
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [emailUser],
  };
  const queryResult: QueryResult<IUser> = await client.query(queryConfig);

  if (queryResult.rowCount !== 0) {
    throw new AppError("Email already exists", 409);
  }
  return next();
};
