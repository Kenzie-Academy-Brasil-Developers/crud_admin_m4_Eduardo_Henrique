import format from "pg-format";
import { IUserResponse, IUserUpdate } from "../interfaces/user.interface";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { responseUserSchema } from "../schemas/users.schema";

export const updateUserService = async (
  userData: IUserUpdate,
  userParamsId: number
): Promise<IUserResponse> => {
  const queryString: string = format(
    `
      UPDATE 
          users
      SET
          (%I) = ROW(%L)
      WHERE
          id = $1
      RETURNING *;
      `,
    Object.keys(userData),
    Object.values(userData)
  );
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userParamsId],
  };

  const queryResult: QueryResult<IUserResponse> = await client.query(
    queryConfig
  );
  const userUpdate: IUserResponse = queryResult.rows[0];
  return responseUserSchema.parse(userUpdate);
};
