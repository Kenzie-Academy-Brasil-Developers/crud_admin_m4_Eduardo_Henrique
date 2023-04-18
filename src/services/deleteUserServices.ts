import { QueryConfig, QueryResult } from "pg";
import { IUser } from "../interfaces/user.interface";
import { client } from "../database";

export const deleteUserService = async (dataParams: number): Promise<IUser> => {
  const queryString: string = `
      UPDATE
          users 
      SET 
          active = false 
      WHERE id = $1;

  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [dataParams],
  };
  const queryResult: QueryResult<IUser> = await client.query(queryConfig);

  return queryResult.rows[0];
};
