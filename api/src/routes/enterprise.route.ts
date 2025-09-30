import { type RequestHandler, Router } from "express";
import { createEnterpriseSchema } from "../dtos/enterprise.dto";
import { ParamsType } from "../enums/params.enum";
import { validador } from "../middlewares/validator.middleware";
import { EnterpriseFactory } from "../factories/enterprise.factory";
import { EnterpriseController } from "../controllers/enterprise";

export const enterpriseRoutes = Router();
const enterpriseController = EnterpriseController(
  EnterpriseFactory.getServiceInstance(),
);

// Criar Enterprise
enterpriseRoutes.post(
  "/",
  validador({ schema: createEnterpriseSchema, type: ParamsType.BODY }),
  enterpriseController.createEnterpriseController as RequestHandler,
);

// Login/Consulta por CNPJ
