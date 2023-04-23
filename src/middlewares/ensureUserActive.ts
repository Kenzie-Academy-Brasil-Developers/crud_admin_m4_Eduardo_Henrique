import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IUserResponse } from "../interfaces/user.interface";
import { client } from "../database";
import { responseUserSchema } from "../schemas/users.schemas";
import { AppError } from "../error";

export const ensureUserActive = async (
  request: Request,
  response: Response,
  next: NextFunction
  ) => {
    const userEmail: string = request.body.email;
  const queryString: string = `
      SELECT 
          *
      FROM
          users
      WHERE
          email = $1`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userEmail],
  };
  const queryResult: QueryResult<IUserResponse> = await client.query(
    queryConfig
  );

  const user = responseUserSchema.parse(queryResult.rows[0])
  if(user.active){

    return next();
  }
  throw new AppError("teste",401)
};
