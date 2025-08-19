import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { StatusCodes } from "http-status-codes";

export const authRoute = Router();

authRoute.get("/me", authMiddleware, (req, res) => {
  if (!req.user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Usuário não autenticado" });
  }

  res.status(StatusCodes.OK).json(req.user);
});
