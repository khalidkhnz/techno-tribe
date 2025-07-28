"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Building2,
  MapPin,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";

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
  status: "active" | "inactive" | "pending" | "expired";
  viewCount: number;
  applicationCount: number;
  createdAt: string;
  recruiterId: {
    firstName: string;
    lastName: string;
    company: string;
  };
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, statusFilter, typeFilter]);

  const fetchJobs = async () => {
    try {
      // Simulate API call
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
          status: "active",
          viewCount: 245,
          applicationCount: 12,
          createdAt: "2024-01-15",
          recruiterId: {
            firstName: "Jane",
            lastName: "Smith",
            company: "TechCorp",
          },
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
          status: "active",
          viewCount: 189,
          applicationCount: 8,
          createdAt: "2024-01-12",
          recruiterId: {
            firstName: "Mike",
            lastName: "Johnson",
            company: "StartupXYZ",
          },
        },
        {
          _id: "3",
          jobTitle: "Full Stack Engineer",
          company: "BigTech Inc",
          location: "New York, NY",
          employmentType: "full-time",
          experienceLevel: "senior",
          minimumSalary: 150000,
          maximumSalary: 200000,
          currency: "USD",
          status: "pending",
          viewCount: 0,
          applicationCount: 0,
          createdAt: "2024-01-18",
          recruiterId: {
            firstName: "Sarah",
            lastName: "Wilson",
            company: "BigTech Inc",
          },
        },
        {
          _id: "4",
          jobTitle: "DevOps Engineer",
          company: "CloudCorp",
          location: "Austin, TX",
          employmentType: "full-time",
          experienceLevel: "lead",
          minimumSalary: 130000,
          maximumSalary: 170000,
          currency: "USD",
          status: "expired",
          viewCount: 156,
          applicationCount: 5,
          createdAt: "2024-01-05",
          recruiterId: {
            firstName: "David",
            lastName: "Brown",
            company: "CloudCorp",
          },
        },
        {
          _id: "5",
          jobTitle: "UI/UX Designer",
          company: "DesignStudio",
          location: "Los Angeles, CA",
          employmentType: "part-time",
          experienceLevel: "junior",
          minimumSalary: 60000,
          maximumSalary: 80000,
          currency: "USD",
          status: "inactive",
          viewCount: 89,
          applicationCount: 3,
          createdAt: "2024-01-10",
          recruiterId: {
            firstName: "Emily",
            lastName: "Davis",
            company: "DesignStudio",
          },
        },
      ];
      
      setJobs(mockJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        job =>
          job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.recruiterId.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.recruiterId.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(job => job.employmentType === typeFilter);
    }

    setFilteredJobs(filtered);
  };

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setJobs(prevJobs =>
        prevJobs.map(job =>
          job._id === jobId ? { ...job, status: newStatus as Job["status"] } : job
        )
      );
      
      toast.success(`Job status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating job status:", error);
      toast.error("Failed to update job status");
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "inactive":
        return <XCircle className="h-4 w-4 text-gray-500" />;
      case "expired":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEmploymentTypeLabel = (type: string) => {
    switch (type) {
      case "full-time":
        return "Full Time";
      case "part-time":
        return "Part Time";
      case "contract":
        return "Contract";
      case "freelance":
        return "Freelance";
      case "internship":
        return "Internship";
      default:
        return type;
    }
  };

  const getExperienceLevelLabel = (level: string) => {
    switch (level) {
      case "junior":
        return "Junior";
      case "mid-level":
        return "Mid Level";
      case "senior":
        return "Senior";
      case "lead":
        return "Lead";
      case "principal":
        return "Principal";
      default:
        return level;
    }
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
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Management</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage all job postings on the platform
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{jobs.length}</p>
                  <p className="text-sm text-muted-foreground">Total Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {jobs.filter(j => j.status === "active").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Active Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {jobs.filter(j => j.status === "pending").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {jobs.reduce((sum, job) => sum + job.applicationCount, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Jobs ({filteredJobs.length})</CardTitle>
            <CardDescription>
              Manage job postings and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Details</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type & Level</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Stats</TableHead>
                  <TableHead>Recruiter</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job._id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{job.jobTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          Posted {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="outline">
                          {getEmploymentTypeLabel(job.employmentType)}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          {getExperienceLevelLabel(job.experienceLevel)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {job.currency} {job.minimumSalary.toLocaleString()} - {job.maximumSalary.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(job.status)}
                        <Badge className={getStatusBadgeColor(job.status)}>
                          {job.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {job.viewCount}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {job.applicationCount}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">
                          {job.recruiterId.firstName} {job.recruiterId.lastName}
                        </p>
                        <p className="text-muted-foreground">
                          {job.recruiterId.company}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Job
                          </DropdownMenuItem>
                          {job.status === "pending" && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(job._id, "active")}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve Job
                            </DropdownMenuItem>
                          )}
                          {job.status === "active" && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(job._id, "inactive")}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Deactivate Job
                            </DropdownMenuItem>
                          )}
                          {job.status === "inactive" && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(job._id, "active")}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Activate Job
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDeleteJob(job._id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Job
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 