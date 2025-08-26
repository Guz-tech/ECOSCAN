import { Router } from "express";
import { uploadMiddleware } from "../middlewares/multer.middleware";
import { UploadService } from "../services/uploads/upload.service";
import { uploadImage } from "../controllers/uploads/upload.controller";

export const uploadRoutes = Router();
const uploadService = new UploadService();

uploadRoutes.post("/upload", uploadMiddleware.single("image"), uploadImage(uploadService));

