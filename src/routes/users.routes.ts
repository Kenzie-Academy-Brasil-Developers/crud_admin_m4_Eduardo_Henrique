import { Router } from "express";
import { createUsers, deleteUser, listUsers, loginUser, reactiveUser, updateUser, userProfile } from "../controllers/users.controllers";
import { ensureEmailExists } from "../middlewares/ensureEmailExists";
import { ensureUserExists } from "../middlewares/ensureUserExists";
import { ensureBodyIsValid } from "../middlewares/ensureValidateBody";
import { requestUserSchema, updateUserSchema } from "../schemas/users.schemas";

export const userRoutes: Router = Router()

userRoutes.post('', ensureBodyIsValid(requestUserSchema), ensureEmailExists, createUsers)

 userRoutes.post('/login'  ,loginUser)

userRoutes.get('',listUsers)

userRoutes.get('/profile',userProfile)

userRoutes.patch('/:id', ensureUserExists, ensureBodyIsValid(updateUserSchema), ensureEmailExists, updateUser)

userRoutes.delete('/:id', ensureUserExists, deleteUser)

userRoutes.put('/:id/recover', /**ensureBodyIsValid(),**/ ensureUserExists, reactiveUser)