import { Injectable, BadRequestException } from '@nestjs/common';
import { UploadFileResponseDto, UploadResumeDto } from './dto/upload-file.dto';

@Injectable()
export class UploadService {
  /**
   * Process UploadThing file response and convert to our format
   */
  processUploadThingResponse(
    fileUrl: string,
    fileName: string,
    originalName: string,
    fileSize: number,
    mimeType: string,
  ): UploadFileResponseDto {
    return {
      fileUrl,
      fileName,
      originalName,
      fileSize,
      mimeType,
    };
  }

  /**
   * Validate file before processing
   */
  validateFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file size (4MB limit for UploadThing)
    const maxSize = 4 * 1024 * 1024; // 4MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds 4MB limit');
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPEG, PNG, WebP, and PDF files are allowed',
      );
    }
  }

  /**
   * Validate resume file specifically
   */
  validateResumeFile(file: Express.Multer.File): void {
    this.validateFile(file);

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Resumes must be PDF files');
    }
  }

  /**
   * Delete file from UploadThing service
   */
  async deleteFile(fileUrl: string): Promise<void> {
    // In a real implementation, you would call UploadThing's delete API
    // For now, we'll just log the deletion
    console.log(`Deleting file from UploadThing: ${fileUrl}`);
  }
}
