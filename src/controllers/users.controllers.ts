import { Request, Response } from "express";
import { createUserService } from "../services/createUser.service";
import { IUserRequest, IUserUpdate } from "../interfaces/user.interface";
import { listUserService } from "../services/listUsers.service";
import { updateUserService } from "../services/updateUser.service";
import { deleteUserService } from "../services/deleteUser.service";
import { createLoginService } from "../services/createLogin.Service";
import { readUserProfile } from "../services/readUserProfile.service";
import { activeUserService } from "../services/activeUser.service";

export const createUsers = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userDataBody: IUserRequest = request.body;
  const user = await createUserService(userDataBody);
  return response.status(201).json(user);
};

export const loginUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userLocals = response.locals.userLocals;
  const token = await createLoginService(userLocals);

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
  const idUser: number = Number(response.locals.idUser);
  const profile = await readUserProfile(idUser);
  return response.status(200).json(profile);
};

export const updateUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userDataBody: IUserUpdate = request.body;

  const userParamsId = Number(request.params.id);

  const userUpdated = await updateUserService(userDataBody, userParamsId);
  return response.status(200).json(userUpdated);
};

export const deleteUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const idToDelete = Number(request.params.id);

  await deleteUserService(idToDelete);
  return response.status(204).json();
};

export const reactiveUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const idUser = Number(request.params.id);

  const reactiveUser = await activeUserService(idUser);
  return response.status(200).json(reactiveUser);
};
