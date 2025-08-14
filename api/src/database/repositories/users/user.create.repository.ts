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
		const insertedRow = result.rows[0];

		return new UserEntity({
			idUser: insertedRow.id_user,
			name: insertedRow.name,
			email: insertedRow.email,
			password: insertedRow.password,
			isAdmin: insertedRow.is_admin,
			createdAt: insertedRow.createdAt,
			updatedAt: insertedRow.updatedAt,
		});
	};
