import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../users/dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { CompleteRecruiterProfileDto } from './dto/complete-recruiter-profile.dto';
import { CompleteDeveloperProfileDto } from './dto/complete-developer-profile.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password, firstName, lastName, role, company } = signupDto;

    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser)
      throw new ConflictException('User with this email already exists');

    // Create user
    const user = await this.usersService.create({
      email,
      password,
      firstName,
      lastName,
      role,
      // Add company to user profile if provided (for recruiters)
      ...(company && { currentCompany: company }),
    });

    // Generate tokens
    const payload = {
      email: user.email,
      sub: user._id,
      userId: user._id,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Store refresh token
    await this.usersService.updateRefreshToken(
      (user._id as any).toString(),
      refreshToken,
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: (user._id as any).toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    await this.usersService.updateLastLogin(user._id);

    const payload = {
      email: user.email,
      sub: user._id,
      userId: user._id,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Store refresh token
    await this.usersService.updateRefreshToken(user._id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar,
        isProfileComplete: user.isProfileComplete,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = (await this.usersService.findByEmail(payload.email)) as User;

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload = {
        email: user.email,
        sub: user._id,
        userId: user._id,
        role: user.role,
      };

      const newAccessToken = this.jwtService.sign(newPayload);
      const newRefreshToken = this.jwtService.sign(newPayload, {
        expiresIn: '7d',
      });

      // Update refresh token
      await this.usersService.updateRefreshToken(
        (user._id as any).toString(),
        newRefreshToken,
      );

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    await this.usersService.removeRefreshToken(userId);
    return { message: 'Logged out successfully' };
  }

  async completeRecruiterProfile(
    userId: string,
    profileData: CompleteRecruiterProfileDto,
  ) {
    // Update user profile with recruiter-specific information
    const updatedUser = await this.usersService.updateRecruiterProfile(
      userId,
      profileData,
    );

    return {
      message: 'Recruiter profile completed successfully',
      user: {
        id: (updatedUser._id as any).toString(),
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        role: updatedUser.role,
        company: updatedUser.currentCompany,
        profileCompleted: true,
      },
    };
  }

  async completeDeveloperProfile(
    userId: string,
    profileData: CompleteDeveloperProfileDto,
  ) {
    // Update user profile with developer-specific information
    const updatedUser = await this.usersService.updateDeveloperProfile(
      userId,
      profileData,
    );

    return {
      message: 'Developer profile completed successfully',
      user: {
        id: (updatedUser._id as any).toString(),
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        role: updatedUser.role,
        customUrl: updatedUser.customUrl,
        profileCompleted: true,
      },
    };
  }
}
