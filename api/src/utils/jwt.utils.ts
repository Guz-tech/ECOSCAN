import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/app.error";

function getJwtSecret(): string {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new AppError("JWT_SECRET não está definido no ambiente", StatusCodes.INTERNAL_SERVER_ERROR);
	}
	return secret;
}

const JWT_SECRET = getJwtSecret();
const JWT_EXPIRES_IN = "1d";

export function gerarToken(payload: object): string {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string) {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch {
		return null;
	}
}