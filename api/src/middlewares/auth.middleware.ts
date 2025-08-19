import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import type { AuthUser } from "../types/authUserProps";
import { verifyToken } from "../utils/jwt.utils";
import { pool } from "../database/connection";
import { sql } from "../config/sqlTag";

export const authMiddleware: RequestHandler = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null; // Aceita Token via Bearer
        const token = tokenFromHeader || req.cookies.token; // Aceita Token via Cookie

        if (!token) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token não fornecido" });
            return;
        }

        const decoded = verifyToken(token) as { idUser: string } | null;
        if (!decoded) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token inválido ou expirado" });
            return;
        }

        const userQuery = await pool.query(
        `SELECT id_user, name, email, password, is_admin FROM users WHERE id_user = $1`,
        [decoded.idUser]
        );



        if (userQuery.rows.length === 0) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Usuário não encontrado" });
            return;
        }

        const dbUser = userQuery.rows[0];

        const authUser: AuthUser = {
            idUser: dbUser.id_user,
            name: dbUser.name,
            email: dbUser.email,
            password: dbUser.password,
            isAdmin: dbUser.is_admin,
        };

        req.user = authUser;
        next();
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Erro no middleware de autenticação" });
    }
};