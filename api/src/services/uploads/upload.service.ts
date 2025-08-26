import type { UploadDTO } from "../../dtos/upload.dto";

export class UploadService {
  async saveFileService(file: Express.Multer.File): Promise<UploadDTO> {
    return {
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    };
  }
}
