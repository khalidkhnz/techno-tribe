"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { profileSchema, type ProfileFormData } from "@/lib/schemas";
import { useUser, useUpdateProfile } from "@/hooks/use-api";
import Constants from "@/lib/constants";
import { Plus, X, Save, Edit, Code } from "lucide-react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  customUrl?: string;
  bio?: string;
  location?: string;
  website?: string;
  skills: string[];
  experienceLevel?: string;
  yearsOfExperience?: number;
  currentCompany?: string;
  currentPosition?: string;
  education: string[];
  certifications: string[];
  portfolioLinks: string[];
  socialLinks: string[];
  isProfileComplete: boolean;
  profileViews: number;
  avatar?: string;
}

export default function DeveloperProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [newEducation, setNewEducation] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [newPortfolioLink, setNewPortfolioLink] = useState("");
  const [newSocialLink, setNewSocialLink] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const { data: user, isLoading, error } = useUser();
  const updateProfileMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  // Reset form when user data changes
  useEffect(() => {
    if (user?.data) {
      reset({
        firstName: user.data.firstName || "",
        lastName: user.data.lastName || "",
        email: user.data.email || "",
        customUrl: user.data.customUrl || "",
        bio: user.data.bio || "",
        location: user.data.location || "",
        website: user.data.website || "",
        skills: user.data.skills || [],
        experienceLevel: user.data.experienceLevel as any,
        yearsOfExperience: user.data.yearsOfExperience,
        currentCompany: user.data.currentCompany || "",
        currentPosition: user.data.currentPosition || "",
        education: user.data.education || [],
        certifications: user.data.certifications || [],
        portfolioLinks: user.data.portfolioLinks || [],
        socialLinks: user.data.socialLinks || [],
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfileMutation.mutateAsync({ data });
      setIsEditing(false);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleSkillToggle = (skill: string) => {
    const currentSkills = watch("skills") || [];
    if (currentSkills.includes(skill)) {
      setValue("skills", currentSkills.filter(s => s !== skill));
    } else {
      setValue("skills", [...currentSkills, skill]);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !watch("skills")?.includes(newSkill.trim())) {
      const currentSkills = watch("skills") || [];
      setValue("skills", [...currentSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = watch("skills") || [];
    setValue("skills", currentSkills.filter(skill => skill !== skillToRemove));
  };

  const addEducation = () => {
    if (newEducation.trim() && !watch("education")?.includes(newEducation.trim())) {
      const currentEducation = watch("education") || [];
      setValue("education", [...currentEducation, newEducation.trim()]);
      setNewEducation("");
    }
  };

  const removeEducation = (educationToRemove: string) => {
    const currentEducation = watch("education") || [];
    setValue("education", currentEducation.filter(edu => edu !== educationToRemove));
  };

  const addCertification = () => {
    if (newCertification.trim() && !watch("certifications")?.includes(newCertification.trim())) {
      const currentCertifications = watch("certifications") || [];
      setValue("certifications", [...currentCertifications, newCertification.trim()]);
      setNewCertification("");
    }
  };

  const removeCertification = (certificationToRemove: string) => {
    const currentCertifications = watch("certifications") || [];
    setValue("certifications", currentCertifications.filter(cert => cert !== certificationToRemove));
  };

  const addPortfolioLink = () => {
    if (newPortfolioLink.trim() && !watch("portfolioLinks")?.includes(newPortfolioLink.trim())) {
      const currentPortfolioLinks = watch("portfolioLinks") || [];
      setValue("portfolioLinks", [...currentPortfolioLinks, newPortfolioLink.trim()]);
      setNewPortfolioLink("");
    }
  };

  const removePortfolioLink = (linkToRemove: string) => {
    const currentPortfolioLinks = watch("portfolioLinks") || [];
    setValue("portfolioLinks", currentPortfolioLinks.filter(link => link !== linkToRemove));
  };

  const addSocialLink = () => {
    if (newSocialLink.trim() && !watch("socialLinks")?.includes(newSocialLink.trim())) {
      const currentSocialLinks = watch("socialLinks") || [];
      setValue("socialLinks", [...currentSocialLinks, newSocialLink.trim()]);
      setNewSocialLink("");
    }
  };

  const removeSocialLink = (linkToRemove: string) => {
    const currentSocialLinks = watch("socialLinks") || [];
    setValue("socialLinks", currentSocialLinks.filter(link => link !== linkToRemove));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-background">
        <div className="w-full max-w-7xl mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600">Failed to load your profile. Please try again.</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold text-gray-900">Developer Profile</h1>
            </div>
            <p className="text-gray-600">
              Build your professional profile to attract recruiters
            </p>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Your personal and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    disabled={!isEditing}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    disabled={!isEditing}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  disabled={true}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="customUrl">Custom URL</Label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">technotribe.com/profile/</span>
                  <Input
                    id="customUrl"
                    {...register("customUrl")}
                    disabled={!isEditing}
                    placeholder="your-custom-url"
                  />
                </div>
                {errors.customUrl && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.customUrl.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  {...register("bio")}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself, your passion for coding, and what drives you as a developer..."
                  rows={4}
                />
                {errors.bio && (
                  <p className="text-red-500 text-sm mt-1">
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
                    disabled={!isEditing}
                    placeholder="City, Country"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    {...register("website")}
                    disabled={!isEditing}
                    placeholder="https://yourwebsite.com"
                  />
                  {errors.website && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.website.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>
                Your work experience and current position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={watch("experienceLevel")}
                    onValueChange={(value) => setValue("experienceLevel", value as any)}
                    disabled={!isEditing}
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
                  {errors.experienceLevel && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.experienceLevel.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    {...register("yearsOfExperience", { valueAsNumber: true })}
                    disabled={!isEditing}
                    min="0"
                    max="50"
                  />
                  {errors.yearsOfExperience && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.yearsOfExperience.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="currentCompany">Current Company</Label>
                  <Input
                    id="currentCompany"
                    {...register("currentCompany")}
                    disabled={!isEditing}
                  />
                  {errors.currentCompany && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currentCompany.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="currentPosition">Current Position</Label>
                <Input
                  id="currentPosition"
                  {...register("currentPosition")}
                  disabled={!isEditing}
                  placeholder="e.g., Senior Software Engineer"
                />
                {errors.currentPosition && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currentPosition.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
              <CardDescription>
                Select your technical skills and technologies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing && (
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
              )}
              
              <div className="flex flex-wrap gap-2">
                {watch("skills")?.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
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

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>
                Your educational background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newEducation}
                    onChange={(e) => setNewEducation(e.target.value)}
                    placeholder="Add education (e.g., Bachelor in Computer Science - Stanford)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addEducation())}
                  />
                  <Button type="button" onClick={addEducation} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {watch("education")?.map((edu) => (
                  <Badge key={edu} variant="secondary" className="flex items-center gap-1">
                    {edu}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeEducation(edu)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              
              {errors.education && (
                <p className="text-sm text-destructive">
                  {errors.education.message}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>
                Professional certifications and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    placeholder="Add certification (e.g., AWS Certified Developer)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCertification())}
                  />
                  <Button type="button" onClick={addCertification} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {watch("certifications")?.map((cert) => (
                  <Badge key={cert} variant="secondary" className="flex items-center gap-1">
                    {cert}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeCertification(cert)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              
              {errors.certifications && (
                <p className="text-sm text-destructive">
                  {errors.certifications.message}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Portfolio Links */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Links</CardTitle>
              <CardDescription>
                Links to your projects and portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newPortfolioLink}
                    onChange={(e) => setNewPortfolioLink(e.target.value)}
                    placeholder="Add portfolio link (e.g., https://github.com/username)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addPortfolioLink())}
                  />
                  <Button type="button" onClick={addPortfolioLink} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {watch("portfolioLinks")?.map((link) => (
                  <Badge key={link} variant="secondary" className="flex items-center gap-1">
                    {link}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removePortfolioLink(link)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              
              {errors.portfolioLinks && (
                <p className="text-sm text-destructive">
                  {errors.portfolioLinks.message}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>
                Your social media and professional network profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newSocialLink}
                    onChange={(e) => setNewSocialLink(e.target.value)}
                    placeholder="Add social link (e.g., https://linkedin.com/in/username)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSocialLink())}
                  />
                  <Button type="button" onClick={addSocialLink} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {watch("socialLinks")?.map((link) => (
                  <Badge key={link} variant="secondary" className="flex items-center gap-1">
                    {link}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeSocialLink(link)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              
              {errors.socialLinks && (
                <p className="text-sm text-destructive">
                  {errors.socialLinks.message}
                </p>
              )}
            </CardContent>
          </Card>
        </form>

        {/* Profile Stats */}
        {user?.data && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Profile Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {user.data.profileViews || 0}
                  </div>
                  <div className="text-sm text-gray-600">Profile Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {user.data.skills?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {user.data.education?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Education</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {user.data.certifications?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Certifications</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 