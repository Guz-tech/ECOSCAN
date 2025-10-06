import type { EnterpriseRepository } from "../../database/repositories/enterprise";

export const findById =
  (repository: EnterpriseRepository) => async (id: string) => {
    const enterprise = await repository.findByIdRepository(id);
    if (!enterprise) throw new Error("Enterprise not found");
    return enterprise;
  };
