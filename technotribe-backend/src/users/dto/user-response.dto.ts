import { UserRole, AuthProvider, ExperienceLevel } from '../schemas/user.schema';

export class UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  authProvider: AuthProvider;
  avatar?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  // Developer Profile Fields
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

  constructor(user: any) {
    this.id = user._id || user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.authProvider = user.authProvider;
    this.avatar = user.avatar;
    this.isEmailVerified = user.isEmailVerified;
    this.isActive = user.isActive;
    this.lastLoginAt = user.lastLoginAt;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;

    // Developer Profile Fields
    this.customUrl = user.customUrl;
    this.bio = user.bio;
    this.location = user.location;
    this.website = user.website;
    this.skills = user.skills || [];
    this.experienceLevel = user.experienceLevel;
    this.yearsOfExperience = user.yearsOfExperience;
    this.currentCompany = user.currentCompany;
    this.currentPosition = user.currentPosition;
    this.education = user.education || [];
    this.certifications = user.certifications || [];
    this.portfolioLinks = user.portfolioLinks || [];
    this.socialLinks = user.socialLinks || [];
    this.isProfileComplete = user.isProfileComplete || false;
    this.profileViews = user.profileViews || 0;
  }
}
