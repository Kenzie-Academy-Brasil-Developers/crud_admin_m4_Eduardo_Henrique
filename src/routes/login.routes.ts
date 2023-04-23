import { Router } from "express";
import { loginUser } from "../controllers/users.controllers";
import { ensureBodyIsValid } from "../middlewares/ensureValidate";
import { requestLoginUserSchema } from "../schemas/users.schemas";
import { ensureUserActive } from "../middlewares/ensureUserActive";

export const loginRoutes: Router = Router()

loginRoutes.post('',ensureBodyIsValid(requestLoginUserSchema),ensureUserActive,loginUser)

