"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Eye, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Linkedin
} from "lucide-react";
import Link from "next/link";
import FRONTEND_ROUTES from "@/lib/fe-routes";
import { api } from "@/lib/api";

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
  recruiterId: {
    firstName: string;
    lastName: string;
    company: string;
    email?: string;
    customUrl?: string;
    jobTitle?: string;
    phone?: string;
    linkedin?: string;
    companyDescription?: string;
    companyWebsite?: string;
  };
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (jobId) {
      fetchJob();
      checkApplicationStatus();
    }
  }, [jobId]);

  const fetchJob = async () => {
    try {
      const response = await api.jobs.getById(jobId);
      setJob(response.data);
    } catch (error: any) {
      console.error("Error fetching job:", error);
      if (error.response?.status === 404) {
        toast.error("Job not found");
        router.push(FRONTEND_ROUTES.JOBS);
      } else {
        toast.error("Failed to fetch job details");
      }
    } finally {
      setLoading(false);
    }
  };

  const checkApplicationStatus = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const response = await api.applications.getMyApplications();
      const applications = response.data;
      const hasAppliedToThisJob = applications.some((app: any) => app.jobId === jobId);
      setHasApplied(hasAppliedToThisJob);
    } catch (error) {
      console.error("Error checking application status:", error);
    }
  };

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Please login to apply for this job");
        router.push(FRONTEND_ROUTES.LOGIN);
        return;
      }

      setApplying(true);
      await api.applications.apply({ jobId });
      toast.success("Application submitted successfully!");
      setHasApplied(true);
      // Refresh job data to update application count
      fetchJob();
    } catch (error: any) {
      console.error("Error applying for job:", error);
      toast.error(error.response?.data?.message || "Failed to apply for job");
    } finally {
      setApplying(false);
    }
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
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="space-y-6">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Link href={FRONTEND_ROUTES.JOBS}>
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href={FRONTEND_ROUTES.JOBS}>
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{job.jobTitle}</h1>
                {job.isUrgent && (
                  <Badge variant="destructive">Urgent</Badge>
                )}
              </div>
              <p className="text-xl text-muted-foreground mb-2">{job.company}</p>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{getEmploymentTypeLabel(job.employmentType)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{getExperienceLevelLabel(job.experienceLevel)}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-accent mb-1">
                {job.currency} {job.minimumSalary.toLocaleString()} - {job.maximumSalary.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Annual Salary</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-foreground whitespace-pre-wrap">{job.jobDescription}</p>
                </div>
              </CardContent>
            </Card>

                         {/* Required Skills */}
             <Card>
               <CardHeader>
                 <CardTitle>Required Skills</CardTitle>
                 <CardDescription>
                   Skills and technologies needed for this position
                 </CardDescription>
               </CardHeader>
               <CardContent>
                 <div className="flex flex-wrap gap-2">
                   {job.requiredSkills.map((skill) => (
                     <Badge key={skill} variant="secondary" className="text-sm">
                       {skill}
                     </Badge>
                   ))}
                 </div>
               </CardContent>
             </Card>

             {/* Job Status */}
             <Card>
               <CardHeader>
                 <CardTitle>Job Status</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="flex items-center gap-2">
                   <div className={`w-3 h-3 rounded-full ${
                     job.status === 'published' ? 'bg-green-500' : 
                     job.status === 'closed' ? 'bg-red-500' : 'bg-yellow-500'
                   }`}></div>
                   <span className="capitalize font-medium">
                     {job.status === 'published' ? 'Active' : 
                      job.status === 'closed' ? 'Closed' : 'Draft'}
                   </span>
                   {job.isUrgent && (
                     <Badge variant="destructive" className="ml-2">Urgent Hire</Badge>
                   )}
                 </div>
               </CardContent>
             </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Button */}
            <Card>
              <CardContent className="p-6">
                {hasApplied ? (
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h3 className="font-semibold text-accent mb-2">Application Submitted</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You've already applied for this position. We'll review your application and get back to you soon.
                    </p>
                    <Button variant="outline" className="w-full" disabled>
                      Applied
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground mb-4">Interested in this position?</h3>
                    <Button 
                      onClick={handleApply} 
                      disabled={applying}
                      className="w-full"
                      size="lg"
                    >
                      {applying ? "Applying..." : "Apply Now"}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      One click application - no resume upload required
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Job Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Job Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Views</span>
                  </div>
                  <span className="font-semibold">{job.viewCount}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Applications</span>
                  </div>
                  <span className="font-semibold">{job.applicationCount}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-secondary" />
                    <span className="text-sm text-muted-foreground">Posted</span>
                  </div>
                  <span className="font-semibold">{formatDate(job.createdAt)}</span>
                </div>
              </CardContent>
            </Card>

                         {/* Recruiter Info */}
             <Card>
               <CardHeader>
                 <CardTitle>About the Recruiter</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-lg">
                     {job.recruiterId.firstName.charAt(0)}{job.recruiterId.lastName.charAt(0)}
                   </div>
                   <div className="flex-1">
                     <p className="font-semibold text-foreground">
                       {job.recruiterId.firstName} {job.recruiterId.lastName}
                     </p>
                     <p className="text-sm text-muted-foreground">Recruiter</p>
                     <p className="text-sm text-muted-foreground">{job.company}</p>
                   </div>
                 </div>
                 
                 <div className="pt-3 border-t space-y-3">
                   {job.recruiterId.jobTitle && (
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                       <Clock className="h-4 w-4" />
                       <span>{job.recruiterId.jobTitle}</span>
                     </div>
                   )}
                   
                   {job.recruiterId.linkedin && (
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                       <Linkedin className="h-4 w-4 text-primary" />
                       <a 
                         href={job.recruiterId.linkedin} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-primary hover:text-primary/80 hover:underline"
                       >
                         View LinkedIn Profile
                       </a>
                     </div>
                   )}
                   
                   <Link href={FRONTEND_ROUTES.PROFILE_CUSTOM_URL(job.recruiterId.customUrl || job.recruiterId.firstName.toLowerCase() + '-' + job.recruiterId.lastName.toLowerCase())}>
                     <Button variant="outline" className="w-full">
                       <Users className="h-4 w-4 mr-2" />
                       View Recruiter Profile
                     </Button>
                   </Link>
                 </div>
               </CardContent>
             </Card>

             {/* Contact Information */}
             {(job.recruiterId.email || job.recruiterId.phone) && (
               <Card>
                 <CardHeader>
                   <CardTitle>Contact Information</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-2">
                   {job.recruiterId.email && (
                     <div className="flex items-center gap-2 text-sm">
                       <span className="font-medium">Email:</span>
                       <a 
                         href={`mailto:${job.recruiterId.email}`}
                         className="text-primary hover:text-primary/80 hover:underline"
                       >
                         {job.recruiterId.email}
                       </a>
                     </div>
                   )}
                   {job.recruiterId.phone && (
                     <div className="flex items-center gap-2 text-sm">
                       <span className="font-medium">Phone:</span>
                       <a 
                         href={`tel:${job.recruiterId.phone}`}
                         className="text-primary hover:text-primary/80 hover:underline"
                       >
                         {job.recruiterId.phone}
                       </a>
                     </div>
                   )}
                 </CardContent>
               </Card>
             )}

             {/* Company Info */}
             <Card>
               <CardHeader>
                 <CardTitle>About the Company</CardTitle>
               </CardHeader>
               <CardContent className="space-y-3">
                 <div className="flex items-center gap-3">
                   <Building2 className="h-5 w-5 text-muted-foreground" />
                   <div>
                     <p className="font-medium">{job.company}</p>
                     <p className="text-sm text-muted-foreground">
                       Posted by {job.recruiterId.firstName} {job.recruiterId.lastName}
                     </p>
                   </div>
                 </div>
                 
                 {job.recruiterId.companyDescription && (
                   <div className="pt-2 border-t">
                     <p className="text-sm text-muted-foreground leading-relaxed">
                       {job.recruiterId.companyDescription}
                     </p>
                   </div>
                 )}
                 
                 {job.recruiterId.companyWebsite && (
                   <div className="pt-2">
                     <a 
                       href={job.recruiterId.companyWebsite} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-sm text-primary hover:text-primary/80 hover:underline flex items-center gap-1"
                     >
                       <Building2 className="h-3 w-3" />
                       Visit Company Website
                     </a>
                   </div>
                 )}
               </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 