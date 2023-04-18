import { IUser } from "../interfaces/user.interface";
import { client } from "../database";
import { QueryResult } from "pg";

export const listUserService = async (): Promise<IUser[]> => {
  const queryString:string = `
      SELECT 
          *
      FROM 
          users
      WHERE 
          "active" = true;
      `
  const queryResult:QueryResult<IUser> = await client.query(queryString)
  return queryResult.rows
}