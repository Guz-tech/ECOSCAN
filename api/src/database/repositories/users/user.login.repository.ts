import { sql } from "../../../config/sqlTag";
import { UserEntity } from "../../../entities/users.entity";
import { pool } from "../../connection";

export const getUserByLogin = () =>
	async (email: string): Promise<UserEntity | null> => {
		//[SQL]
		const query = sql`SELECT * FROM users WHERE email = $1`;
		//[SQL]
		const values = [email];
		const result = await pool.query(query, values);

		if (result.rowCount === 0) return null;

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