import { StatusCodes } from "http-status-codes";
import type { EnterpriseDataDTO } from "../../dtos/enterprise.dto";
import type { EnterpriseEntity } from "../../entities/enterprise.entity";
import type { EnterpriseService } from "../../services/enterprise";
import type {
  BodyRequest,
  BodyResponse,
  NextFunction,
} from "../../types/httpProps";

export const create =
  (enterpriseService: EnterpriseService) =>
  async (
    req: BodyRequest<EnterpriseDataDTO>,
    res: BodyResponse<EnterpriseEntity>,
    next: NextFunction,
  ) => {
    try {
      const enterpriseData = req.body;
      const createdEnterprise =
        await enterpriseService.createEnterpriseService(enterpriseData);
      return res.status(StatusCodes.CREATED).json({
        info: createdEnterprise,
        message: "Empresa criada com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  };
