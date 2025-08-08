# Swagger API Documentation Guide

## Overview

The TechnoTribes backend API is fully documented using Swagger/OpenAPI 3.0. This provides an interactive API documentation interface where you can explore, test, and understand all available endpoints.

## Accessing Swagger Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:5000/api
```

## Features

### 🔐 **Authentication**

- **Bearer Token Authentication**: All protected endpoints require a JWT token
- **Interactive Login**: Test authentication directly from the Swagger UI
- **Token Persistence**: Your authentication token is automatically saved and reused

### 📚 **Comprehensive Documentation**

- **Detailed Endpoint Descriptions**: Each endpoint has clear descriptions and examples
- **Request/Response Schemas**: Full schema definitions for all DTOs
- **Error Responses**: Documented error codes and messages
- **Parameter Validation**: Input validation rules and examples

### 🏷️ **Organized by Tags**

- **auth**: Authentication endpoints (login, logout, refresh token)
- **users**: User management endpoints
- **health**: Health check and system status

## How to Use Swagger UI

### 1. **Authentication**

1. Navigate to the `/auth/login` endpoint
2. Click "Try it out"
3. Enter your credentials:
   ```json
   {
     "email": "admin@TechnoTribes.com",
     "password": "admin123456"
   }
   ```
4. Click "Execute"
5. Copy the `access_token` from the response
6. Click the "Authorize" button at the top of the page
7. Enter: `Bearer YOUR_ACCESS_TOKEN`
8. Click "Authorize"

### 2. **Testing Protected Endpoints**

Once authenticated, you can:

- Test all protected endpoints
- View real-time responses
- See detailed error messages
- Explore different user roles and permissions

### 3. **API Exploration**

- **Expand/Collapse**: Click on any endpoint to see details
- **Try it out**: Test endpoints with real data
- **Schema**: View request/response schemas
- **Examples**: See example requests and responses

## Available Endpoints

### Authentication (`/auth`)

- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout

### Users (`/users`)

- `POST /users` - Create new user
- `GET /users/profile` - Get current user profile
- `GET /users` - Get all users (Admin only)
- `GET /users/role/:role` - Get users by role (Admin only)
- `GET /users/:id` - Get user by ID (Admin only)
- `PUT /users/:id` - Update user (Admin only)
- `DELETE /users/:id` - Delete user (Admin only)

### Health (`/`)

- `GET /` - Welcome message
- `GET /health` - Health check

## User Roles and Permissions

### Developer Role

- Can access their own profile
- Can login/logout
- Cannot access admin endpoints

### Recruiter Role

- Can access their own profile
- Can login/logout
- Cannot access admin endpoints

### Admin Role

- Full access to all endpoints
- Can manage all users
- Can view system statistics

## Example Workflows

### 1. **Create and Login as Developer**

```bash
# 1. Create a developer account
POST /users
{
  "email": "developer@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Developer",
  "role": "developer"
}

# 2. Login
POST /auth/login
{
  "email": "developer@example.com",
  "password": "password123"
}

# 3. Use the access_token to access protected endpoints
GET /users/profile
Authorization: Bearer <access_token>
```

### 2. **Admin User Management**

```bash
# 1. Login as admin
POST /auth/login
{
  "email": "admin@TechnoTribes.com",
  "password": "admin123456"
}

# 2. View all users
GET /users
Authorization: Bearer <admin_access_token>

# 3. Filter users by role
GET /users/role/developer
Authorization: Bearer <admin_access_token>

# 4. Update a user
PUT /users/:id
Authorization: Bearer <admin_access_token>
{
  "firstName": "Updated Name",
  "isActive": true
}
```

## Error Handling

The API returns standardized error responses:

- **400 Bad Request**: Validation errors
- **401 Unauthorized**: Invalid or missing authentication
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Resource already exists

## Development Tips

### 1. **Environment Setup**

Make sure you have a `.env` file with:

```env
MONGODB_URI=mongodb://localhost:27017/TechnoTribes
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
```

### 2. **Create Admin User**

```bash
pnpm run create-admin
```

### 3. **Start Development Server**

```bash
pnpm run start:dev
```

### 4. **Access Swagger**

Open your browser and go to: `http://localhost:5000/api`

## Troubleshooting

### Common Issues

1. **"Unauthorized" errors**
   - Make sure you're logged in
   - Check that your token hasn't expired
   - Verify the token format: `Bearer <token>`

2. **"Forbidden" errors**
   - Check your user role
   - Admin endpoints require admin privileges

3. **Validation errors**
   - Check the request body format
   - Ensure all required fields are provided
   - Verify data types and formats

### Getting Help

- Check the API responses for detailed error messages
- Use the Swagger UI to test endpoints step by step
- Review the request/response schemas for correct data formats

## API Versioning

The current API version is **1.0**. All endpoints are prefixed with `/api/v1` internally, but the Swagger documentation is accessible at `/api` for simplicity.

## Contributing

When adding new endpoints:

1. Add `@ApiTags()` decorator to controllers
2. Add `@ApiOperation()` and `@ApiResponse()` decorators to methods
3. Create proper DTOs with `@ApiProperty()` decorators
4. Update this documentation if needed
