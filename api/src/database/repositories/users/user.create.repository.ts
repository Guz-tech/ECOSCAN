import type { Pool, QueryResult } from "pg";
import { sql } from "../../../config/sqlTag";
import { UserEntity } from "../../../entities/users.entity";

export const create =
	(pool: Pool) =>
	async ({ idUser, name, email, password, isAdmin, createdAt, updatedAt }: UserEntity): Promise<UserEntity> => {
		//[SQL]
		const query = sql`
            INSERT INTO users (id_user, name, email, password, is_admin, "created_at", "updated_at")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id_user, name, email, password, is_admin, "created_at", "updated_at";
        `;
		//[SQL]

		const values = [idUser, name, email, password, isAdmin, createdAt, updatedAt];

		const result: QueryResult = await pool.query(query, values);
		const sql_row = result.rows[0];

		return new UserEntity({
			idUser: sql_row.id_user,
			name: sql_row.name,
			email: sql_row.email,
			password: sql_row.password,
			isAdmin: sql_row.is_admin,
			createdAt: sql_row.createdAt,
			updatedAt: sql_row.updatedAt,
		});
	};
