import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

export enum JobStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CLOSED = 'closed',
  URGENT = 'urgent',
}

@Schema({ timestamps: true })
export class Job extends Document {
  @Prop({ required: true })
  jobTitle: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true, enum: EmploymentType })
  employmentType: EmploymentType;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true, enum: ExperienceLevel })
  experienceLevel: ExperienceLevel;

  @Prop({ required: true })
  minimumSalary: number;

  @Prop({ required: true })
  maximumSalary: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ type: [String], required: true })
  requiredSkills: string[];

  @Prop({ required: true, type: String })
  jobDescription: string;

  @Prop({ default: false })
  isUrgent: boolean;

  @Prop({ default: JobStatus.DRAFT, enum: JobStatus })
  status: JobStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  recruiterId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  applicants: Types.ObjectId[];

  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ default: 0 })
  applicationCount: number;

  @Prop()
  publishedAt?: Date;

  @Prop()
  closedAt?: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
