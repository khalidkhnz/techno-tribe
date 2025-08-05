import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Resume extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  fileUrl: string;

  @Prop({ required: true })
  fileSize: number;

  @Prop({ required: true })
  mimeType: string;

  @Prop({ required: true })
  uploadedAt: Date;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  description?: string;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);

// Index for automatic cleanup of expired resumes
ResumeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
ResumeSchema.index({ userId: 1, isActive: 1 }); 