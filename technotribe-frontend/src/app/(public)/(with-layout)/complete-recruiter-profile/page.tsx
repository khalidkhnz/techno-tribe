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
import { toast } from "sonner";
import { useCompleteRecruiterProfile } from "@/hooks/use-api";
import { 
  completeRecruiterProfileSchema, 
  type CompleteRecruiterProfileFormData 
} from "@/lib/schemas";
import Constants from "@/lib/constants";
import FRONTEND_ROUTES from "@/lib/fe-routes";
import { Building2, ArrowRight } from "lucide-react";

export default function CompleteRecruiterProfilePage() {
  const router = useRouter();

  const completeProfileMutation = useCompleteRecruiterProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
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
    },
  });

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
            Tell us about your company to get started
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
                      {Constants.industries.map((industry) => (
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
                      {Constants.companySizes.map((size) => (
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
