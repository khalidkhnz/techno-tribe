"use client";

import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublicProfile } from "@/hooks/use-api";
import { UserRole, ExperienceLevel } from "@/types/enums";

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
  BarChart3,
  Code,
  Users,
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Building2,
  BriefcaseIcon,
  Target,
  Zap,
  Heart,
  MessageCircle,
  Phone,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Globe2,
  FileText,
  Download,
  ExternalLinkIcon
} from "lucide-react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  customUrl?: string;
  bio?: string;
  location?: string;
  website?: string;
  skills: string[];
  experienceLevel?: ExperienceLevel;
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
  // Recruiter specific fields
  companyName?: string;
  companySize?: string;
  industry?: string;
  hiringNeeds?: string[];
  totalHires?: number;
  averageTimeToHire?: number;
  successRate?: number;
  // Developer specific fields
  githubProfile?: string;
  linkedinProfile?: string;
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  availability?: string;
  remotePreference?: boolean;
  salaryExpectation?: string;
}

export default function PublicProfilePage() {
  const params = useParams();
  const customUrl = params.customUrl as string;
  
  const { data: profileData, isLoading, error } = usePublicProfile(customUrl);
  const user = profileData?.data;

  const getExperienceLevelLabel = (level: ExperienceLevel) => {
    const levelMap: Record<ExperienceLevel, string> = {
      [ExperienceLevel.JUNIOR]: "Junior",
      [ExperienceLevel.MID_LEVEL]: "Mid Level",
      [ExperienceLevel.SENIOR]: "Senior",
      [ExperienceLevel.LEAD]: "Lead",
      [ExperienceLevel.PRINCIPAL]: "Principal",
    };
    return levelMap[level] || level;
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.DEVELOPER:
        return <Code className="w-5 h-5" />;
      case UserRole.RECRUITER:
        return <Building2 className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.DEVELOPER:
        return "default";
      case UserRole.RECRUITER:
        return "secondary";
      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            {/* Header Skeleton */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <Skeleton className="w-24 h-24 rounded-full" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-24" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="w-16 h-16 text-muted-foreground" />
            <h1 className="text-3xl font-bold text-foreground">Profile Not Found</h1>
            <p className="text-lg text-muted-foreground max-w-md">
              The profile you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isDeveloper = user.role === UserRole.DEVELOPER;
  const isRecruiter = user.role === UserRole.RECRUITER;

  return (
    <div className="p-8 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        {/* Hero Header */}
        <Card className="mb-8 overflow-hidden border-0 shadow-lg">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 p-8">
            <div className="flex items-start gap-6">
              <Avatar className="w-28 h-28 border-4 border-background shadow-lg">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                  {getInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-4xl font-bold text-foreground">
                    {user.firstName} {user.lastName}
                  </h1>
                  <Badge variant={getRoleBadgeVariant(user.role)} className="text-sm">
                    {getRoleIcon(user.role)}
                    {user.role === UserRole.DEVELOPER ? "Developer" : "Recruiter"}
                  </Badge>
                  {user.experienceLevel && isDeveloper && (
                    <Badge variant="outline">
                      {getExperienceLevelLabel(user.experienceLevel)}
                    </Badge>
                  )}
                </div>
                
                {user.currentPosition && user.currentCompany && (
                  <p className="text-xl text-muted-foreground mb-2">
                    {user.currentPosition} at {user.currentCompany}
                  </p>
                )}
                
                {user.companyName && isRecruiter && (
                  <p className="text-xl text-muted-foreground mb-2">
                    {user.companyName}
                  </p>
                )}
                
                <div className="flex items-center gap-6 text-muted-foreground mb-4">
                  {user.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {user.location}
                    </div>
                  )}
                  {user.yearsOfExperience && isDeveloper && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {user.yearsOfExperience} years of experience
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {user.profileViews} profile views
                  </div>
                </div>
                
                {user.bio && (
                  <p className="text-foreground text-lg leading-relaxed mb-4">{user.bio}</p>
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
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Role-specific content */}
            {isDeveloper && (
              <>
                {/* Skills */}
                {user.skills && user.skills.length > 0 && (
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        Skills & Technologies
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                                           <div className="flex flex-wrap gap-2">
                       {user.skills.map((skill: string) => (
                         <Badge key={skill} variant="secondary" className="text-sm">
                           {skill}
                         </Badge>
                       ))}
                     </div>
                    </CardContent>
                  </Card>
                )}

                {/* Projects */}
                {user.projects && user.projects.length > 0 && (
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="w-5 h-5 text-blue-500" />
                        Featured Projects
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                                           <div className="space-y-4">
                       {user.projects.map((project: any, index: number) => (
                         <div key={index} className="p-4 border border-border rounded-lg">
                           <div className="flex items-start justify-between mb-2">
                             <h4 className="font-semibold text-foreground">{project.name}</h4>
                             {project.link && (
                               <Button variant="ghost" size="sm" asChild>
                                 <a href={project.link} target="_blank" rel="noopener noreferrer">
                                   <ExternalLinkIcon className="w-4 h-4" />
                                 </a>
                               </Button>
                             )}
                           </div>
                           <p className="text-muted-foreground mb-3">{project.description}</p>
                           <div className="flex flex-wrap gap-1">
                             {project.technologies.map((tech: string) => (
                               <Badge key={tech} variant="outline" className="text-xs">
                                 {tech}
                               </Badge>
                             ))}
                           </div>
                         </div>
                       ))}
                     </div>
                    </CardContent>
                  </Card>
                )}

                {/* Availability & Preferences */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-500" />
                      Availability & Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.availability && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Available:</span>
                          <span className="font-medium">{user.availability}</span>
                        </div>
                      )}
                      {user.remotePreference !== undefined && (
                        <div className="flex items-center gap-2">
                          <Globe2 className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Remote:</span>
                          <span className="font-medium">
                            {user.remotePreference ? "Yes" : "No"}
                          </span>
                        </div>
                      )}
                      {user.salaryExpectation && (
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Salary:</span>
                          <span className="font-medium">{user.salaryExpectation}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {isRecruiter && (
              <>
                {/* Company Info */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-blue-500" />
                      Company Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.companySize && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Company Size:</span>
                          <span className="font-medium">{user.companySize}</span>
                        </div>
                      )}
                      {user.industry && (
                        <div className="flex items-center gap-2">
                          <BriefcaseIcon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Industry:</span>
                          <span className="font-medium">{user.industry}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Hiring Stats */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-purple-500" />
                      Hiring Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {user.totalHires && (
                        <div className="text-center p-4 border border-border rounded-lg">
                          <div className="text-2xl font-bold text-primary">{user.totalHires}</div>
                          <div className="text-sm text-muted-foreground">Total Hires</div>
                        </div>
                      )}
                      {user.averageTimeToHire && (
                        <div className="text-center p-4 border border-border rounded-lg">
                          <div className="text-2xl font-bold text-primary">{user.averageTimeToHire} days</div>
                          <div className="text-sm text-muted-foreground">Avg. Time to Hire</div>
                        </div>
                      )}
                      {user.successRate && (
                        <div className="text-center p-4 border border-border rounded-lg">
                          <div className="text-2xl font-bold text-primary">{user.successRate}%</div>
                          <div className="text-sm text-muted-foreground">Success Rate</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Hiring Needs */}
                {user.hiringNeeds && user.hiringNeeds.length > 0 && (
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-500" />
                        Current Hiring Needs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                                           <div className="flex flex-wrap gap-2">
                       {user.hiringNeeds.map((need: string) => (
                         <Badge key={need} variant="secondary" className="text-sm">
                           {need}
                         </Badge>
                       ))}
                     </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Education */}
            {user.education && user.education.length > 0 && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-500" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                                     <div className="space-y-3">
                     {user.education.map((edu: string, index: number) => (
                       <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                         <GraduationCap className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                         <span className="text-foreground">{edu}</span>
                       </div>
                     ))}
                   </div>
                </CardContent>
              </Card>
            )}

            {/* Certifications */}
            {user.certifications && user.certifications.length > 0 && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {user.certifications.map((cert: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                        <Award className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        <span className="text-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Portfolio Links */}
            {user.portfolioLinks && user.portfolioLinks.length > 0 && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-blue-500" />
                    Portfolio & Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.portfolioLinks.map((link: string, index: number) => (
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
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                {user.website && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-foreground text-sm">
                      {user.website}
                    </a>
                  </div>
                )}
                <Button className="w-full" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Social Links */}
            {user.socialLinks && user.socialLinks.length > 0 && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Social
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.socialLinks.map((link: string, index: number) => (
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

            {/* Developer-specific social links */}
            {isDeveloper && (user.githubProfile || user.linkedinProfile) && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Professional Profiles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.githubProfile && (
                      <Button variant="outline" size="sm" asChild className="w-full justify-start">
                        <a href={user.githubProfile} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {user.linkedinProfile && (
                      <Button variant="outline" size="sm" asChild className="w-full justify-start">
                        <a href={user.linkedinProfile} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats */}
            <Card className="shadow-md">
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
                  <span className="font-semibold">{user.skills?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Education</span>
                  <span className="font-semibold">{user.education?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Certifications</span>
                  <span className="font-semibold">{user.certifications?.length || 0}</span>
                </div>
                {isDeveloper && user.projects && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Projects</span>
                    <span className="font-semibold">{user.projects.length}</span>
                  </div>
                )}
                {isRecruiter && user.totalHires && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Hires</span>
                    <span className="font-semibold">{user.totalHires}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Profile Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {user.isProfileComplete ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                    )}
                    <span className="text-sm">
                      {user.isProfileComplete ? "Profile Complete" : "Profile Incomplete"}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${user.isProfileComplete ? 100 : 75}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
