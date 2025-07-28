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
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { profileSchema, type ProfileFormData } from "@/lib/schemas";
import { api } from "@/lib/api";
import { Plus, X, Save, Edit, Eye, Link as LinkIcon } from "lucide-react";

const experienceLevels = [
  { value: "junior", label: "Junior" },
  { value: "mid-level", label: "Mid Level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "principal", label: "Principal" },
];

const availableSkills = [
  "React", "Vue.js", "Angular", "TypeScript", "JavaScript", "Python", "Java",
  "Go", "Node.js", "Express", "Django", "Spring", "PostgreSQL", "MongoDB",
  "AWS", "Docker", "Kubernetes", "GraphQL", "REST API", "Microservices",
  "Machine Learning", "AI", "Next.js", "Vue", "Svelte", "PHP", "Ruby",
  "C#", "Swift", "Kotlin", "Rust", "Flutter", "React Native", "Vue Native",
  "Electron", "Webpack", "Vite", "Jest", "Cypress", "Selenium", "Git",
  "GitHub", "GitLab", "Bitbucket", "CI/CD", "Jenkins", "GitHub Actions",
  "GitLab CI", "Terraform", "Ansible", "Puppet", "Chef",
];

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newEducation, setNewEducation] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [newPortfolioLink, setNewPortfolioLink] = useState("");
  const [newSocialLink, setNewSocialLink] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.users.getProfile();
      const userData = response.data;
      setUser(userData);
      
      // Set form values
      Object.keys(userData).forEach((key) => {
        if (userData[key] !== undefined) {
          setValue(key as keyof ProfileFormData, userData[key]);
        }
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const response = await api.users.updateProfile(data);
      setUser(response.data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleSkillToggle = (skill: string) => {
    const currentSkills = watch("skills") || [];
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter((s) => s !== skill)
      : [...currentSkills, skill];
    setValue("skills", newSkills);
  };

  const addEducation = () => {
    if (newEducation.trim()) {
      const currentEducation = watch("education") || [];
      setValue("education", [...currentEducation, newEducation.trim()]);
      setNewEducation("");
    }
  };

  const removeEducation = (index: number) => {
    const currentEducation = watch("education") || [];
    setValue("education", currentEducation.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      const currentCertifications = watch("certifications") || [];
      setValue("certifications", [...currentCertifications, newCertification.trim()]);
      setNewCertification("");
    }
  };

  const removeCertification = (index: number) => {
    const currentCertifications = watch("certifications") || [];
    setValue("certifications", currentCertifications.filter((_, i) => i !== index));
  };

  const addPortfolioLink = () => {
    if (newPortfolioLink.trim()) {
      const currentLinks = watch("portfolioLinks") || [];
      setValue("portfolioLinks", [...currentLinks, newPortfolioLink.trim()]);
      setNewPortfolioLink("");
    }
  };

  const removePortfolioLink = (index: number) => {
    const currentLinks = watch("portfolioLinks") || [];
    setValue("portfolioLinks", currentLinks.filter((_, i) => i !== index));
  };

  const addSocialLink = () => {
    if (newSocialLink.trim()) {
      const currentLinks = watch("socialLinks") || [];
      setValue("socialLinks", [...currentLinks, newSocialLink.trim()]);
      setNewSocialLink("");
    }
  };

  const removeSocialLink = (index: number) => {
    const currentLinks = watch("socialLinks") || [];
    setValue("socialLinks", currentLinks.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-2">
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
                  disabled={!isEditing}
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
                  <span className="text-gray-500">technotribe.com/</span>
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
                  placeholder="Tell us about yourself..."
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
                      {experienceLevels.map((level) => (
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
                  placeholder="e.g., Senior Developer"
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
              <CardTitle>Skills</CardTitle>
              <CardDescription>
                Select your technical skills and technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                {availableSkills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={skill}
                      checked={watch("skills")?.includes(skill) || false}
                      onChange={() => handleSkillToggle(skill)}
                      disabled={!isEditing}
                      className="rounded"
                    />
                    <Label htmlFor={skill} className="text-sm font-normal">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.skills && (
                <p className="text-red-500 text-sm mt-2">
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
              {watch("education")?.map((edu, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={edu} disabled />
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeEducation(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newEducation}
                    onChange={(e) => setNewEducation(e.target.value)}
                    placeholder="Add education (e.g., Bachelor in Computer Science - Stanford)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addEducation())}
                  />
                  <Button type="button" onClick={addEducation}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
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
              {watch("certifications")?.map((cert, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={cert} disabled />
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeCertification(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    placeholder="Add certification (e.g., AWS Certified Developer)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCertification())}
                  />
                  <Button type="button" onClick={addCertification}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
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
              {watch("portfolioLinks")?.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={link} disabled />
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removePortfolioLink(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newPortfolioLink}
                    onChange={(e) => setNewPortfolioLink(e.target.value)}
                    placeholder="Add portfolio link (e.g., https://github.com/username)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addPortfolioLink())}
                  />
                  <Button type="button" onClick={addPortfolioLink}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
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
              {watch("socialLinks")?.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={link} disabled />
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSocialLink(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newSocialLink}
                    onChange={(e) => setNewSocialLink(e.target.value)}
                    placeholder="Add social link (e.g., https://linkedin.com/in/username)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSocialLink())}
                  />
                  <Button type="button" onClick={addSocialLink}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </form>

        {/* Profile Stats */}
        {user && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Profile Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {user.profileViews}
                  </div>
                  <div className="text-sm text-gray-600">Profile Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {user.skills?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {user.education?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Education</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {user.certifications?.length || 0}
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