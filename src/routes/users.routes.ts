import { Router } from "express";
import {
  createUsers,
  deleteUser,
  listUsers,
  reactiveUser,
  updateUser,
  userProfile,
} from "../controllers/users.controllers";
import { ensureEmailExists } from "../middlewares/ensureEmailExists";
import { ensureUserExists } from "../middlewares/ensureUserExists";
import { ensureBodyIsValid } from "../middlewares/ensureValidate";
import { requestUserSchema, updateUserSchema } from "../schemas/users.schema";
import { ensureAdminIsTrue } from "../middlewares/ensureAdminIsTrue";
import { checkPermission } from "../middlewares/ensurePermission";
import { ensureUserAlreadyActive } from "../middlewares/ensureUserAlreadyActive";
import { ensureToken } from "../middlewares/ensureToken";
import { ensureIdExists } from "../middlewares/ensureIdExists";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureBodyIsValid(requestUserSchema),
  ensureEmailExists,
  createUsers
);

userRoutes.get("", ensureToken, ensureAdminIsTrue, listUsers);

userRoutes.get("/profile", ensureToken, userProfile);

userRoutes.patch(
  "/:id",
  ensureIdExists,
  ensureToken,
  checkPermission,
  ensureBodyIsValid(updateUserSchema),
  ensureEmailExists,
  updateUser
);

userRoutes.put(
  "/:id/recover",
  ensureBodyIsValid(updateUserSchema),
  ensureToken,
  ensureAdminIsTrue,
  ensureUserAlreadyActive,
  reactiveUser
);

userRoutes.delete(
  "/:id",
  ensureToken,
  ensureIdExists,
  checkPermission,
  deleteUser
);
