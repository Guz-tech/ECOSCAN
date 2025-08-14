import type { ZodTypeAny } from "zod";
import type { ParamsType } from "../enums/params.enum";

export type ValidadeParams = {
	schema: ZodTypeAny;
	type: ParamsType;
};
