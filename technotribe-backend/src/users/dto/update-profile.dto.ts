import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  MinLength,
  Min,
  Max,
  IsUrl,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ExperienceLevel } from '../schemas/user.schema';

export class UpdateProfileDto {
  @ApiPropertyOptional({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({
    description: 'User last name',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Custom URL for public profile',
    example: 'john-doe-dev',
  })
  @IsString()
  @IsOptional()
  customUrl?: string;

  @ApiPropertyOptional({
    description: 'User bio',
    example: 'Full-stack developer with 5 years of experience...',
  })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({
    description: 'User location',
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
    description: 'Skills and technologies',
    example: ['React', 'TypeScript', 'Node.js'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  @ApiPropertyOptional({
    description: 'Experience level',
    enum: ExperienceLevel,
  })
  @IsEnum(ExperienceLevel)
  @IsOptional()
  experienceLevel?: ExperienceLevel;

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
    example: 'Tech Corp',
  })
  @IsString()
  @IsOptional()
  currentCompany?: string;

  @ApiPropertyOptional({
    description: 'Current position',
    example: 'Senior Developer',
  })
  @IsString()
  @IsOptional()
  currentPosition?: string;

  @ApiPropertyOptional({
    description: 'Education history',
    example: ['Bachelor in Computer Science - Stanford University'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  education?: string[];

  @ApiPropertyOptional({
    description: 'Certifications',
    example: ['AWS Certified Developer', 'Google Cloud Professional'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  certifications?: string[];

  @ApiPropertyOptional({
    description: 'Portfolio links',
    example: ['https://github.com/johndoe', 'https://dribbble.com/johndoe'],
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  portfolioLinks?: string[];

  @ApiPropertyOptional({
    description: 'Social media links',
    example: ['https://linkedin.com/in/johndoe', 'https://twitter.com/johndoe'],
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  socialLinks?: string[];

  // Recruiter-specific fields
  @ApiPropertyOptional({
    description: 'Company name',
    example: 'Tech Corp Inc.',
  })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiPropertyOptional({
    description: 'Company website',
    example: 'https://techcorp.com',
  })
  @IsUrl()
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
    example: '51-200 employees',
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
    description: 'Job title',
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
  @IsUrl()
  @IsOptional()
  linkedin?: string;

  @ApiPropertyOptional({
    description: 'Twitter profile',
    example: 'https://twitter.com/johndoe',
  })
  @IsUrl()
  @IsOptional()
  twitter?: string;

  @ApiPropertyOptional({
    description: 'Facebook profile',
    example: 'https://facebook.com/johndoe',
  })
  @IsUrl()
  @IsOptional()
  facebook?: string;

  @ApiPropertyOptional({
    description: 'Instagram profile',
    example: 'https://instagram.com/johndoe',
  })
  @IsUrl()
  @IsOptional()
  instagram?: string;

  @ApiPropertyOptional({
    description: 'Recruitment focus',
    example: 'Focus on hiring senior developers and tech leads',
  })
  @IsString()
  @IsOptional()
  recruitmentFocus?: string;

  @ApiPropertyOptional({
    description: 'Primary industry focus',
    example: 'Technology',
  })
  @IsString()
  @IsOptional()
  primaryIndustry?: string;

  @ApiPropertyOptional({
    description: 'Experience level focus',
    example: 'Mid to Senior Level',
  })
  @IsString()
  @IsOptional()
  experienceLevelFocus?: string;
}
