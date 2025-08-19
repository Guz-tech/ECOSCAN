import { StatusCodes } from "http-status-codes";
import type { UsersDataDTO } from "../../dtos/users.dto";
import type { UserEntity } from "../../entities/users.entity";
import type { UsersService } from "../../services/users";
import type { BodyRequest, BodyResponse, NextFunction } from "../../types/httpProps";

export const create = (usersService: UsersService) => async (req: BodyRequest<UsersDataDTO>, res: BodyResponse<UserEntity>, next: NextFunction) => {
	try {
		const userData = req.body;
		const createdUser = await usersService.createUserService(userData);
		return res.status(StatusCodes.CREATED).json({ info: createdUser, message: "Usuário criado com sucesso!" });
	} catch (error) {
		next(error);
	}
};
