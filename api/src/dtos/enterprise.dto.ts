import { z } from "zod";

// DTO para criar uma Enterprise
export const createEnterpriseSchema = z.object({
  nameEnterprise: z.string().min(1, "Nome da empresa é obrigatório"),
  companyName: z.string().optional(),
  cnpj: z.string().min(1, "CNPJ é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  contactName: z.string().optional(),
  contactEmail: z.string().email("Email inválido").optional(),
  contactPhone: z.string().optional(),
  wasteType: z.string().min(1, "Tipo de resíduo é obrigatório"),
  scheduleFrequency: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type EnterpriseDataDTO = z.infer<typeof createEnterpriseSchema>;

// DTO para ID da Enterprise
export const idEnterpriseSchema = z.object({
  idEnterprise: z.string().uuid("ID da empresa inválido"),
});

export type IdEnterpriseDTO = z.infer<typeof idEnterpriseSchema>;

// DTO para login/consulta (usando CNPJ)
export const enterpriseLoginSchema = z.object({
  cnpj: z.string().min(1, "CNPJ é obrigatório"),
});

export type EnterpriseLoginDTO = z.infer<typeof enterpriseLoginSchema>;
