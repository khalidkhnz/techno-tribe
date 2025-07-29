"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { toast } from "sonner";
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Eye, 
  Plus, 
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  BarChart3,
  Target,
  CheckCircle,
  AlertCircle,
  XCircle,
  Edit
} from "lucide-react";
import Link from "next/link";
import FRONTEND_ROUTES from "@/lib/fe-routes";

interface Job {
  _id: string;
  jobTitle: string;
  company: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  minimumSalary: number;
  maximumSalary: number;
  currency: string;
  status: string;
  applicationCount: number;
  createdAt: string;
}

interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  recentApplications: number;
  averageViews: number;
  successRate: number;
}

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    recentApplications: 0,
    averageViews: 0,
    successRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockJobs: Job[] = [
        {
          _id: "1",
          jobTitle: "Senior React Developer",
          company: "TechCorp",
          location: "San Francisco, CA",
          employmentType: "full-time",
          experienceLevel: "senior",
          minimumSalary: 120000,
          maximumSalary: 180000,
          currency: "USD",
          status: "published",
          applicationCount: 12,
          createdAt: "2024-01-15",
        },
        {
          _id: "2",
          jobTitle: "Frontend Developer",
          company: "StartupXYZ",
          location: "Remote",
          employmentType: "contract",
          experienceLevel: "mid-level",
          minimumSalary: 80000,
          maximumSalary: 120000,
          currency: "USD",
          status: "published",
          applicationCount: 8,
          createdAt: "2024-01-12",
        },
      ];
      
      setJobs(mockJobs);
      setStats({
        totalJobs: 2,
        activeJobs: 2,
        totalApplications: 20,
        recentApplications: 5,
        averageViews: 45,
        successRate: 85,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
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
              <div className="text-2xl font-bold">{stats.totalJobs}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeJobs} active jobs
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
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">
                {stats.recentApplications} this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Views
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageViews}</div>
              <p className="text-xs text-muted-foreground">
                per job posting
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Success Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.successRate}%</div>
              <p className="text-xs text-muted-foreground">
                applications to hires
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
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest applications and job updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.slice(0, 5).map((job) => (
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
                          <Badge variant="outline">{job.applicationCount} applications</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(job.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
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
                {jobs.length === 0 ? (
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
                          <TableHead>Type</TableHead>
                          <TableHead>Applications</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {jobs.map((job) => (
                          <TableRow key={job._id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{job.jobTitle}</div>
                                <div className="text-sm text-muted-foreground">
                                  {getExperienceLevelLabel(job.experienceLevel)}
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
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {getEmploymentTypeLabel(job.employmentType)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {job.applicationCount}
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(job.status)}</TableCell>
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
                  <CardTitle>Application Trends</CardTitle>
                  <CardDescription>
                    Track application growth over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                      <p>Analytics chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>
                    Key performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Average Time to Fill</span>
                      <span className="text-sm text-muted-foreground">15 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Quality Score</span>
                      <span className="text-sm text-muted-foreground">8.5/10</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Response Rate</span>
                      <span className="text-sm text-muted-foreground">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Hire Rate</span>
                      <span className="text-sm text-muted-foreground">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
} 