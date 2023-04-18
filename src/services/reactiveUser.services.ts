import format from "pg-format";
import { IUser, IUserRequest } from "../interfaces/user.interface";
import { QueryResult } from "pg";
import { client } from "../database";

export const reactiveUserService = async (
  userData: IUserRequest,
  dataParamsId: number
): Promise<IUser> => {
  const queryString = format(
    `
      UPDATE
          users
      SET
         (%I) = (%L)
      RETURNING *
    `,
    Object.keys(userData),
    Object.values(userData)
  );
  const queryResult: QueryResult<IUser> = await client.query(queryString);
  return queryResult.rows[0];
};
