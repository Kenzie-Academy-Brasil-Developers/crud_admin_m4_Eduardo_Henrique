import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IUserRequest, IUserResponse } from "../interfaces/user.interface";
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
  const queryResult: QueryResult<IUserResponse> = await client.query(queryConfig);

  if (queryResult.rowCount !== 0) {
    throw new AppError("E-mail already registered", 409);
  }
  return next();
};
