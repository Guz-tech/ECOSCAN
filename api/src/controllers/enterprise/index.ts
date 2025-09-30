import type { EnterpriseService } from "../../services/enterprise";
import { create } from "./enterprise.create.controller";

export const EnterpriseController = (enterpriseService: EnterpriseService) => ({
  createEnterpriseController: create(enterpriseService),
});
