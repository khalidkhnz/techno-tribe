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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useCompleteDeveloperProfile } from "@/hooks/use-api";
import { 
  completeDeveloperProfileSchema, 
  type CompleteDeveloperProfileFormData 
} from "@/lib/schemas";
import Constants from "@/lib/constants";
import FRONTEND_ROUTES from "@/lib/fe-routes";
import { Code, ArrowRight, X, Plus } from "lucide-react";

export default function CompleteDeveloperProfilePage() {
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [education, setEducation] = useState<string[]>([]);
  const [newEducation, setNewEducation] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);
  const [newCertification, setNewCertification] = useState("");
  const [portfolioLinks, setPortfolioLinks] = useState<string[]>([]);
  const [newPortfolioLink, setNewPortfolioLink] = useState("");
  const [socialLinks, setSocialLinks] = useState<string[]>([]);
  const [newSocialLink, setNewSocialLink] = useState("");

  const completeProfileMutation = useCompleteDeveloperProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,

  } = useForm<CompleteDeveloperProfileFormData>({
    resolver: zodResolver(completeDeveloperProfileSchema),
    defaultValues: {
      customUrl: "",
      bio: "",
      location: "",
      website: "",
      skills: [],
      experienceLevel: undefined,
      yearsOfExperience: undefined,
      currentCompany: "",
      currentPosition: "",
      education: [],
      certifications: [],
      portfolioLinks: [],
      socialLinks: [],
    },
  });

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setValue("skills", updatedSkills);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    setValue("skills", updatedSkills);
  };

  const addEducation = () => {
    if (newEducation.trim() && !education.includes(newEducation.trim())) {
      const updatedEducation = [...education, newEducation.trim()];
      setEducation(updatedEducation);
      setValue("education", updatedEducation);
      setNewEducation("");
    }
  };

  const removeEducation = (educationToRemove: string) => {
    const updatedEducation = education.filter(edu => edu !== educationToRemove);
    setEducation(updatedEducation);
    setValue("education", updatedEducation);
  };

  const addCertification = () => {
    if (newCertification.trim() && !certifications.includes(newCertification.trim())) {
      const updatedCertifications = [...certifications, newCertification.trim()];
      setCertifications(updatedCertifications);
      setValue("certifications", updatedCertifications);
      setNewCertification("");
    }
  };

  const removeCertification = (certificationToRemove: string) => {
    const updatedCertifications = certifications.filter(cert => cert !== certificationToRemove);
    setCertifications(updatedCertifications);
    setValue("certifications", updatedCertifications);
  };

  const addPortfolioLink = () => {
    if (newPortfolioLink.trim() && !portfolioLinks.includes(newPortfolioLink.trim())) {
      const updatedLinks = [...portfolioLinks, newPortfolioLink.trim()];
      setPortfolioLinks(updatedLinks);
      setValue("portfolioLinks", updatedLinks);
      setNewPortfolioLink("");
    }
  };

  const removePortfolioLink = (linkToRemove: string) => {
    const updatedLinks = portfolioLinks.filter(link => link !== linkToRemove);
    setPortfolioLinks(updatedLinks);
    setValue("portfolioLinks", updatedLinks);
  };

  const addSocialLink = () => {
    if (newSocialLink.trim() && !socialLinks.includes(newSocialLink.trim())) {
      const updatedLinks = [...socialLinks, newSocialLink.trim()];
      setSocialLinks(updatedLinks);
      setValue("socialLinks", updatedLinks);
      setNewSocialLink("");
    }
  };

  const removeSocialLink = (linkToRemove: string) => {
    const updatedLinks = socialLinks.filter(link => link !== linkToRemove);
    setSocialLinks(updatedLinks);
    setValue("socialLinks", updatedLinks);
  };

  const onSubmit = async (data: any) => {
    try {
      await completeProfileMutation.mutateAsync(data);
      // Redirect to developer dashboard after successful completion
      router.push(FRONTEND_ROUTES.DEVELOPER.DASHBOARD);
    } catch {
      // Error is handled by the mutation
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Code className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-4xl font-bold text-foreground">
              Complete Your Developer Profile
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Showcase your skills and experience to potential employers
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Tell us about yourself and your professional background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customUrl">Custom Profile URL</Label>
                <Input
                  id="customUrl"
                  {...register("customUrl")}
                  placeholder="your-name-dev"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  This will be your public profile URL: TechnoTribes.com/profile/your-name-dev
                </p>
                {errors.customUrl && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.customUrl.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  {...register("bio")}
                  placeholder="Tell us about your background, passion for coding, and what drives you as a developer..."
                  rows={4}
                />
                {errors.bio && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    {...register("location")}
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div>
                  <Label htmlFor="website">Personal Website</Label>
                  <Input
                    id="website"
                    {...register("website")}
                    placeholder="https://yourwebsite.com"
                  />
                  {errors.website && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.website.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
              <CardDescription>
                Add your technical skills and programming languages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g., React, Node.js)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              {errors.skills && (
                <p className="text-sm text-destructive">
                  {errors.skills.message}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Experience & Background</CardTitle>
              <CardDescription>
                Share your experience level and current position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select onValueChange={(value) => setValue("experienceLevel", value as any)}>
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
                </div>

                <div>
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    {...register("yearsOfExperience", { valueAsNumber: true })}
                    placeholder="5"
                    min="0"
                    max="50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentCompany">Current Company</Label>
                  <Input
                    id="currentCompany"
                    {...register("currentCompany")}
                    placeholder="Tech Corp Inc."
                  />
                </div>

                <div>
                  <Label htmlFor="currentPosition">Current Position</Label>
                  <Input
                    id="currentPosition"
                    {...register("currentPosition")}
                    placeholder="Senior Software Engineer"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>
                Add your educational background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newEducation}
                  onChange={(e) => setNewEducation(e.target.value)}
                  placeholder="Bachelor of Computer Science - Stanford University"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEducation())}
                />
                <Button type="button" onClick={addEducation} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">{edu}</span>
                    <button
                      type="button"
                      onClick={() => removeEducation(edu)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>
                Add your professional certifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  placeholder="AWS Certified Developer"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                />
                <Button type="button" onClick={addCertification} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">{cert}</span>
                    <button
                      type="button"
                      onClick={() => removeCertification(cert)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Links */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Links</CardTitle>
              <CardDescription>
                Add links to your portfolio, GitHub, or other work samples
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newPortfolioLink}
                  onChange={(e) => setNewPortfolioLink(e.target.value)}
                  placeholder="https://github.com/yourusername"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPortfolioLink())}
                />
                <Button type="button" onClick={addPortfolioLink} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {portfolioLinks.map((link) => (
                  <div key={link} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm text-blue-600 hover:underline">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </span>
                    <button
                      type="button"
                      onClick={() => removePortfolioLink(link)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>
                Add your professional social media profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSocialLink}
                  onChange={(e) => setNewSocialLink(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSocialLink())}
                />
                <Button type="button" onClick={addSocialLink} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {socialLinks.map((link) => (
                  <div key={link} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm text-blue-600 hover:underline">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSocialLink(link)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
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