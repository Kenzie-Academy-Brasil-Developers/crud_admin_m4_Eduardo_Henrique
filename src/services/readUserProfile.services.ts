import { QueryConfig, QueryResult } from "pg";
import { IUserResponse } from "../interfaces/user.interface";
import { client } from "../database";
import { responseUserSchema } from "../schemas/users.schemas";

export const readUserProfile = async (
  idUser: number
): Promise<IUserResponse> => {
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

  const user = queryResult.rows[0];


  return responseUserSchema.parse(user);
};
