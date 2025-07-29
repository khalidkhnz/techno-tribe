"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";


import { 
  MapPin, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Link as LinkIcon,
  Eye,
  Calendar,
  Building,
  User,
  Link as ExternalLink,
  Mail,
  Share2,
  BarChart3
} from "lucide-react";

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

export default function PublicProfilePage() {
  const params = useParams();
  const customUrl = params.customUrl as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customUrl) {
      fetchProfile();
    }
  }, [customUrl]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/profile/${customUrl}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        toast.error("Profile not found");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
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

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Profile Not Found</h1>
          <p className="text-muted-foreground">
            The profile you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-2xl">
                  {getInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold text-foreground">
                    {user.firstName} {user.lastName}
                  </h1>
                  {user.experienceLevel && (
                    <Badge variant="secondary">
                      {getExperienceLevelLabel(user.experienceLevel)}
                    </Badge>
                  )}
                </div>
                
                {user.currentPosition && user.currentCompany && (
                  <p className="text-lg text-muted-foreground mb-2">
                    {user.currentPosition} at {user.currentCompany}
                  </p>
                )}
                
                {user.location && (
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    {user.location}
                  </div>
                )}
                
                {user.yearsOfExperience && (
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    {user.yearsOfExperience} years of experience
                  </div>
                )}
                
                {user.bio && (
                  <p className="text-foreground mb-4">{user.bio}</p>
                )}
                
                <div className="flex items-center gap-4">
                  {user.website && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={user.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-2" />
                        Website
                      </a>
                    </Button>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    {user.profileViews} profile views
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            {user.skills && user.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Skills & Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {user.education && user.education.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {user.education.map((edu, index) => (
                      <p key={index} className="text-foreground">{edu}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certifications */}
            {user.certifications && user.certifications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {user.certifications.map((cert, index) => (
                      <p key={index} className="text-foreground">{cert}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Portfolio Links */}
            {user.portfolioLinks && user.portfolioLinks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="w-5 h-5" />
                    Portfolio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.portfolioLinks.map((link, index) => (
                      <Button key={index} variant="outline" size="sm" asChild className="w-full justify-start">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {link}
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                {user.website && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                      {user.website}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Links */}
            {user.socialLinks && user.socialLinks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Social
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.socialLinks.map((link, index) => (
                      <Button key={index} variant="outline" size="sm" asChild className="w-full justify-start">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {link}
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Profile Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Profile Views</span>
                  <span className="font-semibold">{user.profileViews}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Skills</span>
                  <span className="font-semibold">{user.skills.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Education</span>
                  <span className="font-semibold">{user.education.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Certifications</span>
                  <span className="font-semibold">{user.certifications.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
