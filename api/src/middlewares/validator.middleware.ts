import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/app.error";
import type { ValidadeParams } from "../types/validadeParamsProps";

export function validador(params: ValidadeParams) {
	return (req: Request, _res: Response, next: NextFunction) => {
		const result = params.schema.safeParse(req[params.type]);

		if (!result.success) {
			const errorFormatted = result.error.issues.map((item) => `${item.path.join(".")}: ${item.message}`);
			throw new AppError(errorFormatted, StatusCodes.UNPROCESSABLE_ENTITY);
		}
		req[params.type] = result.data;
		next();
	};
}
