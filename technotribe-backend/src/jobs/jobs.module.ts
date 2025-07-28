import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { Job, JobSchema } from './schemas/job.schema';
import { Application, ApplicationSchema } from './schemas/application.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
      { name: Application.name, schema: ApplicationSchema },
      { name: User.name, schema: UserSchema }
    ]),
    UsersModule,
  ],
  controllers: [JobsController, ApplicationsController],
  providers: [JobsService, ApplicationsService],
  exports: [JobsService, ApplicationsService],
})
export class JobsModule {}
