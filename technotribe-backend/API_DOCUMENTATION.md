# TechnoTribe API Documentation

## Base URL

```
http://localhost:5000
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Endpoints

### Health Check

- **GET** `/health`
- **Description**: Check if the service is running
- **Response**:

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "TechnoTribe Backend",
  "version": "1.0.0"
}
```

### Authentication Endpoints

#### Login

- **POST** `/auth/login`
- **Description**: Authenticate user and get access token
- **Body**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- **Response**:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "developer",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

#### Refresh Token

- **POST** `/auth/refresh`
- **Description**: Get new access token using refresh token
- **Body**:

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

- **Response**:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Logout

- **POST** `/auth/logout`
- **Description**: Logout user and invalidate refresh token
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**:

```json
{
  "message": "Logged out successfully"
}
```

### User Endpoints

#### Create User

- **POST** `/users`
- **Description**: Create a new user account
- **Body**:

```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "developer",
  "authProvider": "email"
}
```

- **Response**: User object (without password)

#### Get Current User Profile

- **GET** `/users/profile`
- **Description**: Get current authenticated user's profile
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**: User object (without password)

#### Get All Users (Admin Only)

- **GET** `/users`
- **Description**: Get all users in the system
- **Headers**: `Authorization: Bearer <access_token>`
- **Required Role**: `admin`
- **Response**: Array of user objects

#### Get Users by Role (Admin Only)

- **GET** `/users/role/:role`
- **Description**: Get users filtered by role
- **Headers**: `Authorization: Bearer <access_token>`
- **Required Role**: `admin`
- **Parameters**: `role` - One of: `developer`, `recruiter`, `admin`
- **Response**: Array of user objects

#### Get User by ID (Admin Only)

- **GET** `/users/:id`
- **Description**: Get specific user by ID
- **Headers**: `Authorization: Bearer <access_token>`
- **Required Role**: `admin`
- **Response**: User object

#### Update User (Admin Only)

- **PUT** `/users/:id`
- **Description**: Update user information
- **Headers**: `Authorization: Bearer <access_token>`
- **Required Role**: `admin`
- **Body**: Partial user object (all fields optional)
- **Response**: Updated user object

#### Delete User (Admin Only)

- **DELETE** `/users/:id`
- **Description**: Delete user from system
- **Headers**: `Authorization: Bearer <access_token>`
- **Required Role**: `admin`
- **Response**: Success message

## User Roles

- **developer**: Job seekers looking for opportunities
- **recruiter**: Companies hiring talent
- **admin**: System administrators with full access

## Error Responses

### Validation Error (400)

```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

### Unauthorized (401)

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### Forbidden (403)

```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

### Not Found (404)

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

### Conflict (409)

```json
{
  "statusCode": 409,
  "message": "User with this email already exists",
  "error": "Conflict"
}
```

## Example Usage

### 1. Create a Developer Account

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

### 2. Login

```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "developer@example.com",
    "password": "password123"
  }'
```

### 3. Access Protected Endpoint

```bash
curl -X GET http://localhost:5000/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. Admin Access

```bash
# Login as admin
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@technotribe.com",
    "password": "admin123456"
  }'

# Get all users (admin only)
curl -X GET http://localhost:5000/users \
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN"
```
