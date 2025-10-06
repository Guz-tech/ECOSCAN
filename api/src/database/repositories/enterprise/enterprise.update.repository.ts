import type { Pool, QueryResult } from "pg";
import { sql } from "../../../config/sqlTag";
import { EnterpriseEntity } from "../../../entities/enterprise.entity";

export const update =
  (pool: Pool) =>
  async ({
    idEnterprise,
    nameEnterprise,
    companyName,
    cnpj,
    address,
    contactName,
    contactEmail,
    contactPhone,
    wasteType,
    scheduleFrequency,
    updatedAt,
  }: EnterpriseEntity): Promise<EnterpriseEntity | null> => {
    const query = sql`
      UPDATE enterprise
      SET
        name_enterprise = $2,
        company_name = $3,
        cnpj = $4,
        address = $5,
        contact_name = $6,
        contact_email = $7,
        contact_phone = $8,
        waste_type = $9,
        schedule_frequency = $10,
        updated_at = $11
      WHERE id_enterprise = $1
      RETURNING
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
        updated_at;
    `;

    const values = [
      idEnterprise,
      nameEnterprise,
      companyName,
      cnpj,
      address,
      contactName,
      contactEmail,
      contactPhone,
      wasteType,
      scheduleFrequency,
      updatedAt,
    ];

    const result: QueryResult = await pool.query(query, values);
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
