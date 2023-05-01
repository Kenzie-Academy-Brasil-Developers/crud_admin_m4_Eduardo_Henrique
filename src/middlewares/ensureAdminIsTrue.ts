import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { QueryConfig, QueryResult } from "pg";
import { IUserResponse } from "../interfaces/user.interface";
import { client } from "../database";

export const ensureAdminIsTrue = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const idUser = response.locals.idUser;
  const queryString = `
      SELECT 
          *
      FROM
          users
      WHERE
          id = $1;`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idUser],
  };

  const queryResults: QueryResult<IUserResponse> = await client.query(
    queryConfig
  );
  
  const user = queryResults.rows[0]
  
  if (user.admin) {
    return next();
  }
  throw new AppError("Insufficient Permission", 403);
};
