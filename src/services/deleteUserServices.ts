import { QueryConfig, QueryResult } from "pg";
import { IUserResponse } from "../interfaces/user.interface";
import { client } from "../database";

export const deleteUserService = async (dataParams: number): Promise<IUserResponse> => {
  const queryString: string = `
      UPDATE
          users 
      SET 
          active = FALSE
      WHERE id = $1;

  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [dataParams],
  };
  const queryResult: QueryResult<IUserResponse> = await client.query(queryConfig);

  return queryResult.rows[0];
};
