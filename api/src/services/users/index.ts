import type { UsersRepository } from "../../database/repositories/users";
import { create } from "./users.create.service";

export const UsersService = (usersRepository: UsersRepository) => ({
	createUserService: create(usersRepository),
});

export type UsersService = ReturnType<typeof UsersService>;
