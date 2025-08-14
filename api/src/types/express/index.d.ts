import type { AuthUser } from "../authUserProps";

declare global {
	namespace Express {
		interface Request {
			user?: AuthUser;
		}
	}
}
