"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useCompleteRecruiterProfile } from "@/hooks/use-api";
import { 
  completeRecruiterProfileSchema, 
  type CompleteRecruiterProfileFormData 
} from "@/lib/schemas";
import Constants from "@/lib/constants";
import FRONTEND_ROUTES from "@/lib/fe-routes";
import { Building2, Check, ArrowRight } from "lucide-react";

const employmentTypes = [
  { value: "full-time" as const, label: "Full Time" },
  { value: "part-time" as const, label: "Part Time" },
  { value: "contract" as const, label: "Contract" },
  { value: "freelance" as const, label: "Freelance" },
  { value: "internship" as const, label: "Internship" },
];

const experienceLevels = [
  { value: "junior" as const, label: "Junior" },
  { value: "mid-level" as const, label: "Mid Level" },
  { value: "senior" as const, label: "Senior" },
  { value: "lead" as const, label: "Lead" },
  { value: "principal" as const, label: "Principal" },
];

const companySizes = [
  "1-10 employees",
  "11-50 employees", 
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "E-commerce",
  "Manufacturing",
  "Consulting",
  "Media & Entertainment",
  "Real Estate",
  "Other",
];

export default function CompleteRecruiterProfilePage() {
  const router = useRouter();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<("full-time" | "part-time" | "contract" | "freelance" | "internship")[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<("junior" | "mid-level" | "senior" | "lead" | "principal")[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const completeProfileMutation = useCompleteRecruiterProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CompleteRecruiterProfileFormData>({
    resolver: zodResolver(completeRecruiterProfileSchema),
    defaultValues: {
      company: "",
      companyWebsite: "",
      companyDescription: "",
      companySize: "",
      industry: "",
      jobTitle: "",
      phone: "",
      linkedin: "",
      preferredEmploymentTypes: [],
      preferredExperienceLevels: [],
      preferredLocations: [],
      preferredSalaryMin: undefined,
      preferredSalaryMax: undefined,
      preferredSkills: [],
      isUrgent: false,
      notes: "",
    },
  });

  const watchedIsUrgent = watch("isUrgent");

  const handleSkillToggle = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSkills);
    setValue("preferredSkills", newSkills);
  };

  const handleEmploymentTypeToggle = (type: "full-time" | "part-time" | "contract" | "freelance" | "internship") => {
    const newTypes = selectedEmploymentTypes.includes(type)
      ? selectedEmploymentTypes.filter((t) => t !== type)
      : [...selectedEmploymentTypes, type];
    setSelectedEmploymentTypes(newTypes);
    setValue("preferredEmploymentTypes", newTypes);
  };

  const handleExperienceLevelToggle = (level: "junior" | "mid-level" | "senior" | "lead" | "principal") => {
    const newLevels = selectedExperienceLevels.includes(level)
      ? selectedExperienceLevels.filter((l) => l !== level)
      : [...selectedExperienceLevels, level];
    setSelectedExperienceLevels(newLevels);
    setValue("preferredExperienceLevels", newLevels);
  };

  const handleLocationAdd = (location: string) => {
    if (location && !selectedLocations.includes(location)) {
      const newLocations = [...selectedLocations, location];
      setSelectedLocations(newLocations);
      setValue("preferredLocations", newLocations);
    }
  };

  const handleLocationRemove = (location: string) => {
    const newLocations = selectedLocations.filter((l) => l !== location);
    setSelectedLocations(newLocations);
    setValue("preferredLocations", newLocations);
  };

  const onSubmit = async (data: CompleteRecruiterProfileFormData) => {
    try {
      await completeProfileMutation.mutateAsync(data);
      // Redirect to recruiter dashboard after successful completion
      router.push(FRONTEND_ROUTES.RECRUITER.DASHBOARD);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-4xl font-bold text-foreground">
              Complete Your Recruiter Profile
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Tell us about your company and hiring preferences to get better matches
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Tell us about your company to help candidates understand your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  {...register("company")}
                  placeholder="Your Company Inc."
                />
                {errors.company && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.company.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyWebsite">Company Website</Label>
                  <Input
                    id="companyWebsite"
                    {...register("companyWebsite")}
                    placeholder="https://yourcompany.com"
                  />
                  {errors.companyWebsite && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.companyWebsite.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select onValueChange={(value) => setValue("industry", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select onValueChange={(value) => setValue("companySize", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="jobTitle">Your Job Title</Label>
                  <Input
                    id="jobTitle"
                    {...register("jobTitle")}
                    placeholder="Senior Recruiter"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="companyDescription">Company Description</Label>
                <Textarea
                  id="companyDescription"
                  {...register("companyDescription")}
                  placeholder="Tell us about your company culture, mission, and what makes it a great place to work..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                How candidates can reach you for opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="+1-555-123-4567"
                  />
                </div>

                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    {...register("linkedin")}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                  {errors.linkedin && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.linkedin.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hiring Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Hiring Preferences</CardTitle>
              <CardDescription>
                Define your ideal candidate profile and hiring requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Preferred Employment Types</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select the employment types you typically hire for
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {employmentTypes.map((type) => (
                    <div key={type.value} className="flex items-center space-x-2">
                                             <Checkbox
                         id={type.value}
                         checked={selectedEmploymentTypes.includes(type.value)}
                         onCheckedChange={() => handleEmploymentTypeToggle(type.value)}
                       />
                      <Label htmlFor={type.value} className="text-sm font-normal">
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Preferred Experience Levels</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select the experience levels you typically hire for
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {experienceLevels.map((level) => (
                    <div key={level.value} className="flex items-center space-x-2">
                                             <Checkbox
                         id={level.value}
                         checked={selectedExperienceLevels.includes(level.value)}
                         onCheckedChange={() => handleExperienceLevelToggle(level.value)}
                       />
                      <Label htmlFor={level.value} className="text-sm font-normal">
                        {level.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Preferred Locations</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Add locations where you typically hire from
                </p>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add location (e.g., Remote, San Francisco)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        handleLocationAdd(input.value);
                        input.value = '';
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const input = document.querySelector('input[placeholder*="location"]') as HTMLInputElement;
                      if (input && input.value) {
                        handleLocationAdd(input.value);
                        input.value = '';
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                {selectedLocations.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedLocations.map((location) => (
                      <Badge key={location} variant="secondary" className="cursor-pointer" onClick={() => handleLocationRemove(location)}>
                        {location} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferredSalaryMin">Preferred Salary Range (Min)</Label>
                  <Input
                    id="preferredSalaryMin"
                    type="number"
                    {...register("preferredSalaryMin", { valueAsNumber: true })}
                    placeholder="80000"
                  />
                  {errors.preferredSalaryMin && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.preferredSalaryMin.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="preferredSalaryMax">Preferred Salary Range (Max)</Label>
                  <Input
                    id="preferredSalaryMax"
                    type="number"
                    {...register("preferredSalaryMax", { valueAsNumber: true })}
                    placeholder="150000"
                  />
                  {errors.preferredSalaryMax && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.preferredSalaryMax.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label>Preferred Skills</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select the skills you typically look for in candidates
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Constants.availableSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                      />
                      <Label htmlFor={skill} className="text-sm font-normal">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedSkills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isUrgent"
                  {...register("isUrgent")}
                />
                <Label htmlFor="isUrgent" className="text-sm font-normal">
                  Mark as Urgent Hiring
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Get priority in AI matching and candidate alerts
              </p>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
              <CardDescription>
                Any additional information about your hiring needs or preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                {...register("notes")}
                placeholder="Tell us about your hiring timeline, specific requirements, or any other details that would help us find the right candidates..."
                rows={4}
              />
            </CardContent>
          </Card>

          <div className="flex justify-center space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                // Save as draft functionality
                toast.info("Draft saved!");
              }}
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[200px]"
            >
              {isSubmitting ? (
                "Completing Profile..."
              ) : (
                <>
                  Complete Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
