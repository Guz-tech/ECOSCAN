import type { Pool } from "pg";
import { create } from "./user.create.repository";
// import { getUserByLogin } from "./users.login.repository";

export const createUsersRepository = (pool: Pool) => {
	return {
		// getUserByLoginRepository: getUserByLogin(pool),
		createUserRepository: create(pool),
	};
};

export type UsersRepository = ReturnType<typeof createUsersRepository>;
