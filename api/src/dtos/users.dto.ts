import { z } from "zod";

export const createUserSchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
	password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
	isAdmin: z.boolean().default(false),
	createdAt: z.date().default(() => new Date()),
	updatedAt: z.date().default(() => new Date()),
});
export type UsersDataDTO = z.infer<typeof createUserSchema>;

export const idUserSchema = z.object({
	idUser: z.string().uuid("Invalid user ID"),
});

export type IdUserDTO = z.infer<typeof idUserSchema>;

export const loginSchema = z.object({
	email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
	password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});
