import { StatusCodes } from "http-status-codes";
import type { UploadDTO } from "../../dtos/upload.dto";
import type { UploadService } from "../../services/uploads/upload.service";
import type { BodyResponse, NextFunction } from "../../types/httpProps";

export const uploadImage = (uploadService: UploadService) =>
    async (req: any, res: BodyResponse<UploadDTO>, next: NextFunction) => {
        try {
            if (!req.file) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: "Nenhuma imagem enviada." });
            }

            const uploadedFile = await uploadService.saveFileService(req.file);
            return res.status(StatusCodes.CREATED).json({
                info: uploadedFile,
                message: "Imagem enviada com sucesso!",
            });
        } catch (error) {
            next(error);
        }
    };
