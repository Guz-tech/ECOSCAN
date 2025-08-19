import { pool } from "../database/connection";
import { createUsersRepository } from "../database/repositories/users";
import { UsersService } from "../services/users";

class UsersFactoryInternal {
	private usersServiceInstance: UsersService | null = null;

	getServiceInstance(): UsersService {
		if (this.usersServiceInstance) {
			return this.usersServiceInstance;
		}

		const repository = createUsersRepository(pool);
		const service = UsersService(repository);
		this.usersServiceInstance = service;

		return service;
	}
}

export const UsersFactory = new UsersFactoryInternal();
