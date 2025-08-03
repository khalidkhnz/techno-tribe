"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { jobSchema, type JobFormData } from "@/lib/schemas";
import { api } from "@/lib/api";
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  FileText, 
  Plus, 
  X,
  Save,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import FRONTEND_ROUTES from "@/lib/fe-routes";
import Constants from "@/lib/constants";



export default function CreateJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      currency: "USD",
      requiredSkills: [],
      isUrgent: false,
    },
    mode: "onChange",
  });

  const watchedSkills = watch("requiredSkills") || [];
  const watchedIsUrgent = watch("isUrgent") || false;

  const handleSkillToggle = (skill: string) => {
    const currentSkills = watchedSkills;
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    
    setValue("requiredSkills", newSkills);
  };

  const handleUrgentToggle = (checked: boolean) => {
    setValue("isUrgent", checked);
  };

  const onSubmit = async (data: JobFormData) => {
    setIsSubmitting(true);
    try {
      await api.jobs.create(data);
      toast.success("Job posted successfully! Redirecting to jobs page...");
      router.push(FRONTEND_ROUTES.RECRUITER.JOBS.BASE);
    } catch (error: any) {
      console.error("Error creating job:", error);
      let errorMessage = "Failed to create job";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 401) {
        errorMessage = "Please log in again to create a job";
      } else if (error.response?.status === 403) {
        errorMessage = "You don't have permission to create jobs";
      } else if (error.response?.status === 400) {
        errorMessage = "Please check your input and try again";
      } else if (error.response?.status >= 500) {
        errorMessage = "Server error. Please try again later";
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href={FRONTEND_ROUTES.RECRUITER.DASHBOARD}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
            <p className="text-gray-600 mt-2">
              Create a compelling job posting to attract top talent
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Form-level error display */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-red-800 mb-2">
                Please fix the following errors:
              </h3>
              <ul className="text-sm text-red-700 space-y-1">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>
                    • {error?.message || `${field} is required`}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Basic Job Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Basic Job Information
              </CardTitle>
              <CardDescription>
                Essential details about the position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Senior Frontend Developer"
                  {...register("jobTitle")}
                />
                {errors.jobTitle && (
                  <p className="text-sm text-red-500">{errors.jobTitle.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  placeholder="e.g., TechCorp Inc."
                  {...register("company")}
                />
                {errors.company && (
                  <p className="text-sm text-red-500">{errors.company.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type *</Label>
                  <Select
                    value={watch("employmentType")}
                    onValueChange={(value) => setValue("employmentType", value as "full-time" | "part-time" | "contract" | "freelance" | "internship")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Constants.employmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.employmentType && (
                    <p className="text-sm text-red-500">{errors.employmentType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level *</Label>
                  <Select
                    value={watch("experienceLevel")}
                    onValueChange={(value) => setValue("experienceLevel", value as "junior" | "mid-level" | "senior" | "lead" | "principal")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {Constants.experienceLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.experienceLevel && (
                    <p className="text-sm text-red-500">{errors.experienceLevel.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="e.g., San Francisco, CA or Remote"
                    className="pl-10"
                    {...register("location")}
                  />
                </div>
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Salary Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Salary Information
              </CardTitle>
              <CardDescription>
                Compensation details for the position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minimumSalary">Minimum Salary *</Label>
                  <Input
                    id="minimumSalary"
                    type="number"
                    min="0"
                    placeholder="50000"
                    {...register("minimumSalary", { valueAsNumber: true })}
                  />
                  {errors.minimumSalary && (
                    <p className="text-sm text-red-500">{errors.minimumSalary.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maximumSalary">Maximum Salary *</Label>
                  <Input
                    id="maximumSalary"
                    type="number"
                    min="0"
                    placeholder="80000"
                    {...register("maximumSalary", { valueAsNumber: true })}
                  />
                  {errors.maximumSalary && (
                    <p className="text-sm text-red-500">{errors.maximumSalary.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency *</Label>
                  <Select
                    value={watch("currency")}
                    onValueChange={(value) => setValue("currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Constants.currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.currency && (
                    <p className="text-sm text-red-500">{errors.currency.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Required Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Required Skills
              </CardTitle>
              <CardDescription>
                Select the skills and technologies required for this position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Skills *</Label>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto border rounded-lg p-4">
                  {Constants.availableSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={watchedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                {watchedSkills.length === 0 && (
                  <p className="text-sm text-red-500">Please select at least one skill</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Selected: {watchedSkills.length} skills
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Job Description
              </CardTitle>
              <CardDescription>
                Detailed description of the role and responsibilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobDescription">Description *</Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Describe the role, responsibilities, requirements, and what makes this position exciting..."
                  {...register("jobDescription")}
                  rows={8}
                />
                {errors.jobDescription && (
                  <p className="text-sm text-red-500">{errors.jobDescription.message}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Minimum 50 characters. Current: {watch("jobDescription")?.length || 0}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isUrgent"
                  checked={watchedIsUrgent}
                  onCheckedChange={(checked) => handleUrgentToggle(checked as boolean)}
                />
                <Label htmlFor="isUrgent" className="text-sm font-medium">
                  Mark as Urgent Hire
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Link href={FRONTEND_ROUTES.RECRUITER.JOBS.BASE}>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button 
              type="submit" 
              disabled={isSubmitting || !isValid || watchedSkills.length === 0}
              className={!isValid || watchedSkills.length === 0 ? "opacity-50 cursor-not-allowed" : ""}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Creating Job..." : "Post Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
