import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  DEVELOPER = 'developer',
  RECRUITER = 'recruiter',
  ADMIN = 'admin',
}

export enum AuthProvider {
  EMAIL = 'email',
  GOOGLE = 'google',
  LINKEDIN = 'linkedin',
  GITHUB = 'github',
}

export enum ExperienceLevel {
  JUNIOR = 'junior',
  MID_LEVEL = 'mid-level',
  SENIOR = 'senior',
  LEAD = 'lead',
  PRINCIPAL = 'principal',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.DEVELOPER })
  role: UserRole;

  @Prop({ required: true, enum: AuthProvider, default: AuthProvider.EMAIL })
  authProvider: AuthProvider;

  @Prop()
  providerId?: string;

  @Prop()
  avatar?: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  lastLoginAt?: Date;

  @Prop()
  refreshToken?: string;

  // Developer Profile Fields
  @Prop()
  customUrl?: string;

  @Prop()
  bio?: string;

  @Prop()
  location?: string;

  @Prop()
  website?: string;

  @Prop({ type: [String], default: [] })
  skills: string[];

  @Prop({ enum: ExperienceLevel })
  experienceLevel?: ExperienceLevel;

  @Prop()
  yearsOfExperience?: number;

  @Prop()
  currentCompany?: string;

  @Prop()
  currentPosition?: string;

  @Prop({ type: [String], default: [] })
  education: string[];

  @Prop({ type: [String], default: [] })
  certifications: string[];

  @Prop({ type: [String], default: [] })
  portfolioLinks: string[];

  @Prop({ type: [String], default: [] })
  socialLinks: string[];

  @Prop({ default: false })
  isProfileComplete: boolean;

  @Prop({ default: 0 })
  profileViews: number;

  // Recruiter Profile Fields
  @Prop()
  company?: string;

  @Prop()
  companyWebsite?: string;

  @Prop()
  companyDescription?: string;

  @Prop()
  companySize?: string;

  @Prop()
  industry?: string;

  @Prop()
  jobTitle?: string;

  @Prop()
  phone?: string;

  @Prop()
  linkedin?: string;

  @Prop()
  twitter?: string;

  @Prop()
  facebook?: string;

  @Prop()
  instagram?: string;

  @Prop()
  recruitmentFocus?: string;

  @Prop()
  primaryIndustry?: string;

  @Prop()
  experienceLevelFocus?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
