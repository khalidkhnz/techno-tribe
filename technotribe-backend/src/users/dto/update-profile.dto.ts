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
} 