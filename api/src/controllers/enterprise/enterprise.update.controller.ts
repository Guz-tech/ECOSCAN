import type { Request, Response } from "express";
import type { EnterpriseService } from "../../services/enterprise";

export const update =
  (enterpriseService: EnterpriseService) =>
  async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const updatedEnterprise =
        await enterpriseService.updateEnterpriseService(data);

      return res.status(200).json(updatedEnterprise);
    } catch (error) {
      console.error("Erro ao atualizar empresa:", error);
      return res
        .status(400)
        .json({ message: "Erro ao atualizar empresa", error });
    }
  };
