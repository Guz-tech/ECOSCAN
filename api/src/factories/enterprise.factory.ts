import { pool } from "../database/connection";
import { createEnterpriseRepository } from "../database/repositories/enterprise";
import { EnterpriseService } from "../services/enterprise";

class EnterpriseFactoryInternal {
  private enterpriseServiceInstance: EnterpriseService | null = null;

  getServiceInstance(): EnterpriseService {
    if (this.enterpriseServiceInstance) {
      return this.enterpriseServiceInstance;
    }

    const repository = createEnterpriseRepository(pool);
    const service = EnterpriseService(repository);
    this.enterpriseServiceInstance = service;

    return service;
  }
}

export const EnterpriseFactory = new EnterpriseFactoryInternal();
