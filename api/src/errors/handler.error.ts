import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/app.error";
import type { BodyRequest, BodyResponse, NextFunction } from "../types/httpProps";

export function errorHandler(error: AppError | Error, _: BodyRequest<unknown>, res: BodyResponse<void>, __: NextFunction) {
	// Garante que message seja sempre string
	const message: string = Array.isArray(error.message) ? String(error.message[0]) : String(error.message ?? "Ocorreu um erro interno");

	if (error instanceof AppError) {
		res.status(error.statusCode).json({ message });
	} else {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
	}
}
