import { pool } from "./connection";

export async function setupDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id_user UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS enterprise (
          id_enterprise UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name_enterprise VARCHAR(255) NOT NULL,
          company_name VARCHAR(255),
          cnpj VARCHAR(20) UNIQUE NOT NULL,
          address VARCHAR(255) NOT NULL,
          contact_name VARCHAR(255),
          contact_email VARCHAR(255),
          contact_phone VARCHAR(20),
          waste_type VARCHAR(50) NOT NULL,
          schedule_frequency VARCHAR(50),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Tabelas criadas com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
  }
}
