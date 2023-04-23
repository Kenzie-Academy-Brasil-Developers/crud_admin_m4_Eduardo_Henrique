import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const checkPermission = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const isAdmin = response.locals.isAdmin;

  const idUser = response.locals.idUser;

  const requestedUserId = Number(request.params.id);

  if (isAdmin) {
    return next();
  }
  if (idUser === requestedUserId) {
    return next();
  }
  throw new AppError("Insufficient Permission", 403);
};
