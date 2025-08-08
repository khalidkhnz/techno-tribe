# 🚀 Quick Start Guide

Get your TechnoTribes backend up and running in minutes!

## Prerequisites

- ✅ Node.js (v18 or higher)
- ✅ MongoDB (local or cloud)
- ✅ pnpm (recommended) or npm

## 1. Clone and Install

```bash
# Navigate to the backend directory
cd TechnoTribes-backend

# Install dependencies
pnpm install
```

## 2. Environment Setup

### Quick Setup (Recommended)

```bash
# Windows
setup-env.bat

# Linux/Mac
chmod +x setup-env.sh
./setup-env.sh
```

### Manual Setup

```bash
# Copy minimal environment file
cp env.minimal .env

# Edit .env file with your settings
```

## 3. Database Setup

### Local MongoDB

```bash
# Start MongoDB (if not running)
mongod
```

### MongoDB Atlas (Cloud)

Update your `.env` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/TechnoTribes
```

## 4. Create Admin User

```bash
pnpm run create-admin
```

This creates an admin user with:

- Email: `admin@TechnoTribes.com`
- Password: `admin123456`

## 5. Start Development Server

```bash
pnpm run start:dev
```

Your server will be running at: `http://localhost:5000`

## 6. Explore the API

### Interactive Documentation

Visit: `http://localhost:5000/api`

### Test Authentication

1. Go to `/auth/login` endpoint
2. Use admin credentials:
   ```json
   {
     "email": "admin@TechnoTribes.com",
     "password": "admin123456"
   }
   ```
3. Copy the `access_token`
4. Click "Authorize" and enter: `Bearer YOUR_TOKEN`

### Create a Developer Account

```bash
curl -X POST http://localhost:5000/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "developer@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Developer",
    "role": "developer"
  }'
```

## 7. Available Scripts

```bash
# Development
pnpm run start:dev          # Start with hot reload
pnpm run start:debug        # Start with debug mode

# Production
pnpm run build              # Build for production
pnpm run start:prod         # Start production server

# Testing
pnpm run test               # Run unit tests
pnpm run test:e2e           # Run e2e tests
pnpm run test:cov           # Run tests with coverage

# Code Quality
pnpm run lint               # Lint code
pnpm run format             # Format code

# Database
pnpm run create-admin       # Create admin user
```

## 8. Project Structure

```
src/
├── auth/                   # Authentication module
│   ├── dto/               # Auth DTOs
│   ├── guards/            # JWT and role guards
│   ├── strategies/        # Passport strategies
│   └── decorators/        # Custom decorators
├── users/                 # User management module
│   ├── dto/               # User DTOs
│   ├── schemas/           # MongoDB schemas
│   └── entities/          # User entities
├── common/                # Shared utilities
└── app.module.ts          # Main application module
```

## 9. Environment Variables

### Essential Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/TechnoTribes
JWT_SECRET=your-secret-key
```

### Optional Variables

```env
JWT_ACCESS_TOKEN_EXPIRES_IN=1h
JWT_REFRESH_TOKEN_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
CORS_ORIGIN=http://localhost:5000
```

## 10. Troubleshooting

### Common Issues

**Port already in use**

```bash
# Change port in .env file
PORT=5001
```

**MongoDB connection failed**

```bash
# Check if MongoDB is running
mongod --version

# Or use MongoDB Atlas
MONGODB_URI=mongodb+srv://...
```

**JWT token expired**

```bash
# Use refresh token endpoint
POST /auth/refresh
{
  "refresh_token": "your-refresh-token"
}
```

**Permission denied**

```bash
# Check user role
# Admin endpoints require admin role
```

## 11. Next Steps

- 📚 Read the [API Documentation](./API_DOCUMENTATION.md)
- 🔧 Explore the [Swagger Guide](./SWAGGER_GUIDE.md)
- 🚀 Check out the [README](./README.md)
- 💡 Review the [Environment Configuration](./env.example)

## 12. Support

- 📖 [NestJS Documentation](https://docs.nestjs.com)
- 🐛 [GitHub Issues](https://github.com/your-repo/issues)
- 💬 [Discord Community](https://discord.gg/nestjs)

---

🎉 **You're all set!** Your TechnoTribes backend is ready for development.
