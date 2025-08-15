import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import type { UsersRepository } from "../../database/repositories/users";
import type { UsersDataDTO } from "../../dtos/users.dto";
import { UserEntity } from "../../entities/users.entity";
import { AppError } from "../../errors/app.error";

export const create =
	(usersRepository: UsersRepository) =>
	async ({ name, email, password, isAdmin, createdAt, updatedAt }: UsersDataDTO): Promise<UserEntity> => {
		try {
			const foundUser = await usersRepository.getUserByLoginRepository(email);
			// // Verifica se o usuário já existe
			if (foundUser?.email) throw new AppError("User already exists", StatusCodes.BAD_REQUEST);

			// BCRYPT HASHING
			const saltRounds = Number.parseInt(process.env.SALT_ROUNDS || "10", 10);
			const hashedPassword = await bcrypt.hash(password, saltRounds);

			const userEntity = new UserEntity({
				idUser: uuidv4(),
				name,
				email,
				password: hashedPassword,
				isAdmin,
				createdAt,
				updatedAt,
			});

			const createdUser = await usersRepository.createUserRepository(userEntity);
			return createdUser;
		} catch (error) {
			throw error;
		}
	};
