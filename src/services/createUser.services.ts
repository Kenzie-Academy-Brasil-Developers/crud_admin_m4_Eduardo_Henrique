import format from "pg-format";
import { IUserRequest, IUserResponse } from "../interfaces/user.interface";
import { QueryResult } from "pg";
import { client } from "../database";
import { responseUserSchema } from "../schemas/users.schemas";
import { hash } from "bcryptjs";

export const createUserService = async (
  userData: IUserRequest
): Promise<IUserResponse> => {
  userData.password =  await hash(userData.password,12)
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


  const queryResult: QueryResult<IUserResponse> = await client.query(queryString);

  const userCreate = queryResult.rows[0];
  return  responseUserSchema.parse(userCreate)
};
