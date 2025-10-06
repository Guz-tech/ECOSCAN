import type { Pool } from "pg";
import { create } from "./enterprise.create.repository";
import { remove } from "./enterprise.delete.repository";
import { update } from "./enterprise.update.repository";
import { findById } from "./enterprise.findById.repository";

import { getEnterpriseByCNPJ } from "./enterprise.login.repository";

export const createEnterpriseRepository = (pool: Pool) => {
  return {
    getEnterpriseByLoginRepository: getEnterpriseByCNPJ(),
    createEnterpriseRepository: create(pool),
    findByIdRepository: findById(pool),
    updateEnterpriseRepository: update(pool),
    deleteEnterpriseRepository: remove(pool),
  };
};

export type EnterpriseRepository = ReturnType<
  typeof createEnterpriseRepository
>;
