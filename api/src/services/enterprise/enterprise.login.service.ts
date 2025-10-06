import type { EnterpriseRepository } from "../../database/repositories/enterprise";

export const login =
  (repository: EnterpriseRepository) => async (cnpj: string) => {
    const enterprise = await repository.getEnterpriseByLoginRepository(cnpj);
    if (!enterprise) throw new Error("Enterprise not found for this CNPJ");
    return enterprise;
  };
