import type { UsersService } from "../../services/users";
import { create } from "./users.create.controller";

export const UsersController = (usersService: UsersService) => ({
	// loginController: loginUser(usersService),
	createUserController: create(usersService),
});
