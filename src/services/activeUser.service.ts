import { IUserRequest, IUserResponse, IUserUpdate } from "../interfaces/user.interface";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { responseUserSchema } from "../schemas/users.schemas";

export const activeUserService = async (

  userParamsId: number
): Promise<IUserResponse> => {
  const queryString: string =
    `
      UPDATE 
          users
      SET
          active = true
      WHERE
          id = $1
      RETURNING *;
      `
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userParamsId],
  };
  const queryResult: QueryResult<IUserResponse> = await client.query(queryConfig);
  const userActive: IUserResponse = queryResult.rows[0]; 
  return responseUserSchema.parse(userActive) 
};