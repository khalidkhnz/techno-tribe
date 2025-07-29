import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsBoolean,
  IsNumber,
  Min,
  Max,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum EmploymentType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship',
}

export enum ExperienceLevel {
  JUNIOR = 'junior',
  MID_LEVEL = 'mid-level',
  SENIOR = 'senior',
  LEAD = 'lead',
  PRINCIPAL = 'principal',
}

export class CompleteRecruiterProfileDto {
  @ApiProperty({
    description: 'Company name',
    example: 'Tech Corp Inc.',
  })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiPropertyOptional({
    description: 'Company website',
    example: 'https://techcorp.com',
  })
  @IsString()
  @IsOptional()
  companyWebsite?: string;

  @ApiPropertyOptional({
    description: 'Company description',
    example: 'Leading technology company focused on innovation...',
  })
  @IsString()
  @IsOptional()
  companyDescription?: string;

  @ApiPropertyOptional({
    description: 'Company size',
    example: '50-200 employees',
  })
  @IsString()
  @IsOptional()
  companySize?: string;

  @ApiPropertyOptional({
    description: 'Industry',
    example: 'Technology',
  })
  @IsString()
  @IsOptional()
  industry?: string;

  @ApiPropertyOptional({
    description: 'Job title at company',
    example: 'Senior Recruiter',
  })
  @IsString()
  @IsOptional()
  jobTitle?: string;

  @ApiPropertyOptional({
    description: 'Phone number',
    example: '+1-555-123-4567',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    description: 'LinkedIn profile',
    example: 'https://linkedin.com/in/johndoe',
  })
  @IsString()
  @IsOptional()
  linkedin?: string;

  @ApiPropertyOptional({
    description: 'Preferred employment types',
    example: ['full-time', 'contract'],
  })
  @IsArray()
  @IsEnum(EmploymentType, { each: true })
  @IsOptional()
  preferredEmploymentTypes?: EmploymentType[];

  @ApiPropertyOptional({
    description: 'Preferred experience levels',
    example: ['senior', 'lead'],
  })
  @IsArray()
  @IsEnum(ExperienceLevel, { each: true })
  @IsOptional()
  preferredExperienceLevels?: ExperienceLevel[];

  @ApiPropertyOptional({
    description: 'Preferred locations',
    example: ['Remote', 'San Francisco', 'New York'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferredLocations?: string[];

  @ApiPropertyOptional({
    description: 'Preferred salary range minimum',
    example: 80000,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  preferredSalaryMin?: number;

  @ApiPropertyOptional({
    description: 'Preferred salary range maximum',
    example: 150000,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  preferredSalaryMax?: number;

  @ApiPropertyOptional({
    description: 'Preferred skills',
    example: ['React', 'Node.js', 'TypeScript'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferredSkills?: string[];

  @ApiPropertyOptional({
    description: 'Hiring urgency',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isUrgent?: boolean;

  @ApiPropertyOptional({
    description: 'Additional notes',
    example: 'Looking for experienced developers to join our growing team...',
  })
  @IsString()
  @IsOptional()
  notes?: string;
} 