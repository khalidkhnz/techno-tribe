import { ApplicationStatus } from './enums';

export interface MonthlyStats {
  month: string;
  jobsCreated?: number;
  applicationsReceived?: number;
  applicationsSubmitted?: number;
}

export interface RecruiterDashboardOverview {
  totalJobs: number;
  publishedJobs: number;
  draftJobs: number;
  closedJobs: number;
  totalApplications: number;
  appliedApplications: number;
  reviewingApplications: number;
  interviewingApplications: number;
  offeredApplications: number;
  rejectedApplications: number;
  withdrawnApplications: number;
  averageApplicationsPerJob: number;
}

export interface DeveloperDashboardOverview {
  totalApplications: number;
  appliedApplications: number;
  reviewingApplications: number;
  interviewingApplications: number;
  offeredApplications: number;
  rejectedApplications: number;
  withdrawnApplications: number;
  successRate: number;
}

export interface DashboardProfile {
  profileViews: number;
  isProfileComplete: boolean;
  skills?: string[];
  experienceLevel?: string;
  yearsOfExperience?: number;
}

export interface RecentApplication {
  _id: string;
  jobId: {
    _id: string;
    jobTitle: string;
    company?: string;
    location?: string;
    employmentType?: string;
    experienceLevel?: string;
    minimumSalary?: number;
    maximumSalary?: number;
    currency?: string;
    status?: string;
  };
  applicantId?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string;
  };
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RecentJob {
  _id: string;
  jobTitle: string;
  company: string;
  location: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecommendedJob {
  _id: string;
  jobTitle: string;
  company: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  minimumSalary: number;
  maximumSalary: number;
  currency: string;
  requiredSkills: string[];
  preferredSkills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RecruiterDashboard {
  overview: RecruiterDashboardOverview;
  recentApplications: RecentApplication[];
  recentJobs: RecentJob[];
  monthlyStats: MonthlyStats[];
  profile: DashboardProfile;
}

export interface DeveloperDashboard {
  overview: DeveloperDashboardOverview;
  recentApplications: RecentApplication[];
  recommendedJobs: RecommendedJob[];
  monthlyStats: MonthlyStats[];
  profile: DashboardProfile;
}

export type DashboardData = RecruiterDashboard | DeveloperDashboard; 