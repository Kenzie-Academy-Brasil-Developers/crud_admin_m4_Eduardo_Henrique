import { Router } from "express";
import {createUsers, deleteUser, listUsers, reactiveUser, updateUser, userProfile,} from "../controllers/users.controllers";
import { ensureEmailExists } from "../middlewares/ensureEmailExists";
import { ensureUserExists } from "../middlewares/ensureUserExists";
import { ensureBodyIsValid, token } from "../middlewares/ensureValidate";
import { requestUserSchema, updateUserSchema } from "../schemas/users.schemas";
import { ensureAdminIsTrue } from "../middlewares/ensureAdminIsTrue";
import { checkPermission } from "../middlewares/ensurePermission";
import { ensureUserAlreadyActive } from "../middlewares/ensureUserAlreadyActive";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureBodyIsValid(requestUserSchema),
  ensureEmailExists,
  createUsers
);

userRoutes.get("", token, ensureAdminIsTrue, listUsers);

userRoutes.get("/profile", token, userProfile);

userRoutes.patch("/:id",token,ensureUserExists,checkPermission, ensureBodyIsValid(updateUserSchema), ensureEmailExists, updateUser);

userRoutes.put("/:id/recover", ensureBodyIsValid(updateUserSchema), token, ensureAdminIsTrue, ensureUserAlreadyActive, reactiveUser);

userRoutes.delete("/:id", token, ensureUserExists, checkPermission, deleteUser);
