import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const checkPermission = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const isAdmin: boolean = response.locals.isAdmin;
  const idUser: number = Number(response.locals.idUser);
  const requestedUserId: number = Number(request.params.id);
  
  if (isAdmin) {
    return next();
  } else if (idUser === requestedUserId) {
    return next();
  } 
    throw new AppError("Insufficient Permission", 403);
  
};
