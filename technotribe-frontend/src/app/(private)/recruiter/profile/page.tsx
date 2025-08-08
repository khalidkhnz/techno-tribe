"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { profileSchema, type ProfileFormData } from "@/lib/schemas";
import { useUser, useUpdateProfile } from "@/hooks/use-api";
import { api } from "@/lib/api";
import Constants from "@/lib/constants";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { 
  User, 
  MapPin, 
  Globe, 
  Building2, 
  Save,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Edit,
  Briefcase,
  Upload
} from "lucide-react";

interface RecruiterProfileData extends ProfileFormData {
  company?: string;
  companyWebsite?: string;
  companyDescription?: string;
  companySize?: string;
  industry?: string;
  jobTitle?: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  recruitmentFocus?: string;
  primaryIndustry?: string;
  experienceLevelFocus?: string;
}

export default function RecruiterProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const { data: user, isLoading, error } = useUser();
  const updateProfileMutation = useUpdateProfile();
  
  const profileImageRef = useRef<HTMLInputElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RecruiterProfileData>({
    resolver: zodResolver(profileSchema),
  });

  // UploadThing hooks for different file types
  const { startUpload: startProfileUpload, isUploading: isProfileUploading } = useUploadThing("profileImage", {
    onClientUploadComplete: async (res) => {
      if (res && res[0]) {
        try {
          await api.users.updateProfileImage(res[0].url);
          toast.success('Profile image updated successfully');
          window.location.reload();
        } catch (error) {
          toast.error('Failed to save profile image');
          console.error('Save error:', error);
        }
      }
    },
    onUploadError: (error) => {
      toast.error('Failed to upload profile image');
      console.error('Upload error:', error);
    },
  });

  const { startUpload: startCoverUpload, isUploading: isCoverUploading } = useUploadThing("coverImage", {
    onClientUploadComplete: async (res) => {
      if (res && res[0]) {
        try {
          await api.users.updateCoverImage(res[0].url);
          toast.success('Cover image updated successfully');
          window.location.reload();
        } catch (error) {
          toast.error('Failed to save cover image');
          console.error('Save error:', error);
        }
      }
    },
    onUploadError: (error) => {
      toast.error('Failed to upload cover image');
      console.error('Upload error:', error);
    },
  });

  const handleFileUpload = async (file: File, type: 'profile' | 'cover') => {
    if (!file) return;

    const userId = user?.data?._id;
    if (!userId) {
      toast.error('User not found');
      return;
    }

    try {
      if (type === 'profile') {
        await startProfileUpload([file], { userId });
      } else if (type === 'cover') {
        await startCoverUpload([file], { userId });
      }
    } catch (error) {
      toast.error('Failed to start upload');
      console.error('Upload error:', error);
    }
  };

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
        currentCompany: user.data.currentCompany || "",
        currentPosition: user.data.currentPosition || "",
        // Recruiter-specific fields
        company: user.data.company || "",
        companyWebsite: user.data.companyWebsite || "",
        companyDescription: user.data.companyDescription || "",
        companySize: user.data.companySize || "",
        industry: user.data.industry || "",
        jobTitle: user.data.jobTitle || "",
        phone: user.data.phone || "",
        linkedin: user.data.linkedin || "",
        twitter: user.data.twitter || "",
        facebook: user.data.facebook || "",
        instagram: user.data.instagram || "",
        recruitmentFocus: user.data.recruitmentFocus || "",
        primaryIndustry: user.data.primaryIndustry || "",
        experienceLevelFocus: user.data.experienceLevelFocus || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: RecruiterProfileData) => {
    try {
      await updateProfileMutation.mutateAsync({ data });
      setIsEditing(false);
    } catch (error) {
      // Error is handled by the mutation
    }
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
          <h2 className="text-2xl font-bold text-foreground mb-2">Error Loading Profile</h2>
          <p className="text-muted-foreground">Failed to load your profile. Please try again.</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="h-6 w-6 text-primary" />
                <h1 className="text-3xl font-bold text-primary">Recruiter Profile</h1>
              </div>
              <p className="text-muted-foreground">
                Manage your company profile and recruitment preferences
              </p>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    disabled={!isEditing}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    disabled={!isEditing}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    {...register("email")}
                    disabled={true}
                  />
                </div>
                {errors.email && (
                                      <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself and your recruitment experience..."
                  {...register("bio")}
                  disabled={!isEditing}
                  rows={4}
                />
                {errors.bio && (
                                      <p className="text-sm text-destructive">{errors.bio.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="City, Country"
                      className="pl-10"
                      {...register("location")}
                      disabled={!isEditing}
                    />
                  </div>
                  {errors.location && (
                    <p className="text-sm text-destructive">{errors.location.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      className="pl-10"
                      {...register("website")}
                      disabled={!isEditing}
                    />
                  </div>
                  {errors.website && (
                    <p className="text-sm text-destructive">{errors.website.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Images */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Images</CardTitle>
              <CardDescription>
                Upload your profile and cover images
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Image */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                    {user?.data?.profileImage ? (
                      <img 
                        src={user.data.profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                        {user?.data?.firstName?.charAt(0)}{user?.data?.lastName?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="profile-image">Profile Image</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload a professional headshot (JPG, PNG, WebP, max 4MB)
                    </p>
                    <div className="flex gap-2">
                      <input
                        ref={profileImageRef}
                        type="file"
                        id="profile-image"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, 'profile');
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => profileImageRef.current?.click()}
                        disabled={isProfileUploading}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {isProfileUploading ? "Uploading..." : "Upload Profile Image"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Cover Image */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-32 h-20 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    {user?.data?.coverImage ? (
                      <img 
                        src={user.data.coverImage} 
                        alt="Cover" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-muted-foreground">
                        <Upload className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="cover-image">Cover Image</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload a cover image for your profile (JPG, PNG, WebP, max 4MB)
                    </p>
                    <div className="flex gap-2">
                      <input
                        ref={coverImageRef}
                        type="file"
                        id="cover-image"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, 'cover');
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => coverImageRef.current?.click()}
                        disabled={isCoverUploading}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {isCoverUploading ? "Uploading..." : "Upload Cover Image"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>
                Your company details and role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    {...register("company")}
                    disabled={!isEditing}
                    placeholder="Your Company Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Your Position</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Senior Recruiter, HR Manager"
                    {...register("jobTitle")}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">Company Website</Label>
                  <Input
                    id="companyWebsite"
                    type="url"
                    placeholder="https://yourcompany.com"
                    {...register("companyWebsite")}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select 
                    value={watch("companySize")} 
                    onValueChange={(value) => setValue("companySize", value)}
                    disabled={!isEditing}
                  >
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select 
                  value={watch("industry")} 
                  onValueChange={(value) => setValue("industry", value)}
                  disabled={!isEditing}
                >
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

              <div className="space-y-2">
                <Label htmlFor="companyDescription">Company Description</Label>
                <Textarea
                  id="companyDescription"
                  placeholder="Tell us about your company culture, mission, and what makes it a great place to work..."
                  {...register("companyDescription")}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customUrl">Company Profile URL</Label>
                <Input
                  id="customUrl"
                  placeholder="your-company-name"
                  {...register("customUrl")}
                  disabled={!isEditing}
                />
                {errors.customUrl && (
                                      <p className="text-sm text-destructive">{errors.customUrl.message}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Your company profile will be available at: TechnoTribes.com/company/{watch("customUrl") || "your-company-name"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Additional contact details for candidates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="pl-10"
                      {...register("phone")}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="pl-10"
                      {...register("linkedin")}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="twitter"
                      type="url"
                      placeholder="https://twitter.com/yourhandle"
                      className="pl-10"
                      {...register("twitter")}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="facebook"
                      type="url"
                      placeholder="https://facebook.com/yourpage"
                      className="pl-10"
                      {...register("facebook")}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="instagram"
                      type="url"
                      placeholder="https://instagram.com/yourhandle"
                      className="pl-10"
                      {...register("instagram")}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recruitment Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Recruitment Preferences</CardTitle>
              <CardDescription>
                Your recruitment preferences and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recruitmentFocus">Recruitment Focus</Label>
                <Textarea
                  id="recruitmentFocus"
                  placeholder="Describe your recruitment focus, preferred candidate types, or any specific requirements..."
                  {...register("recruitmentFocus")}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryIndustry">Primary Industry</Label>
                  <Input
                    id="primaryIndustry"
                    placeholder="e.g., Technology, Healthcare, Finance"
                    {...register("primaryIndustry")}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experienceLevelFocus">Experience Level Focus</Label>
                  <Input
                    id="experienceLevelFocus"
                    placeholder="e.g., Mid to Senior Level"
                    {...register("experienceLevelFocus")}
                    disabled={!isEditing}
                  />
                </div>
              </div>
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
                  <div className="text-2xl font-bold text-primary">
                    {user.data.profileViews || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Profile Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">
                    {user.data.jobsPosted || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Jobs Posted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">
                    {user.data.activeJobs || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Active Jobs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-foreground">
                    {user.data.totalApplications || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Applications</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 