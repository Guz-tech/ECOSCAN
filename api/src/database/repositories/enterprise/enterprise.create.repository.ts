import type { Pool, QueryResult } from "pg";
import { sql } from "../../../config/sqlTag";
import { EnterpriseEntity } from "../../../entities/enterprise.entity";

export const create =
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
    createdAt,
    updatedAt,
  }: EnterpriseEntity): Promise<EnterpriseEntity> => {
    //[SQL]
    const query = sql`
      INSERT INTO enterprise (
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
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
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
    //[SQL]

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
      createdAt,
      updatedAt,
    ];

    const result: QueryResult = await pool.query(query, values);
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
