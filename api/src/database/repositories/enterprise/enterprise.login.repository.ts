import { sql } from "../../../config/sqlTag";
import { EnterpriseEntity } from "../../../entities/enterprise.entity";
import { pool } from "../../connection";

export const getEnterpriseByCNPJ =
  () =>
  async (cnpj: string): Promise<EnterpriseEntity | null> => {
    //[SQL]
    const query = sql`SELECT * FROM enterprise WHERE cnpj = $1`;
    //[SQL]

    const values = [cnpj];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) return null;

    const sql_row = result.rows[0];
    return new EnterpriseEntity({
      idEnterprise: sql_row.id_enterprise,
      nameEnterprise: sql_row.name_enterprise,
      companyName: sql_row.company_name,
      cnpj: sql_row.cnpj,
      address: sql_row.address,
      contactName: sql_row.contact_name,
      contactEmail: sql_row.contact_email,
      contactPhone: sql_row.contact_phone,
      wasteType: sql_row.waste_type,
      scheduleFrequency: sql_row.schedule_frequency,
      createdAt: sql_row.created_at,
      updatedAt: sql_row.updated_at,
    });
  };
