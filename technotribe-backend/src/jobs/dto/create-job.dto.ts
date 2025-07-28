import {
  IsString,
  IsEnum,
  IsNumber,
  IsArray,
  IsBoolean,
  IsOptional,
  Min,
  Max,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EmploymentType, ExperienceLevel } from '../schemas/job.schema';

export class CreateJobDto {
  @ApiProperty({
    description: 'Job title',
    example: 'Senior React Developer',
  })
  @IsString()
  jobTitle: string;

  @ApiProperty({
    description: 'Company name',
    example: 'Your Company Name',
  })
  @IsString()
  company: string;

  @ApiProperty({
    description: 'Employment type',
    enum: EmploymentType,
    example: EmploymentType.FULL_TIME,
  })
  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @ApiProperty({
    description: 'Job location',
    example: 'Remote / San Francisco',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Experience level required',
    enum: ExperienceLevel,
    example: ExperienceLevel.SENIOR,
  })
  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @ApiProperty({
    description: 'Minimum salary/rate',
    example: 120000,
  })
  @IsNumber()
  @Min(0)
  minimumSalary: number;

  @ApiProperty({
    description: 'Maximum salary/rate',
    example: 160000,
  })
  @IsNumber()
  @Min(0)
  maximumSalary: number;

  @ApiProperty({
    description: 'Currency for salary',
    example: 'USD',
  })
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'Required skills and technologies',
    example: ['React', 'TypeScript', 'Node.js'],
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  requiredSkills: string[];

  @ApiProperty({
    description: 'Job description',
    example:
      'Describe the role, responsibilities, and what makes this opportunity special...',
  })
  @IsString()
  jobDescription: string;

  @ApiPropertyOptional({
    description: 'Mark job as urgent for priority matching',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isUrgent?: boolean;
}
