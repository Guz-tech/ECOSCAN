import type { EnterpriseRepository } from "../../database/repositories/enterprise";
import { create } from "./enterprise.create.service";

export const EnterpriseService = (usersRepository: EnterpriseRepository) => ({
  createEnterpriseService: create(usersRepository),
});

export type EnterpriseService = ReturnType<typeof EnterpriseService>;
