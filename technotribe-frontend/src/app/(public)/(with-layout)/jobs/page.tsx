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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
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
  };
}

const employmentTypes = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
];

const experienceLevels = [
  { value: "junior", label: "Junior" },
  { value: "mid-level", label: "Mid Level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "principal", label: "Principal" },
];

const availableSkills = [
  "React",
  "Vue.js",
  "Angular",
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "Go",
  "Node.js",
  "Express",
  "Django",
  "Spring",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "REST API",
  "Microservices",
  "Machine Learning",
  "AI",
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    employmentType: "" as string | undefined,
    experienceLevel: "" as string | undefined,
    skills: [] as string[],
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      const params: Record<string, unknown> = {};
      if (filters.employmentType && filters.employmentType !== "")
        params.employmentType = filters.employmentType;
      if (filters.experienceLevel && filters.experienceLevel !== "")
        params.experienceLevel = filters.experienceLevel;
      if (filters.skills.length > 0) {
        params.skills = filters.skills;
      }

      const response = await api.jobs.getAll(params);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleSkillToggle = (skill: string) => {
    setFilters((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
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
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return (
        job.jobTitle.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.location.toLowerCase().includes(searchTerm) ||
        job.requiredSkills.some((skill) =>
          skill.toLowerCase().includes(searchTerm)
        )
      );
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="h-96 bg-muted rounded"></div>
              <div className="md:col-span-2 space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Find Your Next Opportunity
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover amazing job opportunities from top companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Refine your job search</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Search
                  </label>
                  <Input
                    placeholder="Job title, company, location..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Employment Type
                  </label>
                  <Select
                    value={filters.employmentType}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, employmentType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      {employmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Experience Level
                  </label>
                  <Select
                    value={filters.experienceLevel}
                    onValueChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        experienceLevel: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Skills
                  </label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {availableSkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={filters.skills.includes(skill)}
                          onCheckedChange={() => handleSkillToggle(skill)}
                        />
                        <label
                          htmlFor={skill}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() =>
                    setFilters({
                      search: "",
                      employmentType: undefined,
                      experienceLevel: undefined,
                      skills: [],
                    })
                  }
                  variant="outline"
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Jobs List */}
          <div className="md:col-span-2 space-y-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="animate-pulse">
                        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                        <div className="h-3 bg-muted rounded w-full mb-2"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">
                    No jobs found matching your criteria. Try adjusting your
                    filters.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredJobs.map((job) => (
                <Card key={job._id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">
                            {job.jobTitle}
                          </h3>
                          {job.isUrgent && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-2">
                          {job.company} • {job.location}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{getEmploymentTypeLabel(job.employmentType)}</span>
                          <span>•</span>
                          <span>{getExperienceLevelLabel(job.experienceLevel)}</span>
                          <span>•</span>
                          <span>
                            {job.currency} {job.minimumSalary.toLocaleString()} - {job.maximumSalary.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Link href={FRONTEND_ROUTES.JOB_DETAIL(job._id)}>
                        <Button variant="outline" className="ml-4">
                          View Details
                        </Button>
                      </Link>
                    </div>

                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {job.jobDescription}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.slice(0, 5).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.requiredSkills.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.requiredSkills.length - 5} more
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
      </div>
  );
}
