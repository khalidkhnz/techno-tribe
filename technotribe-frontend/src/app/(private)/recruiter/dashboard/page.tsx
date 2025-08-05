"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecruiterDashboard } from "@/hooks/use-api";
import { RecruiterDashboard as RecruiterDashboardType } from "@/types/dashboard";

import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Eye, 
  MapPin,
  Clock,
  Building2,
  BarChart3,
  CheckCircle,
  AlertCircle,
  XCircle,
  Edit,
  Calendar,
  FileText,
  UserCheck,
  UserX,
  PlayCircle,
  Award,
  RotateCcw
} from "lucide-react";

export default function RecruiterDashboard() {
  const { data: dashboardData, isLoading, error } = useRecruiterDashboard();
  const [activeTab, setActiveTab] = useState("overview");

  const dashboard = dashboardData?.data as RecruiterDashboardType;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { variant: "default" as const, label: "Active", icon: CheckCircle },
      draft: { variant: "secondary" as const, label: "Draft", icon: AlertCircle },
      closed: { variant: "destructive" as const, label: "Closed", icon: XCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getApplicationStatusBadge = (status: string) => {
    // Simplified status handling since we only have 'applied' status
    const statusConfig = {
      applied: { variant: "secondary" as const, label: "Applied", icon: FileText },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.applied;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getEmploymentTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      "full-time": "Full Time",
      "part-time": "Part Time",
      contract: "Contract",
      freelance: "Freelance",
      internship: "Internship",
    };
    return typeMap[type] || type;
  };

  const getExperienceLevelLabel = (level: string) => {
    const levelMap: Record<string, string> = {
      junior: "Junior",
      "mid-level": "Mid Level",
      senior: "Senior",
      lead: "Lead",
      principal: "Principal",
    };
    return levelMap[level] || level;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Failed to load dashboard</h3>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Recruiter Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your job postings and track applications
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Jobs
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard.overview.totalJobs}</div>
              <p className="text-xs text-muted-foreground">
                {dashboard.overview.publishedJobs} published jobs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Applications
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard.overview.totalApplications}</div>
              <p className="text-xs text-muted-foreground">
                {dashboard.overview.appliedApplications} applied
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Offered Applications
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard.overview.offeredApplications}</div>
              <p className="text-xs text-muted-foreground">
                {dashboard.overview.averageApplicationsPerJob} avg per job
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Profile Views
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard.profile.profileViews}</div>
              <p className="text-xs text-muted-foreground">
                {dashboard.profile.isProfileComplete ? 'Profile complete' : 'Profile incomplete'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">My Jobs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>
                  Latest applications for your job postings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboard.recentApplications.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                      <p className="text-muted-foreground">Applications will appear here once candidates apply to your jobs</p>
                    </div>
                  ) : (
                    dashboard.recentApplications.map((application) => (
                      <div key={application._id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={application.applicantId?.profileImage} />
                            <AvatarFallback>
                              {application.applicantId ? 
                                `${application.applicantId.firstName.charAt(0)}${application.applicantId.lastName.charAt(0)}` : 
                                <UserCheck className="h-4 w-4" />
                              }
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">
                              {application.applicantId ? 
                                `${application.applicantId.firstName} ${application.applicantId.lastName}` : 
                                'Unknown Applicant'
                              }
                            </h4>
                            <p className="text-sm text-muted-foreground">{application.jobId.jobTitle}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            {getApplicationStatusBadge(application.status)}
                            <Badge variant="outline">{application.jobId.company}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(application.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Jobs</CardTitle>
                <CardDescription>
                  Your latest job postings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboard.recentJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No jobs posted yet</h3>
                      <p className="text-muted-foreground">Create your first job posting to get started</p>
                    </div>
                  ) : (
                    dashboard.recentJobs.map((job) => (
                      <div key={job._id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              <Building2 className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{job.jobTitle}</h4>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(job.status)}
                            <Badge variant="outline">{job.location}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(job.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Job Postings</CardTitle>
                <CardDescription>
                  Manage and track your job postings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dashboard.recentJobs.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No jobs posted yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start by creating your first job posting
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Job Title</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboard.recentJobs.map((job) => (
                          <TableRow key={job._id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{job.jobTitle}</div>
                                <div className="text-sm text-muted-foreground">
                                  {job.company}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{job.company}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {job.location}
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(job.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(job.createdAt)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled>
                                  <Users className="mr-2 h-4 w-4" />
                                  View Applications
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Job
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Statistics</CardTitle>
                  <CardDescription>
                    Jobs created and applications received over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboard.monthlyStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <span className="text-sm font-medium">{stat.month}</span>
                        </div>
                        <div className="flex gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{stat.jobsCreated || 0}</div>
                            <div className="text-xs text-muted-foreground">Jobs</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{stat.applicationsReceived || 0}</div>
                            <div className="text-xs text-muted-foreground">Applications</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Status Breakdown</CardTitle>
                  <CardDescription>
                    Current application status distribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <span className="text-sm font-medium">Applied</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{dashboard.overview.appliedApplications}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">Reviewing</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{dashboard.overview.reviewingApplications}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm font-medium">Interviewing</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{dashboard.overview.interviewingApplications}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Offered</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{dashboard.overview.offeredApplications}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium">Rejected</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{dashboard.overview.rejectedApplications}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium">Withdrawn</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{dashboard.overview.withdrawnApplications}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
} 