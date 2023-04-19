import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IUser } from "../interfaces/user.interface";
import { client } from "../database";
import { AppError } from "../error";

export const ensureUserExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const idUserParams = Number(request.params.id);

  console.log(request.route.path, request.method);

  let queryString: string = `
      SELECT 
          *
      FROM
          users
      WHERE
          id = $1 
      AND 
          active = true;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idUserParams],
  };

  const queryResult: QueryResult<IUser> = await client.query(queryConfig);
  console.log(queryResult.rows)
  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  return next();
};
