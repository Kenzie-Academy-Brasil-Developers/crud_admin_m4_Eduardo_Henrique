import { Request, Response } from "express";
import { createUserService } from "../services/createUser.services";
import { IUserRequest, IUserUpdate } from "../interfaces/user.interface";
import { listUserService } from "../services/listUsers.services";
import { updateUserService } from "../services/updateUser.services";
import { number } from "zod";
import { deleteUserService } from "../services/deleteUserServices";
import { updateUserSchema } from "../schemas/users.schemas";
import { createLoginService } from "../services/createLogin.Service";

export const createUsers = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userDataBody:IUserRequest = request.body ;
  const user = await createUserService(userDataBody);
  return response.status(201).json(user);
};

export const loginUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userDataBody:IUserRequest = request.body
  const token = await createLoginService(userDataBody)
  return response.status(200).json(token);
};

export const listUsers = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const allUsers = await listUserService();
  return response.status(200).json(allUsers);
};

export const userProfile = async (
  request: Request,
  response: Response
): Promise<Response> => {
  return response.status(200).json();
};

export const updateUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userDataBody:IUserUpdate = request.body ;
  
  const userParamsId = Number(request.params.id);

  const userUpdated = await updateUserService(userDataBody, userParamsId);
  return response.status(200).json(userUpdated);
};

export const deleteUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  deleteUserService(Number(request.params.id));

  return response.status(204).json();
};

export const reactiveUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  return response.status(200).json();
};
