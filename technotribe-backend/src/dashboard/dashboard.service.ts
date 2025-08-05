import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { Job, JobStatus } from '../jobs/schemas/job.schema';
import { Application, ApplicationStatus } from '../jobs/schemas/application.schema';
import { UserRole } from '../users/schemas/user.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(Application.name) private applicationModel: Model<Application>,
  ) {}

  async getRecruiterDashboard(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user || user.role !== UserRole.RECRUITER) {
      throw new Error('User not found or not a recruiter');
    }

    // Get recruiter's jobs
    const jobs = await this.jobModel.find({ recruiterId: new Types.ObjectId(userId) });
    
    // Get total applications for all jobs
    const jobIds = jobs.map((job) => job._id);
    const applications = await this.applicationModel.find({
      jobId: { $in: jobIds },
    });

    // Calculate statistics
    const totalJobs = jobs.length;
    const publishedJobs = jobs.filter(
      (job) => job.status === JobStatus.PUBLISHED,
    ).length;
    const draftJobs = jobs.filter(
      (job) => job.status === JobStatus.DRAFT,
    ).length;
    const closedJobs = jobs.filter(
      (job) => job.status === JobStatus.CLOSED,
    ).length;
    
    const totalApplications = applications.length;
    const appliedApplications = applications.filter(
      (app) => app.status === ApplicationStatus.APPLIED,
    ).length;
    const reviewingApplications = applications.filter(
      (app) => app.status === ApplicationStatus.REVIEWING,
    ).length;
    const interviewingApplications = applications.filter(
      (app) => app.status === ApplicationStatus.INTERVIEWING,
    ).length;
    const offeredApplications = applications.filter(
      (app) => app.status === ApplicationStatus.OFFERED,
    ).length;
    const rejectedApplications = applications.filter(
      (app) => app.status === ApplicationStatus.REJECTED,
    ).length;
    const withdrawnApplications = applications.filter(
      (app) => app.status === ApplicationStatus.WITHDRAWN,
    ).length;

    // Get recent applications (last 10)
    const recentApplications = await this.applicationModel
      .find({ jobId: { $in: jobIds } })
      .populate('jobId', 'jobTitle company')
      .populate('applicantId', 'firstName lastName email profileImage')
      .sort({ createdAt: -1 })
      .limit(10);

    // Get recent jobs (last 5)
    const recentJobs = await this.jobModel
      .find({ recruiterId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .limit(5);

    // Calculate application rate (applications per job)
    const averageApplicationsPerJob =
      totalJobs > 0 ? (totalApplications / totalJobs).toFixed(1) : '0';

    // Get monthly statistics for the last 6 months
    const monthlyStats = await this.getMonthlyStats(userId, 'recruiter');

    return {
      overview: {
        totalJobs,
        publishedJobs,
        draftJobs,
        closedJobs,
        totalApplications,
        appliedApplications,
        reviewingApplications,
        interviewingApplications,
        offeredApplications,
        rejectedApplications,
        withdrawnApplications,
        averageApplicationsPerJob: parseFloat(averageApplicationsPerJob),
      },
      recentApplications,
      recentJobs,
      monthlyStats,
      profile: {
        profileViews: user.profileViews || 0,
        isProfileComplete: user.isProfileComplete || false,
      },
    };
  }

  async getDeveloperDashboard(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user || user.role !== UserRole.DEVELOPER) {
      throw new Error('User not found or not a developer');
    }

    // Get developer's applications using getApplicationsByApplicant pattern
    const applications = await this.applicationModel
      .find({ applicantId: new Types.ObjectId(userId) })
      .populate(
        'jobId',
        'jobTitle company location employmentType experienceLevel minimumSalary maximumSalary currency',
      )
      .populate('recruiterId', 'firstName lastName company')
      .sort({ createdAt: -1 })
      .exec();

    // Calculate statistics
    const totalApplications = applications.length;
    const appliedApplications = applications.filter(
      (app) => app.status === ApplicationStatus.APPLIED,
    ).length;
    const reviewingApplications = applications.filter(
      (app) => app.status === ApplicationStatus.REVIEWING,
    ).length;
    const interviewingApplications = applications.filter(
      (app) => app.status === ApplicationStatus.INTERVIEWING,
    ).length;
    const offeredApplications = applications.filter(
      (app) => app.status === ApplicationStatus.OFFERED,
    ).length;
    const rejectedApplications = applications.filter(
      (app) => app.status === ApplicationStatus.REJECTED,
    ).length;
    const withdrawnApplications = applications.filter(
      (app) => app.status === ApplicationStatus.WITHDRAWN,
    ).length;

    // Get recent applications (last 10)
    const recentApplications = await this.applicationModel
      .find({ applicantId: new Types.ObjectId(userId) })
      .populate(
        'jobId',
        'jobTitle company location employmentType experienceLevel minimumSalary maximumSalary currency',
      )
      .populate('recruiterId', 'firstName lastName company')
      .sort({ createdAt: -1 })
      .limit(10)
      .exec();

    // Get recommended jobs based on skills
    const recommendedJobs = await this.getRecommendedJobs(
      user.skills || [],
      userId,
    );

    // Calculate success rate (offered applications / total applications)
    const successRate =
      totalApplications > 0
        ? ((offeredApplications / totalApplications) * 100).toFixed(1)
        : '0';

    // Get monthly statistics for the last 6 months
    const monthlyStats = await this.getMonthlyStats(userId, 'developer');

    return {
      overview: {
        totalApplications,
        appliedApplications,
        reviewingApplications,
        interviewingApplications,
        offeredApplications,
        rejectedApplications,
        withdrawnApplications,
        successRate: parseFloat(successRate),
      },
      recentApplications,
      recommendedJobs,
      monthlyStats,
      profile: {
        profileViews: user.profileViews || 0,
        isProfileComplete: user.isProfileComplete || false,
        skills: user.skills || [],
        experienceLevel: user.experienceLevel,
        yearsOfExperience: user.yearsOfExperience,
      },
    };
  }

  private async getRecommendedJobs(
    skills: string[],
    userId: string,
    limit: number = 5,
  ) {
    // Find jobs that match the developer's skills
    const skillRegex = skills.map((skill) => new RegExp(skill, 'i'));

    const recommendedJobs = await this.jobModel
      .find({
        status: JobStatus.PUBLISHED,
        $or: [
          { requiredSkills: { $in: skillRegex } },
          { preferredSkills: { $in: skillRegex } },
        ],
      })
      .sort({ createdAt: -1 })
      .limit(limit);

    // Filter out jobs the user has already applied to
    const appliedJobIds = await this.applicationModel
      .find({ applicantId: new Types.ObjectId(userId) })
      .distinct('jobId');

    return recommendedJobs.filter(
      (job) => !appliedJobIds.some((id) => id.equals(job._id as any)),
    );
  }

  private async getMonthlyStats(
    userId: string,
    role: 'recruiter' | 'developer',
  ): Promise<
    Array<{
      month: string;
      jobsCreated?: number;
      applicationsReceived?: number;
      applicationsSubmitted?: number;
    }>
  > {
    const months: Date[] = [];
    const currentDate = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1,
      );
      months.push(date);
    }

    const stats: Array<{
      month: string;
      jobsCreated?: number;
      applicationsReceived?: number;
      applicationsSubmitted?: number;
    }> = [];

    for (const month of months) {
      const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
      const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

      if (role === 'recruiter') {
        // Get jobs created in this month
        const jobsCreated = await this.jobModel.countDocuments({
          recruiterId: new Types.ObjectId(userId),
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        });

        // Get applications received in this month
        const recruiterJobs = await this.jobModel
          .find({ recruiterId: new Types.ObjectId(userId) })
          .distinct('_id');
        const applicationsReceived = await this.applicationModel.countDocuments(
          {
            jobId: { $in: recruiterJobs },
            createdAt: { $gte: startOfMonth, $lte: endOfMonth },
          },
        );

        stats.push({
          month: month.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          }),
          jobsCreated,
          applicationsReceived,
        });
      } else {
        // Get applications submitted in this month
        const applicationsSubmitted =
          await this.applicationModel.countDocuments({
            applicantId: new Types.ObjectId(userId),
            createdAt: { $gte: startOfMonth, $lte: endOfMonth },
          });

        stats.push({
          month: month.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          }),
          applicationsSubmitted,
        });
      }
    }

    return stats;
  }
}
