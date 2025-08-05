"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useDeveloperDashboard } from "@/hooks/use-api";
import { DeveloperDashboard as DeveloperDashboardType } from "@/types/dashboard";
import { ApplicationStatus } from "@/types/enums";
import { 
  Briefcase, 
  Calendar, 
  FileText, 
  Eye, 
  User, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle,
  MapPin,
  Building2,
  Zap,
  Target,
  PlayCircle,
  Award,
  RotateCcw
} from "lucide-react";
import Link from "next/link";
import FRONTEND_ROUTES from "@/lib/fe-routes";

export default function DashboardPage() {
  const { data: dashboardData, isLoading, error } = useDeveloperDashboard();
  const dashboard = dashboardData?.data as DeveloperDashboardType;

  const getStatusBadge = (status: ApplicationStatus) => {
    const statusConfig = {
      [ApplicationStatus.APPLIED]: { variant: "secondary" as const, label: "Applied", icon: FileText },
      [ApplicationStatus.REVIEWING]: { variant: "default" as const, label: "Reviewing", icon: AlertCircle },
      [ApplicationStatus.INTERVIEWING]: { variant: "default" as const, label: "Interviewing", icon: PlayCircle },
      [ApplicationStatus.OFFERED]: { variant: "default" as const, label: "Offered", icon: Award },
      [ApplicationStatus.REJECTED]: { variant: "destructive" as const, label: "Rejected", icon: XCircle },
      [ApplicationStatus.WITHDRAWN]: { variant: "outline" as const, label: "Withdrawn", icon: RotateCcw },
    };
    
    const config = statusConfig[status] || statusConfig[ApplicationStatus.APPLIED];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
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
      <div className="w-full space-y-6 bg-background">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>
          <Skeleton className="h-6 w-20" />
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
      <div className="w-full space-y-6 bg-background">
        {/* Welcome Section */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h1
              className="text-3xl font-bold text-primary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome back, Developer!
            </motion.h1>
            <motion.p
              className="text-muted-foreground mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Here&apos;s what&apos;s happening with your account today.
            </motion.p>
          </div>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Badge variant="secondary">Developer</Badge>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Applications
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboard.overview.totalApplications}</div>
                <p className="text-xs text-muted-foreground">
                  {dashboard.overview.appliedApplications} applied
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Success Rate
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboard.overview.successRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {dashboard.overview.offeredApplications} offered
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Skills
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboard.profile.skills?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {dashboard.profile.experienceLevel || 'No level set'}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 flex flex-col">
              <Link href={FRONTEND_ROUTES.JOBS}>
                <Button className="w-full justify-start">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Browse Jobs
                </Button>
              </Link>
              <Link href={FRONTEND_ROUTES.DEVELOPER.APPLICATIONS}>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  My Applications
                </Button>
              </Link>
              <Link href={FRONTEND_ROUTES.DEVELOPER.PROFILE}>
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Your latest job applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dashboard.recentApplications.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                  <p className="text-muted-foreground">Start applying to jobs to see your applications here</p>
                </div>
              ) : (
                dashboard.recentApplications.slice(0, 3).map((application) => (
                  <div key={application._id} className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${
                      application.status === ApplicationStatus.OFFERED ? 'bg-accent' :
                      application.status === ApplicationStatus.REJECTED ? 'bg-destructive' :
                      application.status === ApplicationStatus.REVIEWING || application.status === ApplicationStatus.INTERVIEWING ? 'bg-primary' :
                      'bg-secondary'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {application.jobId.jobTitle}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {application.jobId.company} • {formatDate(application.createdAt)}
                      </p>
                    </div>
                    {getStatusBadge(application.status)}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recommended Jobs */}
        {dashboard.recommendedJobs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recommended Jobs</CardTitle>
              <CardDescription>Jobs that match your skills and experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboard.recommendedJobs.slice(0, 6).map((job) => (
                  <div key={job._id} className="p-4 border rounded-lg hover:border-primary/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground">{job.jobTitle}</h4>
                      <Badge variant="outline" className="text-xs">
                        {job.employmentType}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {job.requiredSkills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {job.minimumSalary} - {job.maximumSalary} {job.currency}
                      </span>
                      <Button variant="outline" size="sm">
                        <Target className="mr-2 h-3 w-3" />
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
  );
}
