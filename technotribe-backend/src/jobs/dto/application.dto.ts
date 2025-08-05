import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApplicationStatus } from '../schemas/application.schema';

export class CreateApplicationDto {
  @ApiProperty({
    description: 'Job ID to apply for',
    example: '507f1f77bcf86cd799439011',
  })
  jobId: string;
}

export class UpdateApplicationDto {
  @ApiPropertyOptional({
    description: 'Application status',
    enum: ApplicationStatus,
  })
  @IsEnum(ApplicationStatus)
  @IsOptional()
  status?: ApplicationStatus;
}

export class ApplicationResponseDto {
  id: string;
  jobId: string;
  applicantId: string;
  recruiterId: string;
  status: ApplicationStatus;
  appliedAt: Date;
  reviewedAt?: Date;
  interviewedAt?: Date;
  offeredAt?: Date;
  rejectedAt?: Date;
  withdrawnAt?: Date;
  isViewed: boolean;
  viewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(application: any) {
    this.id = application._id || application.id;
    this.jobId = application.jobId;
    this.applicantId = application.applicantId;
    this.recruiterId = application.recruiterId;
    this.status = application.status;
    this.appliedAt = application.appliedAt;
    this.reviewedAt = application.reviewedAt;
    this.interviewedAt = application.interviewedAt;
    this.offeredAt = application.offeredAt;
    this.rejectedAt = application.rejectedAt;
    this.withdrawnAt = application.withdrawnAt;
    this.isViewed = application.isViewed;
    this.viewedAt = application.viewedAt;
    this.createdAt = application.createdAt;
    this.updatedAt = application.updatedAt;
  }
}
