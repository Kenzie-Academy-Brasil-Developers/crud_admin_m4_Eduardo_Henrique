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
import { ensureBodyIsValid, token } from "../middlewares/ensureValidate";
import { requestUserSchema, updateUserSchema } from "../schemas/users.schemas";
import { ensureAdminIsTrue } from "../middlewares/ensureAdminIsTrue";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureBodyIsValid(requestUserSchema),
  ensureEmailExists,
  createUsers
);

userRoutes.get("", token, ensureAdminIsTrue, listUsers);

userRoutes.get("/profile", token, userProfile);

userRoutes.patch(
  "/:id",
  ensureUserExists,
  ensureBodyIsValid(updateUserSchema),
  ensureEmailExists,
  updateUser
);

userRoutes.put(
  "/:id/recover",
  /**ensureBodyIsValid(),**/ ensureUserExists,
  reactiveUser
);

userRoutes.delete("/:id", ensureUserExists, deleteUser);
