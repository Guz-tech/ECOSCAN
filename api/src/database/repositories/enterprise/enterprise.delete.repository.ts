import type { Pool, QueryResult } from "pg";
import { sql } from "../../../config/sqlTag";

export const remove =
  (pool: Pool) =>
  async (idEnterprise: string): Promise<boolean> => {
    const query = sql`
      DELETE FROM enterprise
      WHERE id_enterprise = $1;
    `;

    const result: QueryResult = await pool.query(query, [idEnterprise]);
    return (result.rowCount ?? 0) > 0;
  };
