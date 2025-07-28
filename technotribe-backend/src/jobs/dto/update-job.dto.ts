import {
  IsString,
  IsEnum,
  IsNumber,
  IsArray,
  IsBoolean,
  IsOptional,
  Min,
  ArrayMinSize,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  EmploymentType,
  ExperienceLevel,
  JobStatus,
} from '../schemas/job.schema';

export class UpdateJobDto {
  @ApiPropertyOptional({
    description: 'Job title',
    example: 'Senior React Developer',
  })
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @ApiPropertyOptional({
    description: 'Company name',
    example: 'Your Company Name',
  })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiPropertyOptional({
    description: 'Employment type',
    enum: EmploymentType,
  })
  @IsOptional()
  @IsEnum(EmploymentType)
  employmentType?: EmploymentType;

  @ApiPropertyOptional({
    description: 'Job location',
    example: 'Remote / San Francisco',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: 'Experience level required',
    enum: ExperienceLevel,
  })
  @IsOptional()
  @IsEnum(ExperienceLevel)
  experienceLevel?: ExperienceLevel;

  @ApiPropertyOptional({
    description: 'Minimum salary/rate',
    example: 120000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumSalary?: number;

  @ApiPropertyOptional({
    description: 'Maximum salary/rate',
    example: 160000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maximumSalary?: number;

  @ApiPropertyOptional({
    description: 'Currency for salary',
    example: 'USD',
  })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({
    description: 'Required skills and technologies',
    example: ['React', 'TypeScript', 'Node.js'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  requiredSkills?: string[];

  @ApiPropertyOptional({
    description: 'Job description',
    example:
      'Describe the role, responsibilities, and what makes this opportunity special...',
  })
  @IsOptional()
  @IsString()
  jobDescription?: string;

  @ApiPropertyOptional({
    description: 'Mark job as urgent for priority matching',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isUrgent?: boolean;

  @ApiPropertyOptional({
    description: 'Job status',
    enum: JobStatus,
  })
  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;
}
