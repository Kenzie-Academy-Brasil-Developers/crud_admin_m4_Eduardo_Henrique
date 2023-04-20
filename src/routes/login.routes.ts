import { Router } from "express";
import { loginUser } from "../controllers/users.controllers";

export const loginRoutes: Router = Router()

loginRoutes.post('',loginUser)

