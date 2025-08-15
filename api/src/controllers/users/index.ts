import type { UsersService } from "../../services/users";
import { create } from "./users.create.controller";
import { loginUser } from "./users.login.controller";

export const UsersController = (usersService: UsersService) => ({
	loginController: loginUser(usersService),
	createUserController: create(usersService),
});
