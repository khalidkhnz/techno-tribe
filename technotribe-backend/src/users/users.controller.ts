import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  Post,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UploadService } from './upload.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UploadResumeDto, UpdateProfileImagesDto } from './dto/upload-file.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './schemas/user.schema';
import { Resume } from './schemas/resume.schema';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly uploadService: UploadService
  ) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getProfile(@Request() req): ReturnType<UsersService['getUserProfile']> {
    const user = await this.usersService.getUserProfile(req.user.userId);
    return user;
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 409,
    description: 'Email or custom URL already taken',
  })
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ): ReturnType<UsersService['updateProfile']> {
    const user = await this.usersService.updateProfile(req.user.userId, updateProfileDto);
    return user;
  }

  @Get('profile/:customUrl')
  @ApiOperation({ summary: 'Get public profile by custom URL' })
  @ApiParam({
    name: 'customUrl',
    description: 'Custom URL of the profile',
    example: 'john-doe-dev',
  })
  @ApiResponse({
    status: 200,
    description: 'Public profile retrieved successfully',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Profile not found',
  })
  async getPublicProfile(@Param('customUrl') customUrl: string): ReturnType<UsersService['findByCustomUrl']> {
    const user = await this.usersService.findByCustomUrl(customUrl);
    if (!user) {
      throw new NotFoundException('Profile not found');
    }
    await this.usersService.incrementProfileViews((user._id as any).toString());
    return user;
  }

  @Post('update-profile-image')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update profile image URL' })
  @ApiResponse({
    status: 200,
    description: 'Profile image updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateProfileImage(
    @Request() req,
    @Body() body: { fileUrl: string },
  ) {
    await this.usersService.updateProfileImages(req.user.userId, {
      profileImage: body.fileUrl
    });

    return { message: 'Profile image updated successfully' };
  }

  @Post('update-cover-image')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update cover image URL' })
  @ApiResponse({
    status: 200,
    description: 'Cover image updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateCoverImage(
    @Request() req,
    @Body() body: { fileUrl: string },
  ) {
    await this.usersService.updateProfileImages(req.user.userId, {
      coverImage: body.fileUrl
    });

    return { message: 'Cover image updated successfully' };
  }

  @Post('add-resume')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Add resume from UploadThing' })
  @ApiResponse({
    status: 201,
    description: 'Resume added successfully',
    type: Resume,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async addResume(
    @Request() req,
    @Body() body: { 
      fileUrl: string;
      fileName: string;
      originalName: string;
      fileSize: number;
      mimeType: string;
      description?: string;
    },
  ) {
    const uploadResumeDto: UploadResumeDto = {
      fileUrl: body.fileUrl,
      fileName: body.fileName,
      originalName: body.originalName,
      fileSize: body.fileSize,
      mimeType: body.mimeType,
      description: body.description,
    };

    const resume = await this.usersService.uploadResume(req.user.userId, uploadResumeDto);
    return resume;
  }

  @Get('resumes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get user resumes' })
  @ApiResponse({
    status: 200,
    description: 'User resumes retrieved successfully',
    type: [Resume],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getUserResumes(@Request() req) {
    return this.usersService.getUserResumes(req.user.userId);
  }

  @Delete('resumes/:resumeId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'resumeId',
    description: 'Resume ID to delete',
  })
  @ApiOperation({ summary: 'Delete resume' })
  @ApiResponse({
    status: 200,
    description: 'Resume deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Resume not found',
  })
  async deleteResume(
    @Request() req,
    @Param('resumeId') resumeId: string,
  ) {
    await this.usersService.deleteResume(req.user.userId, resumeId);
    return { message: 'Resume deleted successfully' };
  }

  @Get('profile-with-resumes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get user profile with resumes' })
  @ApiResponse({
    status: 200,
    description: 'User profile with resumes retrieved successfully',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getProfileWithResumes(@Request() req) {
    return this.usersService.getUserProfileWithResumes(req.user.userId);
  }
}
