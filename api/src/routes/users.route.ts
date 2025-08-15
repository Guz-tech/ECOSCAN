import { type RequestHandler, Router } from "express";
import { UsersController } from "../controllers/users";
import { createUserSchema, loginSchema } from "../dtos/users.dto";
import { ParamsType } from "../enums/params.enum";
import { UsersFactory } from "../factories/users.factory";
import { validador } from "../middlewares/validator.middleware";

export const usersRoutes = Router();
const usersController = UsersController(UsersFactory.getServiceInstance());

usersRoutes.post("/users", validador({ schema: createUserSchema, type: ParamsType.BODY }), usersController.createUserController as RequestHandler);

// LOGIN ONLY
usersRoutes.post("/login", validador({ schema: loginSchema, type: ParamsType.BODY }), usersController.loginController as unknown as RequestHandler);
