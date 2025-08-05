import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum ApplicationStatus {
  APPLIED = 'applied',
  REVIEWING = 'reviewing',
  INTERVIEWING = 'interviewing',
  OFFERED = 'offered',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

@Schema({ timestamps: true })
export class Application extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Job', required: true })
  jobId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  applicantId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  recruiterId: Types.ObjectId;

  @Prop({
    required: true,
    enum: ApplicationStatus,
    default: ApplicationStatus.APPLIED,
  })
  status: ApplicationStatus;

  @Prop()
  appliedAt: Date;

  @Prop()
  reviewedAt?: Date;

  @Prop()
  interviewedAt?: Date;

  @Prop()
  offeredAt?: Date;

  @Prop()
  rejectedAt?: Date;

  @Prop()
  withdrawnAt?: Date;

  @Prop({ default: false })
  isViewed: boolean;

  @Prop()
  viewedAt?: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
