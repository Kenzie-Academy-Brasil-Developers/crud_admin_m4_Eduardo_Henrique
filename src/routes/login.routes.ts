import { Router } from "express";
import { loginUser } from "../controllers/users.controllers";
import { ensureBodyIsValid } from "../middlewares/ensureValidate";
import { requestLoginUserSchema } from "../schemas/users.schema";
import { ensureComparePassword } from "../middlewares/ensureComparePassword";

export const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensureBodyIsValid(requestLoginUserSchema),
  ensureComparePassword,
  loginUser
);
