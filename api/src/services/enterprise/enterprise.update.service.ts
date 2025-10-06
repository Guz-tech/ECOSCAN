import type { EnterpriseRepository } from "../../database/repositories/enterprise";
import type { EnterpriseEntity } from "../../entities/enterprise.entity";

export const update =
  (repository: EnterpriseRepository) => async (data: EnterpriseEntity) => {
    const updated = await repository.updateEnterpriseRepository(data);
    if (!updated) throw new Error("Failed to update enterprise");
    return updated;
  };
