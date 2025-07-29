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
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CompleteDeveloperProfileDto {
  @ApiPropertyOptional({
    description: 'Custom URL for public profile',
    example: 'john-doe-dev',
  })
  @IsString()
  @IsOptional()
  customUrl?: string;

  @ApiPropertyOptional({
    description: 'Professional bio',
    example: 'Full-stack developer with 5+ years of experience in React and Node.js...',
  })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({
    description: 'Location',
    example: 'San Francisco, CA',
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    description: 'Personal website',
    example: 'https://johndoe.dev',
  })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiPropertyOptional({
    description: 'Technical skills',
    example: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  @ApiPropertyOptional({
    description: 'Experience level',
    example: 'senior',
    enum: ['junior', 'mid-level', 'senior', 'lead', 'principal'],
  })
  @IsEnum(['junior', 'mid-level', 'senior', 'lead', 'principal'])
  @IsOptional()
  experienceLevel?: string;

  @ApiPropertyOptional({
    description: 'Years of experience',
    example: 5,
    minimum: 0,
    maximum: 50,
  })
  @IsNumber()
  @Min(0)
  @Max(50)
  @IsOptional()
  yearsOfExperience?: number;

  @ApiPropertyOptional({
    description: 'Current company',
    example: 'Tech Corp Inc.',
  })
  @IsString()
  @IsOptional()
  currentCompany?: string;

  @ApiPropertyOptional({
    description: 'Current position',
    example: 'Senior Software Engineer',
  })
  @IsString()
  @IsOptional()
  currentPosition?: string;

  @ApiPropertyOptional({
    description: 'Education background',
    example: ['Bachelor of Computer Science - Stanford University'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  education?: string[];

  @ApiPropertyOptional({
    description: 'Professional certifications',
    example: ['AWS Certified Developer', 'Google Cloud Professional'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  certifications?: string[];

  @ApiPropertyOptional({
    description: 'Portfolio links',
    example: ['https://github.com/johndoe', 'https://dribbble.com/johndoe'],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  portfolioLinks?: string[];

  @ApiPropertyOptional({
    description: 'Social media links',
    example: ['https://linkedin.com/in/johndoe', 'https://twitter.com/johndoe'],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  socialLinks?: string[];
} 