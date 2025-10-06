import type { Request, Response } from "express";
import type { EnterpriseService } from "../../services/enterprise";

export const remove =
  (enterpriseService: EnterpriseService) =>
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "ID da empresa é obrigatório" });
      }

      const deleted = await enterpriseService.deleteEnterpriseService(id);

      if (!deleted) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar empresa:", error);
      return res
        .status(400)
        .json({ message: "Erro ao deletar empresa", error });
    }
  };
