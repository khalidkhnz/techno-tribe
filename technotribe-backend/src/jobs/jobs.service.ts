import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Job, JobStatus } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  async create(createJobDto: CreateJobDto, recruiterId: string): Promise<Job> {
    const job = new this.jobModel({
      ...createJobDto,
      recruiterId: new Types.ObjectId(recruiterId),
      status: JobStatus.DRAFT,
    });

    return job.save();
  }

  async findAll(query: any = {}): Promise<Job[]> {
    const filter: any = { status: { $ne: JobStatus.DRAFT } };

    if (query.status) {
      filter.status = query.status;
    }

    if (query.employmentType) {
      filter.employmentType = query.employmentType;
    }

    if (query.experienceLevel) {
      filter.experienceLevel = query.experienceLevel;
    }

    if (query.skills && query.skills.length > 0) {
      filter.requiredSkills = { $in: query.skills };
    }

    return this.jobModel
      .find(filter)
      .populate(
        'recruiterId',
        'firstName lastName email company customUrl jobTitle phone linkedin companyDescription companyWebsite',
      )
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByRecruiter(recruiterId: string): Promise<Job[]> {
    return this.jobModel
      .find({ recruiterId: new Types.ObjectId(recruiterId) })
      .populate(
        'recruiterId',
        'firstName lastName email company customUrl jobTitle phone linkedin companyDescription companyWebsite',
      )
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobModel
      .findById(id)
      .populate(
        'recruiterId',
        'firstName lastName email company customUrl jobTitle phone linkedin companyDescription companyWebsite',
      )
      .exec();

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }

  async update(
    id: string,
    updateJobDto: UpdateJobDto,
    recruiterId: string,
  ): Promise<Job> {
    const job = await this.jobModel.findById(id);

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.recruiterId.toString() !== recruiterId) {
      throw new ForbiddenException('You can only update your own jobs');
    }

    // If status is being updated to published, set publishedAt
    const updateData: any = { ...updateJobDto };
    if (
      updateJobDto.status === JobStatus.PUBLISHED &&
      job.status !== JobStatus.PUBLISHED
    ) {
      updateData.publishedAt = new Date();
    }

    const updatedJob = await this.jobModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate(
        'recruiterId',
        'firstName lastName email company customUrl jobTitle phone linkedin companyDescription companyWebsite',
      );

    if (!updatedJob) {
      throw new NotFoundException('Job not found');
    }

    return updatedJob;
  }

  async remove(id: string, recruiterId: string): Promise<void> {
    const job = await this.jobModel.findById(id);

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.recruiterId.toString() !== recruiterId) {
      throw new ForbiddenException('You can only delete your own jobs');
    }

    await this.jobModel.findByIdAndDelete(id);
  }

  async publishJob(id: string, recruiterId: string): Promise<Job> {
    const job = await this.jobModel.findById(id);

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.recruiterId.toString() !== recruiterId) {
      throw new ForbiddenException('You can only publish your own jobs');
    }

    const updatedJob = await this.jobModel
      .findByIdAndUpdate(
        id,
        {
          status: JobStatus.PUBLISHED,
          publishedAt: new Date(),
        },
        { new: true },
      )
      .populate(
        'recruiterId',
        'firstName lastName email company customUrl jobTitle phone linkedin companyDescription companyWebsite',
      );

    if (!updatedJob) {
      throw new NotFoundException('Job not found');
    }

    return updatedJob;
  }

  async closeJob(id: string, recruiterId: string): Promise<Job> {
    const job = await this.jobModel.findById(id);

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.recruiterId.toString() !== recruiterId) {
      throw new ForbiddenException('You can only close your own jobs');
    }

    const updatedJob = await this.jobModel
      .findByIdAndUpdate(
        id,
        {
          status: JobStatus.CLOSED,
          closedAt: new Date(),
        },
        { new: true },
      )
      .populate(
        'recruiterId',
        'firstName lastName email company customUrl jobTitle phone linkedin companyDescription companyWebsite',
      );

    if (!updatedJob) {
      throw new NotFoundException('Job not found');
    }

    return updatedJob;
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.jobModel.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });
  }

  async getJobStats(recruiterId: string): Promise<any> {
    const stats = await this.jobModel.aggregate([
      { $match: { recruiterId: new Types.ObjectId(recruiterId) } },
      {
        $group: {
          _id: null,
          totalJobs: { $sum: 1 },
          publishedJobs: {
            $sum: { $cond: [{ $eq: ['$status', JobStatus.PUBLISHED] }, 1, 0] },
          },
          draftJobs: {
            $sum: { $cond: [{ $eq: ['$status', JobStatus.DRAFT] }, 1, 0] },
          },
          closedJobs: {
            $sum: { $cond: [{ $eq: ['$status', JobStatus.CLOSED] }, 1, 0] },
          },
          urgentJobs: { $sum: { $cond: ['$isUrgent', 1, 0] } },
          totalViews: { $sum: '$viewCount' },
          totalApplications: { $sum: '$applicationCount' },
        },
      },
    ]);

    return (
      stats[0] || {
        totalJobs: 0,
        publishedJobs: 0,
        draftJobs: 0,
        closedJobs: 0,
        urgentJobs: 0,
        totalViews: 0,
        totalApplications: 0,
      }
    );
  }
}
