"use client";

import { useState } from "react";
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
import { toast } from "sonner";
import Constants from "@/lib/constants";
import { api } from "@/lib/api";



export default function RecruiterSignupPage() {
  const [formData, setFormData] = useState({
    // User registration
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    company: "",

    // Job details
    jobTitle: "Senior React Developer",
    employmentType: "",
    location: "Remote / San Francisco",
    experienceLevel: "",
    minimumSalary: 120000,
    maximumSalary: 160000,
    currency: "USD",
    requiredSkills: [] as string[],
    jobDescription:
      "Describe the role, responsibilities, and what makes this opportunity special...",
    isUrgent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.includes(skill)
        ? prev.requiredSkills.filter((s) => s !== skill)
        : [...prev.requiredSkills, skill],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, create the user account
      const userResponse = await api.auth.register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: "recruiter",
          company: formData.company,
      });

      if (userResponse.status !== 201) {
        throw new Error("Failed to create user account");
      }

      const userData = userResponse.data;

      // Then, create the job posting
      const jobResponse = await api.jobs.create({
          jobTitle: formData.jobTitle,
          company: formData.company,
          employmentType: formData.employmentType,
          location: formData.location,
          experienceLevel: formData.experienceLevel,
          minimumSalary: formData.minimumSalary,
          maximumSalary: formData.maximumSalary,
          currency: formData.currency,
          requiredSkills: formData.requiredSkills,
          jobDescription: formData.jobDescription,
          isUrgent: formData.isUrgent,
        }
     );

      if (jobResponse.status !== 201) {
        throw new Error("Failed to create job posting");
      }

      toast.success("Account and job posting created successfully!");
      // Redirect to login or dashboard
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Create New Opportunity
          </h1>
          <p className="text-lg text-muted-foreground">
            Sign up as a recruiter and post your first job opportunity
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* User Registration Section */}
          <Card>
            <CardHeader>
              <CardTitle>Recruiter Account</CardTitle>
              <CardDescription>
                Create your recruiter account to start posting jobs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Job Details Section */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Fill in the details for your job posting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    handleInputChange("jobTitle", e.target.value)
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <Select
                    value={formData.employmentType}
                    onValueChange={(value) =>
                      handleInputChange("employmentType", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Constants.employmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={formData.experienceLevel}
                    onValueChange={(value) =>
                      handleInputChange("experienceLevel", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {Constants.experienceLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) =>
                      handleInputChange("currency", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minimumSalary">Minimum Salary/Rate</Label>
                  <Input
                    id="minimumSalary"
                    type="number"
                    value={formData.minimumSalary}
                    onChange={(e) =>
                      handleInputChange(
                        "minimumSalary",
                        parseInt(e.target.value)
                      )
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="maximumSalary">Maximum Salary/Rate</Label>
                  <Input
                    id="maximumSalary"
                    type="number"
                    value={formData.maximumSalary}
                    onChange={(e) =>
                      handleInputChange(
                        "maximumSalary",
                        parseInt(e.target.value)
                      )
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Required Skills</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select all required technologies and skills
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Constants.availableSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={formData.requiredSkills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                      />
                      <Label htmlFor={skill} className="text-sm font-normal">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
                {formData.requiredSkills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  value={formData.jobDescription}
                  onChange={(e) =>
                    handleInputChange("jobDescription", e.target.value)
                  }
                  rows={6}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isUrgent"
                  checked={formData.isUrgent}
                  onCheckedChange={(checked) =>
                    handleInputChange("isUrgent", checked)
                  }
                />
                <Label htmlFor="isUrgent" className="text-sm font-normal">
                  Mark as Urgent
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Get priority in AI matching and candidate alerts
              </p>
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
              {isSubmitting ? "Creating..." : "Find Tribe Members"}
            </Button>
          </div>
        </form>
      </div>
      </div>
  );
}
