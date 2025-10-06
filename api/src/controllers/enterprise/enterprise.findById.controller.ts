import type { Request, Response } from "express";
import type { EnterpriseService } from "../../services/enterprise";

export const findById =
  (enterpriseService: EnterpriseService) =>
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "ID da empresa é obrigatório" });
      }

      const enterprise = await enterpriseService.findEnterpriseByIdService(id);

      if (!enterprise) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }

      return res.status(200).json(enterprise);
    } catch (error) {
      console.error("Erro ao buscar empresa por ID:", error);
      return res.status(500).json({ message: "Erro ao buscar empresa", error });
    }
  };
