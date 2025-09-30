import type { Pool } from "pg";
import { create } from "./enterprise.create.repository";
import { getEnterpriseByCNPJ } from "./enterprise.login.repository";

export const createEnterpriseRepository = (pool: Pool) => {
  return {
    getEnterpriseByLoginRepository: getEnterpriseByCNPJ(),
    createEnterpriseRepository: create(pool),
  };
};

export type EnterpriseRepository = ReturnType<
  typeof createEnterpriseRepository
>;
