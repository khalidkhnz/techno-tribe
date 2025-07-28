import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Application, ApplicationStatus } from './schemas/application.schema';
import { Job } from './schemas/job.schema';
import { User } from '../users/schemas/user.schema';
import { CreateApplicationDto } from './dto/application.dto';
import { UpdateApplicationDto } from './dto/application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name) private applicationModel: Model<Application>,
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createApplication(
    createApplicationDto: CreateApplicationDto,
    applicantId: string,
  ): Promise<Application> {
    const { jobId } = createApplicationDto;

    // Check if job exists
    const job = await this.jobModel.findById(jobId);
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    // Check if job is published
    if (job.status !== 'published') {
      throw new BadRequestException('Cannot apply to unpublished job');
    }

    // Check if user has already applied
    const existingApplication = await this.applicationModel.findOne({
      jobId: new Types.ObjectId(jobId),
      applicantId: new Types.ObjectId(applicantId),
    });

    if (existingApplication) {
      throw new ConflictException('You have already applied to this job');
    }

    // Create application
    const application = new this.applicationModel({
      jobId: new Types.ObjectId(jobId),
      applicantId: new Types.ObjectId(applicantId),
      recruiterId: job.recruiterId,
      appliedAt: new Date(),
    });

    const savedApplication = await application.save();

    // Update job application count
    await this.jobModel.findByIdAndUpdate(jobId, {
      $inc: { applicationCount: 1 },
      $push: { applicants: new Types.ObjectId(applicantId) },
    });

    return savedApplication;
  }

  async updateApplicationStatus(
    applicationId: string,
    updateApplicationDto: UpdateApplicationDto,
    recruiterId: string,
  ): Promise<Application> {
    const { status } = updateApplicationDto;

    const application = await this.applicationModel.findById(applicationId);
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    // Check if the recruiter owns the job
    if (application.recruiterId.toString() !== recruiterId) {
      throw new BadRequestException('You can only update applications for your own jobs');
    }

    // Update status and set appropriate timestamp
    const updateData: any = { status };
    
    switch (status) {
      case ApplicationStatus.REVIEWING:
        updateData.reviewedAt = new Date();
        break;
      case ApplicationStatus.INTERVIEWING:
        updateData.interviewedAt = new Date();
        break;
      case ApplicationStatus.OFFERED:
        updateData.offeredAt = new Date();
        break;
      case ApplicationStatus.REJECTED:
        updateData.rejectedAt = new Date();
        break;
      case ApplicationStatus.WITHDRAWN:
        updateData.withdrawnAt = new Date();
        break;
    }

    const updatedApplication = await this.applicationModel.findByIdAndUpdate(
      applicationId,
      updateData,
      { new: true },
    );

    if (!updatedApplication) {
      throw new NotFoundException('Application not found');
    }

    return updatedApplication;
  }

  async getApplicationsByJob(jobId: string, recruiterId: string): Promise<Application[]> {
    // Verify the recruiter owns the job
    const job = await this.jobModel.findOne({
      _id: jobId,
      recruiterId: new Types.ObjectId(recruiterId),
    });

    if (!job) {
      throw new NotFoundException('Job not found or you do not have permission to view applications');
    }

    return this.applicationModel
      .find({ jobId: new Types.ObjectId(jobId) })
      .populate('applicantId', 'firstName lastName email avatar skills experienceLevel currentCompany currentPosition')
      .sort({ createdAt: -1 })
      .exec();
  }

  async getApplicationsByApplicant(applicantId: string): Promise<Application[]> {
    return this.applicationModel
      .find({ applicantId: new Types.ObjectId(applicantId) })
      .populate('jobId', 'jobTitle company location employmentType experienceLevel minimumSalary maximumSalary currency')
      .populate('recruiterId', 'firstName lastName company')
      .sort({ createdAt: -1 })
      .exec();
  }

  async getApplicationById(applicationId: string): Promise<Application> {
    const application = await this.applicationModel
      .findById(applicationId)
      .populate('jobId')
      .populate('applicantId')
      .populate('recruiterId')
      .exec();

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return application;
  }

  async markApplicationAsViewed(applicationId: string, recruiterId: string): Promise<void> {
    const application = await this.applicationModel.findById(applicationId);
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    // Check if the recruiter owns the job
    if (application.recruiterId.toString() !== recruiterId) {
      throw new BadRequestException('You can only view applications for your own jobs');
    }

    await this.applicationModel.findByIdAndUpdate(applicationId, {
      isViewed: true,
      viewedAt: new Date(),
    });
  }

  async withdrawApplication(applicationId: string, applicantId: string): Promise<Application> {
    const application = await this.applicationModel.findById(applicationId);
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    // Check if the applicant owns the application
    if (application.applicantId.toString() !== applicantId) {
      throw new BadRequestException('You can only withdraw your own applications');
    }

    // Check if application can be withdrawn
    if (application.status === ApplicationStatus.WITHDRAWN) {
      throw new BadRequestException('Application is already withdrawn');
    }

    if (application.status === ApplicationStatus.OFFERED) {
      throw new BadRequestException('Cannot withdraw an application that has been offered');
    }

    const updatedApplication = await this.applicationModel.findByIdAndUpdate(
      applicationId,
      {
        status: ApplicationStatus.WITHDRAWN,
        withdrawnAt: new Date(),
      },
      { new: true },
    );

    if (!updatedApplication) {
      throw new NotFoundException('Application not found');
    }

    return updatedApplication;
  }
} 