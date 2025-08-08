import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';
import { UserRole } from '../src/users/schemas/user.schema';

async function createAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    // Check if admin already exists
    const existingAdmin = await usersService.findByEmail(
      'admin@TechnoTribes.com',
    );

    if (existingAdmin) {
      console.log('Admin user already exists!');
      return;
    }

    // Create admin user
    const adminUser = await usersService.create({
      email: 'admin@TechnoTribes.com',
      password: 'admin123456',
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
    });

    console.log('Admin user created successfully!');
    console.log('Email:', adminUser.email);
    console.log('Role:', adminUser.role);
    console.log('ID:', adminUser._id);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    await app.close();
  }
}

createAdmin();
