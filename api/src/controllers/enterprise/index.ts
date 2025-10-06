import type { EnterpriseService } from "../../services/enterprise";
import { create } from "./enterprise.create.controller";
import { login } from "./enterprise.login.controller";
import { findById } from "./enterprise.findById.controller";
import { update } from "./enterprise.update.controller";
import { remove } from "./enterprise.delete.controller";

export const EnterpriseController = (enterpriseService: EnterpriseService) => ({
  createEnterpriseController: create(enterpriseService),
  loginEnterpriseController: login(enterpriseService),
  findByIdEnterpriseController: findById(enterpriseService),
  updateEnterpriseController: update(enterpriseService),
  deleteEnterpriseController: remove(enterpriseService),
});
