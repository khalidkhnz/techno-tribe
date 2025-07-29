import {
  Controller,
  Get,
  Body,
  Param,
  Put,
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
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './schemas/user.schema';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
