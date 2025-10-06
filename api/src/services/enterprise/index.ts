import type { EnterpriseRepository } from "../../database/repositories/enterprise";
import { create } from "./enterprise.create.service";
import { findById } from "./enterprise.findById.service";
import { update } from "./enterprise.update.service";
import { remove } from "./enterprise.delete.service";
import { login } from "./enterprise.login.service";

export const EnterpriseService = (
  enterpriseRepository: EnterpriseRepository,
) => ({
  createEnterpriseService: create(enterpriseRepository),
  findEnterpriseByIdService: findById(enterpriseRepository),
  updateEnterpriseService: update(enterpriseRepository),
  deleteEnterpriseService: remove(enterpriseRepository),
  loginEnterpriseService: login(enterpriseRepository),
});

export type EnterpriseService = ReturnType<typeof EnterpriseService>;
