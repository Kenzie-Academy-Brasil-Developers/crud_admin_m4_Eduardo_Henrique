import { IUserRequest, IUserResponse } from "../interfaces/user.interface";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { responseUserSchema } from "../schemas/users.schema";

export const reactiveUserService = async (
  userData: IUserRequest,
  dataParamsId: number
): Promise<IUserResponse> => {
  const queryString = `
      UPDATE
          users
      SET
         active = true
      WHERE
          id = $1
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [dataParamsId],
  };

  const queryResult: QueryResult<IUserResponse> = await client.query(
    queryConfig
  );

  const userActive = queryResult.rows[0];
  return responseUserSchema.parse(userActive);
};
