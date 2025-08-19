import type { UsersRepository } from "../../database/repositories/users";
import { create } from "./users.create.service";
import { loginUser } from "./users.login.service";

export const UsersService = (usersRepository: UsersRepository) => ({
	createUserService: create(usersRepository),
	loginService: loginUser(usersRepository)
});

export type UsersService = ReturnType<typeof UsersService>;
