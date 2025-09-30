import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import type { EnterpriseDataDTO } from "../../dtos/enterprise.dto";
import { AppError } from "../../errors/app.error";
import type { EnterpriseRepository } from "../../database/repositories/enterprise";
import { EnterpriseEntity } from "../../entities/enterprise.entity";

export const create =
  (enterpriseRepository: EnterpriseRepository) =>
  async ({
    nameEnterprise,
    companyName,
    cnpj,
    address,
    contactName,
    contactEmail,
    contactPhone,
    wasteType,
    scheduleFrequency,
    createdAt,
    updatedAt,
  }: EnterpriseDataDTO): Promise<EnterpriseEntity> => {
    try {
      // Verifica se a empresa já existe pelo CNPJ
      const foundEnterprise =
        await enterpriseRepository.getEnterpriseByLoginRepository(cnpj);
      if (foundEnterprise?.cnpj) {
        throw new AppError(
          "Enterprise already exists",
          StatusCodes.BAD_REQUEST,
        );
      }

      const enterpriseEntity = new EnterpriseEntity({
        idEnterprise: uuidv4(),
        nameEnterprise,
        companyName,
        cnpj,
        address,
        contactName,
        contactEmail,
        contactPhone,
        wasteType,
        scheduleFrequency,
        createdAt,
        updatedAt,
      });

      const createdEnterprise =
        await enterpriseRepository.createEnterpriseRepository(enterpriseEntity);
      return createdEnterprise;
    } catch (error) {
      throw error;
    }
  };
