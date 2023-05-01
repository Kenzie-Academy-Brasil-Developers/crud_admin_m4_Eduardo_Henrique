import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IUserResponse } from "../interfaces/user.interface";
import { client } from "../database";
import { AppError } from "../error";

export const ensureIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const idUser = request.params.id;

  const queryString: string = `
      SELECT 
          *
      FROM 
          users
      WHERE 
          id = $1;
      `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idUser],
  };
  const queryResult: QueryResult<IUserResponse> = await client.query(
    queryConfig
  );
  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404);
  }
  return next();
};
