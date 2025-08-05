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
}
