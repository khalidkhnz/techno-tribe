import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { CompleteRecruiterProfileDto } from './dto/complete-recruiter-profile.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import {
  LoginResponseDto,
  SignupResponseDto,
  RefreshTokenResponseDto,
  LogoutResponseDto,
} from './dto/auth-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: SignupResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error',
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  async signup(@Body() signupDto: SignupDto): ReturnType<AuthService['signup']> {
    const response = await this.authService.signup(signupDto)
    return response;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(@Body() loginDto: LoginDto): ReturnType<AuthService['login']> {
    const response = await this.authService.login(loginDto)
    return response;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed',
    type: RefreshTokenResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid refresh token',
  })
  async refresh(
    @Body() body: RefreshTokenDto,
  ): ReturnType<AuthService['refreshToken']> {
    const response = await this.authService.refreshToken(body.refresh_token)
    return response;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged out',
    type: LogoutResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async logout(@Request() req): ReturnType<AuthService['logout']> {
    const response = await this.authService.logout(req.user.userId)
    return response
  }

  @Put('complete-recruiter-profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Complete recruiter profile' })
  @ApiResponse({
    status: 200,
    description: 'Recruiter profile completed successfully',
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
    status: 403,
    description: 'User is not a recruiter',
  })
  async completeRecruiterProfile(
    @Request() req,
    @Body() profileData: CompleteRecruiterProfileDto,
  ) {
    const response = await this.authService.completeRecruiterProfile(
      req.user.userId,
      profileData,
    );
    return response;
  }
}
