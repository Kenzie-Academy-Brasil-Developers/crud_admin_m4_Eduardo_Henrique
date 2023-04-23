import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IUserResponse } from "../interfaces/user.interface";
import { client } from "../database";
import { responseUserSchema } from "../schemas/users.schemas";
import { AppError } from "../error";

export const ensureUserAlreadyActive = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const idUser: number = Number(request.params.id);

  const queryString: string = `
      SELECT 
          *
      FROM
          users
      WHERE
          id = $1`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idUser],
  };
  const queryResult: QueryResult<IUserResponse> = await client.query(
    queryConfig
  );
  const user = responseUserSchema.parse(queryResult.rows[0]);
  if (user.active) {
    throw new AppError("User already active", 409);
  }
  return next();
  
};