import type { Request, Response } from "express";
import type { EnterpriseService } from "../../services/enterprise";

export const login =
  (enterpriseService: EnterpriseService) =>
  async (req: Request, res: Response) => {
    try {
      const { cnpj } = req.body;
      const enterprise = await enterpriseService.loginEnterpriseService(cnpj);

      if (!enterprise) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }

      return res.status(200).json(enterprise);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return res.status(500).json({ message: "Erro ao fazer login", error });
    }
  };
