import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import type { UsersRepository } from "../../database/repositories/users";
import { AppError } from "../../errors/app.error";
import { gerarToken } from "../../utils/jwt.utils";
import type { LoginProps } from "../../types/loginProps";

export const loginUser = (usersRepository: UsersRepository) =>
    async ({ email, password }: LoginProps) => {
        // Busca usuário pelo email
        const user = await usersRepository.getUserByLoginRepository(email);

        // Validação genérica (evita enumeração de contas)
        const isValid = user?.password && await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
        }

        // Geração do token
        const token = gerarToken({
            idUser: user.idUser,
            email: user.email,
            name: user.name,
        });

        // Retorno seguro
        return token ;

    };