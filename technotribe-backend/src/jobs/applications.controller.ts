import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/application.dto';
import { UpdateApplicationDto } from './dto/application.dto';
import { ApplicationResponseDto } from './dto/application.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Apply for a job' })
  @ApiResponse({
    status: 201,
    description: 'Application submitted successfully',
    type: ApplicationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error or job not published',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 409,
    description: 'Already applied to this job',
  })
  async apply(
    @Request() req,
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<ApplicationResponseDto> {
    const application = await this.applicationsService.createApplication(
      createApplicationDto,
      req.user.userId,
    );
    return new ApplicationResponseDto(application);
  }

  @Get('my-applications')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user applications' })
  @ApiResponse({
    status: 200,
    description: 'Applications retrieved successfully',
    type: [ApplicationResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getMyApplications(@Request() req): Promise<ApplicationResponseDto[]> {
    const applications =
      await this.applicationsService.getApplicationsByApplicant(
        req.user.userId,
      );
    return applications.map((app) => new ApplicationResponseDto(app));
  }

  @Get('job/:jobId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RECRUITER)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get applications for a job (Recruiter only)' })
  @ApiParam({
    name: 'jobId',
    description: 'Job ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Applications retrieved successfully',
    type: [ApplicationResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Recruiter access required',
  })
  @ApiResponse({
    status: 404,
    description: 'Job not found or no permission',
  })
  async getJobApplications(
    @Request() req,
    @Param('jobId') jobId: string,
  ): Promise<ApplicationResponseDto[]> {
    const applications = await this.applicationsService.getApplicationsByJob(
      jobId,
      req.user.userId,
    );
    return applications.map((app) => new ApplicationResponseDto(app));
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RECRUITER)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update application status (Recruiter only)' })
  @ApiParam({
    name: 'id',
    description: 'Application ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Application status updated successfully',
    type: ApplicationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error or no permission',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Recruiter access required',
  })
  @ApiResponse({
    status: 404,
    description: 'Application not found',
  })
  async updateApplicationStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ): Promise<ApplicationResponseDto> {
    const application = await this.applicationsService.updateApplicationStatus(
      id,
      updateApplicationDto,
      req.user.userId,
    );
    return new ApplicationResponseDto(application);
  }

  @Put(':id/view')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RECRUITER)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Mark application as viewed (Recruiter only)' })
  @ApiParam({
    name: 'id',
    description: 'Application ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Application marked as viewed',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - no permission',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Recruiter access required',
  })
  @ApiResponse({
    status: 404,
    description: 'Application not found',
  })
  async markAsViewed(
    @Request() req,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    await this.applicationsService.markApplicationAsViewed(id, req.user.userId);
    return { message: 'Application marked as viewed' };
  }

  @Put(':id/withdraw')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Withdraw application' })
  @ApiParam({
    name: 'id',
    description: 'Application ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Application withdrawn successfully',
    type: ApplicationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - cannot withdraw or no permission',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Application not found',
  })
  async withdrawApplication(
    @Request() req,
    @Param('id') id: string,
  ): Promise<ApplicationResponseDto> {
    const application = await this.applicationsService.withdrawApplication(
      id,
      req.user.userId,
    );
    return new ApplicationResponseDto(application);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get application by ID' })
  @ApiParam({
    name: 'id',
    description: 'Application ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Application retrieved successfully',
    type: ApplicationResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Application not found',
  })
  async getApplication(
    @Param('id') id: string,
  ): Promise<ApplicationResponseDto> {
    const application = await this.applicationsService.getApplicationById(id);
    return new ApplicationResponseDto(application);
  }
}
