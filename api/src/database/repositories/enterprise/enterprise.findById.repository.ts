import type { Pool, QueryResult } from "pg";
import { sql } from "../../../config/sqlTag";
import { EnterpriseEntity } from "../../../entities/enterprise.entity";

export const findById =
  (pool: Pool) =>
  async (idEnterprise: string): Promise<EnterpriseEntity | null> => {
    const query = sql`
      SELECT
        id_enterprise,
        name_enterprise,
        company_name,
        cnpj,
        address,
        contact_name,
        contact_email,
        contact_phone,
        waste_type,
        schedule_frequency,
        created_at,
        updated_at
      FROM enterprise
      WHERE id_enterprise = $1;
    `;

    const result: QueryResult = await pool.query(query, [idEnterprise]);
    const row = result.rows[0];
    if (!row) return null;

    return new EnterpriseEntity({
      idEnterprise: row.id_enterprise,
      nameEnterprise: row.name_enterprise,
      companyName: row.company_name,
      cnpj: row.cnpj,
      address: row.address,
      contactName: row.contact_name,
      contactEmail: row.contact_email,
      contactPhone: row.contact_phone,
      wasteType: row.waste_type,
      scheduleFrequency: row.schedule_frequency,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  };
