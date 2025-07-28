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

interface Application {
  id: string;
  jobId: {
    _id: string;
    jobTitle: string;
    company: string;
    location: string;
    employmentType: string;
    experienceLevel: string;
    minimumSalary: number;
    maximumSalary: number;
    currency: string;
  };
  recruiterId: {
    firstName: string;
    lastName: string;
    company: string;
  };
  status: string;
  appliedAt: string;
  reviewedAt?: string;
  interviewedAt?: string;
  offeredAt?: string;
  rejectedAt?: string;
  withdrawnAt?: string;
  isViewed: boolean;
  viewedAt?: string;
}

const statusConfig = {
  applied: { variant: "secondary" as const, label: "Applied", color: "text-gray-600" },
  reviewing: { variant: "default" as const, label: "Under Review", color: "text-blue-600" },
  interviewing: { variant: "default" as const, label: "Interviewing", color: "text-purple-600" },
  offered: { variant: "default" as const, label: "Offer Received", color: "text-green-600" },
  rejected: { variant: "destructive" as const, label: "Rejected", color: "text-red-600" },
  withdrawn: { variant: "outline" as const, label: "Withdrawn", color: "text-gray-500" },
};

export default function DeveloperApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:5000/applications/my-applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      } else {
        toast.error("Failed to fetch applications");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (applicationId: string) => {
    if (!confirm("Are you sure you want to withdraw this application?")) return;

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:5000/applications/${applicationId}/withdraw`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Application withdrawn successfully!");
        fetchApplications();
      } else {
        toast.error("Failed to withdraw application");
      }
    } catch (error) {
      console.error("Error withdrawing application:", error);
      toast.error("Failed to withdraw application");
    }
  };

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.applied;
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredApplications = applications.filter((application) => {
    if (activeTab === "all") return true;
    return application.status === activeTab;
  });

  const stats = {
    total: applications.length,
    applied: applications.filter((app) => app.status === "applied").length,
    reviewing: applications.filter((app) => app.status === "reviewing").length,
    interviewing: applications.filter((app) => app.status === "interviewing").length,
    offered: applications.filter((app) => app.status === "offered").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
    withdrawn: applications.filter((app) => app.status === "withdrawn").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600 mt-2">
            Track your job applications and their status
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Under Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.reviewing}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Interviewing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {stats.interviewing}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Offers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.offered}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
            <CardDescription>
              View and manage your job applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                <TabsTrigger value="applied">Applied ({stats.applied})</TabsTrigger>
                <TabsTrigger value="reviewing">Reviewing ({stats.reviewing})</TabsTrigger>
                <TabsTrigger value="interviewing">Interviewing ({stats.interviewing})</TabsTrigger>
                <TabsTrigger value="offered">Offers ({stats.offered})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
                <TabsTrigger value="withdrawn">Withdrawn ({stats.withdrawn})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      No applications found in this category
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Salary Range</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {application.jobId.jobTitle}
                              </div>
                              <div className="text-sm text-gray-500">
                                {getExperienceLevelLabel(application.jobId.experienceLevel)} •{" "}
                                {getEmploymentTypeLabel(application.jobId.employmentType)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {application.jobId.company}
                              </div>
                              <div className="text-sm text-gray-500">
                                {application.recruiterId.firstName} {application.recruiterId.lastName}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{application.jobId.location}</TableCell>
                          <TableCell>
                            {application.jobId.currency} {application.jobId.minimumSalary.toLocaleString()} -{" "}
                            {application.jobId.maximumSalary.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(application.status)}
                              {application.isViewed && (
                                <Badge variant="outline" className="text-xs">
                                  Viewed
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(application.appliedAt)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {application.status === "applied" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleWithdraw(application.id)}
                                >
                                  Withdraw
                                </Button>
                              )}
                              <Button size="sm" variant="outline">
                                View Details
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