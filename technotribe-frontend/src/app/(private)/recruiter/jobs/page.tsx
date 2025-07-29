"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Link from "next/link";
import FRONTEND_ROUTES from "@/lib/fe-routes";
import { Plus } from "lucide-react";

interface Job {
  _id: string;
  jobTitle: string;
  company: string;
  employmentType: string;
  location: string;
  experienceLevel: string;
  minimumSalary: number;
  maximumSalary: number;
  currency: string;
  requiredSkills: string[];
  jobDescription: string;
  isUrgent: boolean;
  status: string;
  viewCount: number;
  applicationCount: number;
  createdAt: string;
  publishedAt?: string;
}

interface JobStats {
  totalJobs: number;
  publishedJobs: number;
  draftJobs: number;
  closedJobs: number;
  urgentJobs: number;
  totalViews: number;
  totalApplications: number;
}

export default function RecruiterJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<JobStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:5000/jobs/my-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        toast.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:5000/jobs/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handlePublishJob = async (jobId: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:5000/jobs/${jobId}/publish`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Job published successfully!");
        fetchJobs();
        fetchStats();
      } else {
        toast.error("Failed to publish job");
      }
    } catch (error) {
      console.error("Error publishing job:", error);
      toast.error("Failed to publish job");
    }
  };

  const handleCloseJob = async (jobId: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:5000/jobs/${jobId}/close`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Job closed successfully!");
        fetchJobs();
        fetchStats();
      } else {
        toast.error("Failed to close job");
      }
    } catch (error) {
      console.error("Error closing job:", error);
      toast.error("Failed to close job");
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`http://localhost:5000/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Job deleted successfully!");
        fetchJobs();
        fetchStats();
      } else {
        toast.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { variant: "secondary" as const, label: "Draft" },
      published: { variant: "default" as const, label: "Published" },
      closed: { variant: "destructive" as const, label: "Closed" },
      urgent: { variant: "default" as const, label: "Urgent" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
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

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "all") return true;
    if (activeTab === "draft") return job.status === "draft";
    if (activeTab === "published") return job.status === "published";
    if (activeTab === "closed") return job.status === "closed";
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Job Postings
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your job opportunities and track performance
            </p>
          </div>
          <Link href={FRONTEND_ROUTES.RECRUITER.JOBS.POST_JOB}>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Jobs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalJobs}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Published
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.publishedJobs}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.totalViews}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.totalApplications}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Job Postings</CardTitle>
            <CardDescription>
              Manage and track your job postings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Jobs</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="closed">Closed</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                {filteredJobs.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      No jobs found in this category
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Salary Range</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJobs.map((job) => (
                        <TableRow key={job._id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{job.jobTitle}</div>
                              <div className="text-sm text-gray-500">
                                {getExperienceLevelLabel(job.experienceLevel)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{job.company}</TableCell>
                          <TableCell>
                            {getEmploymentTypeLabel(job.employmentType)}
                          </TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>
                            {job.currency} {job.minimumSalary.toLocaleString()}{" "}
                            - {job.maximumSalary.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(job.status)}
                              {job.isUrgent && (
                                <Badge variant="destructive">Urgent</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{job.viewCount}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {job.status === "draft" && (
                                <Button
                                  size="sm"
                                  onClick={() => handlePublishJob(job._id)}
                                >
                                  Publish
                                </Button>
                              )}
                              {job.status === "published" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCloseJob(job._id)}
                                >
                                  Close
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(`/recruiter/jobs/${job._id}/applications`, '_blank')}
                              >
                                View Applications ({job.applicationCount})
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteJob(job._id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
