import format from "pg-format";
import { IUser, IUserRequest } from "../interfaces/user.interface";
import { QueryResult } from "pg";
import { client } from "../database";

export const updateUserService = async (
  userData: IUserRequest,
  userParams: number
): Promise<IUser> => {
  const queryString: string = format(`
      UPDATE 
          users
      SET
          (%I) = (%L)
      `);

  const queryResult: QueryResult<IUser> = await client.query(queryString);

  return queryResult.rows[0];
};
