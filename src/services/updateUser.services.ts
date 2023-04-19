import format from "pg-format";
import { IUser, IUserRequest } from "../interfaces/user.interface";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

export const updateUserService = async (
  userData: IUserRequest,
  userParamsId: number
): Promise<IUser> => {
  const queryString: string = format(
    `
      UPDATE 
          users
      SET
          (%I) = (%L)
      WHERE
          id = $1;
      `,
    Object.keys(userData),
    Object.values(userData),
  );
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userParamsId],
  };

  const queryResult: QueryResult<IUser> = await client.query(queryConfig);

  return queryResult.rows[0];
};
