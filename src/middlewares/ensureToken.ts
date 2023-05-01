import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../error";

export const ensureToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization: string | undefined = request.headers.authorization;
  if (!authorization) {
    throw new AppError("Missing Bearer Token", 401);
  }
  const [_bearer, token] = authorization.split(" ");
  verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
    response.locals.idUser = decoded.sub;
    response.locals.isAdmin = decoded.admin || false;
  });

  return next();
};
