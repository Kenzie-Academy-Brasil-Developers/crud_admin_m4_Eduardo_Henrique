import { Router } from "express";
import { createUsers, deleteUser, listUsers, loginUser, reactiveUser, updateUser, userProfile } from "../controllers/users.controllers";
import { ensureEmailExists } from "../middlewares/ensureEmailExists";

export const userRoutes: Router = Router()

userRoutes.post('', ensureEmailExists, createUsers)

// userRoutes.post('/:id',loginUser)

userRoutes.get('',listUsers)

userRoutes.get('/profile',userProfile)

userRoutes.patch('/:id',updateUser)

userRoutes.delete('/:id',deleteUser)

userRoutes.put('/:id/recover',reactiveUser)