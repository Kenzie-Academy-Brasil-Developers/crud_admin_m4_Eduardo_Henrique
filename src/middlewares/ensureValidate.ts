import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../error";
import { verify } from "jsonwebtoken";

export const ensureBodyIsValid =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    const validateBody = schema.parse(request.body);

    request.body = validateBody;
    return next();
  };

export const token = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization: string | undefined = request.headers.authorization;
  if (!authorization) {
    throw new AppError("Missing Bearer Token", 401);
  }

  const [ _bearer, token] = authorization.split(" ")

   verify(token,String(process.env.SECRET_KEY),(error:any,decoded:any)=>{
    if(error){
      throw new AppError(error.message,401)
    }
    response.locals.idUser = decoded.id
    response.locals.isAdmin = decoded.isAdmin
    response.locals.active = decoded.active
    response.locals.email = decoded.email
  })
      
  return next()
};
