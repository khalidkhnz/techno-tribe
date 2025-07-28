import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserRole } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, ...rest } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new this.userModel({
      ...rest,
      email,
      password: hashedPassword,
    });

    return user.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByCustomUrl(customUrl: string): Promise<User | null> {
    return this.userModel.findOne({ customUrl }).exec();
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

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByRole(role: UserRole): Promise<User[]> {
    return this.userModel.find({ role }).exec();
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    // If password is being updated, hash it
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await this.userModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    // Check if customUrl is being updated and if it's already taken
    if (updateProfileDto.customUrl) {
      const existingUser = await this.findByCustomUrl(updateProfileDto.customUrl);
      if (existingUser && (existingUser._id as any).toString() !== userId) {
        throw new ConflictException('Custom URL is already taken');
      }
    }

    // Check if email is being updated and if it's already taken
    if (updateProfileDto.email) {
      const existingUser = await this.findByEmail(updateProfileDto.email);
      if (existingUser && (existingUser._id as any).toString() !== userId) {
        throw new ConflictException('Email is already taken');
      }
    }

    // Determine if profile is complete
    const profileFields = [
      'bio', 'location', 'skills', 'experienceLevel', 'yearsOfExperience',
      'currentCompany', 'currentPosition', 'education', 'certifications'
    ];
    
    const isProfileComplete = profileFields.every(field => 
      updateProfileDto[field] && 
      (Array.isArray(updateProfileDto[field]) ? updateProfileDto[field].length > 0 : true)
    );

    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { 
        ...updateProfileDto,
        isProfileComplete: isProfileComplete || false
      },
      { new: true }
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async incrementProfileViews(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(
      userId,
      { $inc: { profileViews: 1 } }
    );
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }
}
