import type { EnterpriseRepository } from "../../database/repositories/enterprise";

export const remove =
  (repository: EnterpriseRepository) => async (id: string) => {
    const deleted = await repository.deleteEnterpriseRepository(id);
    if (!deleted) throw new Error("Enterprise not found");
    return deleted;
  };
