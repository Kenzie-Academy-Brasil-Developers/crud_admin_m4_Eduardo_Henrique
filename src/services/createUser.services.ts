import format from "pg-format";
import { IUserRequest, IUser } from "../interfaces/user.interface";
import { QueryResult } from "pg";
import { client } from "../database";

export const createUserService = async (
  userData: IUserRequest
): Promise<IUser> => {
  const queryString: string = format(`
      INSERT INTO users 
          (%I)
      VALUES 
          (%L)
      RETURNING *;
    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: QueryResult<IUser> = await client.query(queryString);

  return queryResult.rows[0];
};
