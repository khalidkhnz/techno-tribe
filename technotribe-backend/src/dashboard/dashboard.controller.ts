import {
  Controller,
  Get,
  Request,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('recruiter')
  @UseGuards(RolesGuard)
  @Roles(UserRole.RECRUITER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get recruiter dashboard data' })
  @ApiResponse({
    status: 200,
    description: 'Recruiter dashboard data retrieved successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - User is not a recruiter',
  })
  async getRecruiterDashboard(@Request() req) {
    try {
      const userId = req.user.userId;
      return await this.dashboardService.getRecruiterDashboard(userId);
    } catch (error) {
      throw new ForbiddenException('Access denied');
    }
  }

  @Get('developer')
  @UseGuards(RolesGuard)
  @Roles(UserRole.DEVELOPER)
  @ApiOperation({ summary: 'Get developer dashboard data' })
  @ApiResponse({
    status: 200,
    description: 'Developer dashboard data retrieved successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - User is not a developer',
  })
  async getDeveloperDashboard(@Request() req) {
    try {
      const userId = req.user.userId;
      return await this.dashboardService.getDeveloperDashboard(userId);
    } catch (error) {
      throw new ForbiddenException('Access denied');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get dashboard data based on user role' })
  @ApiResponse({
    status: 200,
    description: 'Dashboard data retrieved successfully',
  })
  async getDashboard(@Request() req) {
    const user = req.user;
    const userId = user.userId;
    const userRole = user.role;

    if (userRole === UserRole.RECRUITER || userRole === UserRole.ADMIN) {
      return await this.dashboardService.getRecruiterDashboard(userId);
    } else if (userRole === UserRole.DEVELOPER) {
      return await this.dashboardService.getDeveloperDashboard(userId);
    } else {
      throw new ForbiddenException('Invalid user role');
    }
  }
}
