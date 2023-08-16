import { z } from "zod";
import {
  requestUserSchema,
  responseUserSchema,
  updateUserSchema,
  userSchema,
} from "../schemas/users.schema";

export type IUser = z.infer<typeof userSchema>;
export type IUserResponse = z.infer<typeof responseUserSchema>;
export type IUserRequest = z.infer<typeof requestUserSchema>;

export type IUserUpdate = z.infer<typeof updateUserSchema>;
