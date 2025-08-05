import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { Resume } from './schemas/resume.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UploadResumeDto, UpdateProfileImagesDto } from './dto/upload-file.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { CompleteRecruiterProfileDto } from 'src/auth/dto/complete-recruiter-profile.dto';
import { CompleteDeveloperProfileDto } from 'src/auth/dto/complete-developer-profile.dto';
import { UploadService } from './upload.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Resume.name) private resumeModel: Model<Resume>,
    private uploadService: UploadService,
  ) {}

  generateCustomUrl(firstName: string, lastName: string): string {
    return `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${Date.now()}`;
  }

  async create(payload: SignupDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await this.userModel.create({
      email: payload.email,
      password: hashedPassword,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.role,
      customUrl: this.generateCustomUrl(payload.firstName, payload.lastName),
      ...(payload.company && { currentCompany: payload.company }),
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).populate('resumes');
    return user;
  }

  async findByCustomUrl(customUrl: string): Promise<User> {
    const user = await this.userModel
      .findOne({ customUrl })
      .populate('resumes');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserProfile(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).populate('resumes');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    if (updateProfileDto.customUrl) {
      const existingUser = await this.userModel.findOne({
        customUrl: updateProfileDto.customUrl,
      });
      if (existingUser && (existingUser._id as any).toString() !== userId) {
        throw new ConflictException('Custom URL is already taken');
      }
    }

    if (updateProfileDto.email) {
      const existingUser = await this.userModel.findOne({
        email: updateProfileDto.email,
      });
      if (existingUser && (existingUser._id as any).toString() !== userId) {
        throw new ConflictException('Email is already taken');
      }
    }

    // Get user to determine role for profile completion check
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let isProfileComplete = false;

    if (user.role === 'developer') {
      const developerProfileFields = [
        'bio',
        'location',
        'skills',
        'experienceLevel',
        'yearsOfExperience',
        'currentCompany',
        'currentPosition',
        'education',
        'certifications',
      ];

      isProfileComplete = developerProfileFields.every(
        (field) =>
          updateProfileDto[field] &&
          (Array.isArray(updateProfileDto[field])
            ? updateProfileDto[field].length > 0
            : true),
      );
    } else if (user.role === 'recruiter') {
      const recruiterProfileFields = [
        'company',
        'industry',
        'jobTitle',
        'phone',
        'linkedin',
      ];

      isProfileComplete = recruiterProfileFields.every(
        (field) =>
          updateProfileDto[field] &&
          (Array.isArray(updateProfileDto[field])
            ? updateProfileDto[field].length > 0
            : true),
      );
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        ...updateProfileDto,
        isProfileComplete: isProfileComplete || false,
      },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async incrementProfileViews(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $inc: { profileViews: 1 },
    });
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken });
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken: null });
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { lastLoginAt: new Date() });
  }

  async updateRecruiterProfile(
    userId: string,
    profileData: CompleteRecruiterProfileDto,
  ): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'recruiter') {
      throw new ConflictException('User is not a recruiter');
    }

    const updateData = {
      currentCompany: profileData.company,
      companyWebsite: profileData.companyWebsite,
      companyDescription: profileData.companyDescription,
      companySize: profileData.companySize,
      industry: profileData.industry,
      currentPosition: profileData.jobTitle,
      phone: profileData.phone,
      linkedin: profileData.linkedin,
      isProfileComplete: true,
    };

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async updateDeveloperProfile(
    userId: string,
    profileData: CompleteDeveloperProfileDto,
  ): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'developer') {
      throw new ConflictException('User is not a developer');
    }

    // Check if custom URL is already taken by another user
    if (profileData.customUrl) {
      const existingUser = await this.userModel.findOne({
        customUrl: profileData.customUrl,
      });
      if (existingUser && (existingUser._id as any).toString() !== userId) {
        throw new ConflictException('Custom URL is already taken');
      }
    }

    const updateData = {
      customUrl: profileData.customUrl,
      bio: profileData.bio,
      location: profileData.location,
      website: profileData.website,
      skills: profileData.skills || [],
      experienceLevel: profileData.experienceLevel,
      yearsOfExperience: profileData.yearsOfExperience,
      currentCompany: profileData.currentCompany,
      currentPosition: profileData.currentPosition,
      education: profileData.education || [],
      certifications: profileData.certifications || [],
      portfolioLinks: profileData.portfolioLinks || [],
      socialLinks: profileData.socialLinks || [],
      isProfileComplete: true,
    };

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  // Resume Management Methods
  async uploadResume(
    userId: string,
    uploadResumeDto: UploadResumeDto,
  ): Promise<Resume> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Calculate expiration date (3 months from now)
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 3);

    const resume = await this.resumeModel.create({
      userId: new Types.ObjectId(userId),
      fileName: uploadResumeDto.fileName,
      originalName: uploadResumeDto.originalName,
      fileUrl: uploadResumeDto.fileUrl,
      fileSize: uploadResumeDto.fileSize,
      mimeType: uploadResumeDto.mimeType,
      uploadedAt: new Date(),
      expiresAt,
      description: uploadResumeDto.description,
    });

    // Add resume to user's resumes array
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { resumes: resume._id },
    });

    return resume;
  }

  async getUserResumes(userId: string): Promise<Resume[]> {
    const resumes = await this.resumeModel
      .find({
        userId: new Types.ObjectId(userId),
        isActive: true,
        expiresAt: { $gt: new Date() },
      })
      .sort({ uploadedAt: -1 });

    return resumes;
  }

  async deleteResume(userId: string, resumeId: string): Promise<void> {
    const resume = await this.resumeModel.findOne({
      _id: resumeId,
      userId: new Types.ObjectId(userId),
    });

    if (!resume) {
      throw new NotFoundException('Resume not found');
    }

    // Delete file from storage
    await this.uploadService.deleteFile(resume.fileUrl);

    // Mark resume as inactive
    await this.resumeModel.findByIdAndUpdate(resumeId, { isActive: false });

    // Remove from user's resumes array
    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { resumes: resumeId },
    });
  }

  async updateProfileImages(
    userId: string,
    updateProfileImagesDto: UpdateProfileImagesDto,
  ): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updateData: any = {};

    if (updateProfileImagesDto.profileImage) {
      updateData.profileImage = updateProfileImagesDto.profileImage;
    }

    if (updateProfileImagesDto.coverImage) {
      updateData.coverImage = updateProfileImagesDto.coverImage;
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async getUserProfileWithResumes(userId: string): Promise<User> {
    const user = await this.userModel
      .findById(userId)
      .populate('resumes')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
