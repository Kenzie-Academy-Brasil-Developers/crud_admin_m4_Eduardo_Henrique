import {  IUserResponse } from "../interfaces/user.interface";
import { client } from "../database";
import { QueryResult } from "pg";
import { responseUserSchema } from "../schemas/users.schemas";
import { z } from "zod";

export const listUserService = async (): Promise<Array<IUserResponse>> => {
  const queryString: string = `
      SELECT 
          *
      FROM 
          users;
      `;
  const queryResult: QueryResult<IUserResponse> = await client.query(queryString);

  const userList = queryResult.rows;

  const parsedUserList = await z.array(responseUserSchema).parseAsync(userList);
  

  return parsedUserList;
};
