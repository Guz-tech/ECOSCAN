import { Pool } from "pg";

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

export async function Connection() {
	const client = await pool.connect();
	console.log("Conectado ao banco de dadoos com sucesso!");
	client.release();
}
