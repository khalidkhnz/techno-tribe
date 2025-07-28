"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  Eye, 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award,
  Link as LinkIcon,
  Calendar,
  Building
} from "lucide-react";

interface Application {
  id: string;
  applicantId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    skills: string[];
    experienceLevel?: string;
    currentCompany?: string;
    currentPosition?: string;
    customUrl?: string;
    bio?: string;
    location?: string;
    website?: string;
    yearsOfExperience?: number;
    education: string[];
    certifications: string[];
    portfolioLinks: string[];
    socialLinks: string[];
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
  requiredSkills: string[];
  jobDescription: string;
}

const statusOptions = [
  { value: "applied", label: "Applied" },
  { value: "reviewing", label: "Under Review" },
  { value: "interviewing", label: "Interviewing" },
  { value: "offered", label: "Offer Received" },
  { value: "rejected", label: "Rejected" },
  { value: "withdrawn", label: "Withdrawn" },
];

export default function JobApplicationsPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  const [applications, setApplications] = useState<Application[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    if (jobId) {
      fetchApplications();
      fetchJob();
    }
  }, [jobId]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`http://localhost:5000/applications/job/${jobId}`, {
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

  const fetchJob = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`http://localhost:5000/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setJob(data);
      }
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  };

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:5000/applications/${applicationId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        toast.success("Application status updated successfully!");
        fetchApplications();
      } else {
        toast.error("Failed to update application status");
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      toast.error("Failed to update application status");
    }
  };

  const handleMarkAsViewed = async (applicationId: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:5000/applications/${applicationId}/view`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchApplications();
      }
    } catch (error) {
      console.error("Error marking as viewed:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      applied: { variant: "secondary" as const, label: "Applied" },
      reviewing: { variant: "default" as const, label: "Under Review" },
      interviewing: { variant: "default" as const, label: "Interviewing" },
      offered: { variant: "default" as const, label: "Offer Received" },
      rejected: { variant: "destructive" as const, label: "Rejected" },
      withdrawn: { variant: "outline" as const, label: "Withdrawn" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.applied;
    return <Badge variant={config.variant}>{config.label}</Badge>;
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

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
          {job && (
            <div className="mt-2">
              <p className="text-lg text-gray-600">{job.jobTitle}</p>
              <p className="text-gray-500">{job.company} • {job.location}</p>
            </div>
          )}
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

        {/* Applications List */}
        <div className="space-y-4">
          {applications.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500">No applications received yet</p>
              </CardContent>
            </Card>
          ) : (
            applications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={application.applicantId.avatar} />
                      <AvatarFallback className="text-lg">
                        {getInitials(application.applicantId.firstName, application.applicantId.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {application.applicantId.firstName} {application.applicantId.lastName}
                          </h3>
                          <p className="text-gray-600">{application.applicantId.email}</p>
                          {application.applicantId.currentPosition && application.applicantId.currentCompany && (
                            <p className="text-gray-500">
                              {application.applicantId.currentPosition} at {application.applicantId.currentCompany}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getStatusBadge(application.status)}
                          {!application.isViewed && (
                            <Badge variant="outline" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {application.applicantId.location && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{application.applicantId.location}</span>
                          </div>
                        )}
                        {application.applicantId.experienceLevel && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Briefcase className="w-4 h-4" />
                            <span>{getExperienceLevelLabel(application.applicantId.experienceLevel)}</span>
                          </div>
                        )}
                        {application.applicantId.yearsOfExperience && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{application.applicantId.yearsOfExperience} years experience</span>
                          </div>
                        )}
                      </div>

                      {application.applicantId.skills && application.applicantId.skills.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {application.applicantId.skills.slice(0, 8).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {application.applicantId.skills.length > 8 && (
                              <Badge variant="outline" className="text-xs">
                                +{application.applicantId.skills.length - 8} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Applied on {formatDate(application.appliedAt)}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedApplication(application);
                                  if (!application.isViewed) {
                                    handleMarkAsViewed(application.id);
                                  }
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Profile
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>
                                  {application.applicantId.firstName} {application.applicantId.lastName}
                                </DialogTitle>
                                <DialogDescription>
                                  Full profile and application details
                                </DialogDescription>
                              </DialogHeader>
                              
                              {selectedApplication && (
                                <div className="space-y-6">
                                  {/* Basic Info */}
                                  <div className="flex items-start gap-4">
                                    <Avatar className="w-20 h-20">
                                      <AvatarImage src={selectedApplication.applicantId.avatar} />
                                      <AvatarFallback className="text-xl">
                                        {getInitials(selectedApplication.applicantId.firstName, selectedApplication.applicantId.lastName)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <h3 className="text-xl font-semibold">
                                        {selectedApplication.applicantId.firstName} {selectedApplication.applicantId.lastName}
                                      </h3>
                                      <p className="text-gray-600">{selectedApplication.applicantId.email}</p>
                                      {selectedApplication.applicantId.currentPosition && selectedApplication.applicantId.currentCompany && (
                                        <p className="text-gray-500">
                                          {selectedApplication.applicantId.currentPosition} at {selectedApplication.applicantId.currentCompany}
                                        </p>
                                      )}
                                      {selectedApplication.applicantId.location && (
                                        <p className="text-gray-500 flex items-center gap-1">
                                          <MapPin className="w-4 h-4" />
                                          {selectedApplication.applicantId.location}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Bio */}
                                  {selectedApplication.applicantId.bio && (
                                    <div>
                                      <h4 className="font-semibold mb-2">About</h4>
                                      <p className="text-gray-700">{selectedApplication.applicantId.bio}</p>
                                    </div>
                                  )}

                                  {/* Skills */}
                                  {selectedApplication.applicantId.skills && selectedApplication.applicantId.skills.length > 0 && (
                                    <div>
                                      <h4 className="font-semibold mb-2">Skills</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {selectedApplication.applicantId.skills.map((skill) => (
                                          <Badge key={skill} variant="secondary">
                                            {skill}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Education */}
                                  {selectedApplication.applicantId.education && selectedApplication.applicantId.education.length > 0 && (
                                    <div>
                                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4" />
                                        Education
                                      </h4>
                                      <div className="space-y-2">
                                        {selectedApplication.applicantId.education.map((edu, index) => (
                                          <p key={index} className="text-gray-700">{edu}</p>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Certifications */}
                                  {selectedApplication.applicantId.certifications && selectedApplication.applicantId.certifications.length > 0 && (
                                    <div>
                                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                                        <Award className="w-4 h-4" />
                                        Certifications
                                      </h4>
                                      <div className="space-y-2">
                                        {selectedApplication.applicantId.certifications.map((cert, index) => (
                                          <p key={index} className="text-gray-700">{cert}</p>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Portfolio Links */}
                                  {selectedApplication.applicantId.portfolioLinks && selectedApplication.applicantId.portfolioLinks.length > 0 && (
                                    <div>
                                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                                        <LinkIcon className="w-4 h-4" />
                                        Portfolio & Projects
                                      </h4>
                                      <div className="space-y-2">
                                        {selectedApplication.applicantId.portfolioLinks.map((link, index) => (
                                          <a
                                            key={index}
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2"
                                          >
                                            <LinkIcon className="w-4 h-4" />
                                            {link}
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Application Status */}
                                  <div>
                                    <h4 className="font-semibold mb-2">Application Status</h4>
                                    <div className="flex items-center gap-4">
                                      <Select
                                        value={selectedApplication.status}
                                        onValueChange={(value) => handleStatusUpdate(selectedApplication.id, value)}
                                      >
                                        <SelectTrigger className="w-48">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {statusOptions.map((status) => (
                                            <SelectItem key={status.value} value={status.value}>
                                              {status.label}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      {selectedApplication.applicantId.customUrl && (
                                        <Button variant="outline" size="sm" asChild>
                                          <a 
                                            href={`/profile/${selectedApplication.applicantId.customUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            View Public Profile
                                          </a>
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Select
                            value={application.status}
                            onValueChange={(value) => handleStatusUpdate(application.id, value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 