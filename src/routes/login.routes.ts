import { Router } from "express";
import { loginUser } from "../controllers/users.controllers";
import { ensureBodyIsValid } from "../middlewares/ensureValidate";
import { requestLoginUserSchema } from "../schemas/users.schemas";
import { ensureUserActive } from "../middlewares/ensureUserActive";
import { ensureComparePassword } from "../middlewares/ensureComparePassword";

export const loginRoutes: Router = Router();

loginRoutes.post("", ensureBodyIsValid(requestLoginUserSchema),ensureComparePassword,ensureUserActive,loginUser);
