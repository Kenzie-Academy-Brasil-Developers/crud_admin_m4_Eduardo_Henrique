import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IUserResponse } from "../interfaces/user.interface";
import { client } from "../database";
import { AppError } from "../error";

export const ensureUserExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const idUserParams = Number(request.params.id);

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
  const queryResult: QueryResult<IUserResponse> = await client.query(
    queryConfig
    );
  if (queryResult.rows[0] == undefined) {
    throw new AppError("User not found", 404);
  }

  return next();
};
