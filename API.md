# CodeAxis Platform - API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication via JWT token stored in HTTP-only cookie.

### Login
```http
POST /api/auth
Content-Type: application/json

{
  "action": "login",
  "email": "user@example.com",
  "password": "password123"
}
```

### Register
```http
POST /api/auth
Content-Type: application/json

{
  "action": "register",
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "CLIENT" // or "FREELANCER", "STUDENT"
}
```

### Logout
```http
DELETE /api/auth
```

---

## Projects

### Get All Projects
```http
GET /api/projects?page=1&limit=10&status=OPEN&category=Web%20Development
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `status` (string): DRAFT, OPEN, IN_PROGRESS, IN_REVIEW, COMPLETED, CANCELLED, PAUSED
- `category` (string): Filter by category
- `skills` (string): Comma-separated skills
- `minBudget` (number): Minimum budget
- `maxBudget` (number): Maximum budget
- `sortBy` (string): Field to sort by (default: createdAt)
- `order` (string): asc or desc (default: desc)

**Response:**
```json
{
  "projects": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

### Create Project
```http
POST /api/projects
Authorization: Required
Content-Type: application/json

{
  "title": "E-commerce Website",
  "description": "Need a full-featured e-commerce site...",
  "category": "Web Development",
  "skills": ["React", "Node.js", "MongoDB"],
  "budgetType": "FIXED",
  "budgetAmount": 5000,
  "budgetCurrency": "USD",
  "estimatedDuration": 60,
  "deadline": "2024-12-31",
  "priority": "HIGH",
  "tags": ["ecommerce", "urgent"],
  "isUrgent": true
}
```

### Get Project by ID
```http
GET /api/projects/{id}
```

### Update Project
```http
PUT /api/projects/{id}
Authorization: Required (Owner or Admin)
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "IN_PROGRESS",
  "progress": 50
}
```

### Delete Project
```http
DELETE /api/projects/{id}
Authorization: Required (Owner or Admin)
```

### Submit Proposal
```http
POST /api/projects/{id}/proposals
Authorization: Required (Freelancer only)
Content-Type: application/json

{
  "coverLetter": "I am interested in this project...",
  "proposedRate": 4500,
  "estimatedDuration": 55
}
```

### Get Project Proposals
```http
GET /api/projects/{id}/proposals
Authorization: Required (Project Owner or Admin)
```

---

## Courses

### Get All Courses
```http
GET /api/courses?page=1&limit=12&category=Web%20Development&level=BEGINNER
```

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `category` (string): Filter by category
- `level` (string): BEGINNER, INTERMEDIATE, ADVANCED
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `search` (string): Search in title, description, tags
- `featured` (boolean): Show only featured courses
- `sortBy` (string): Field to sort by
- `order` (string): asc or desc

**Response:**
```json
{
  "courses": [...],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 100,
    "pages": 9
  }
}
```

### Create Course
```http
POST /api/courses
Authorization: Required (Freelancer or Admin)
Content-Type: application/json

{
  "title": "Complete React Course",
  "description": "Master React from basics to advanced...",
  "shortDescription": "Learn React from scratch",
  "category": "Web Development",
  "subcategory": "Frontend",
  "level": "BEGINNER",
  "language": "English",
  "thumbnail": "https://example.com/image.jpg",
  "price": 49.99,
  "originalPrice": 99.99,
  "duration": 1200,
  "certificate": true,
  "hasSubtitles": true,
  "requirements": ["Basic HTML", "JavaScript fundamentals"],
  "whatYouWillLearn": ["Build React apps", "Master Hooks"],
  "targetAudience": ["Beginner developers"],
  "tags": ["React", "JavaScript"]
}
```

### Get Course by ID
```http
GET /api/courses/{id}
```

### Update Course
```http
PUT /api/courses/{id}
Authorization: Required (Instructor or Admin)
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 39.99,
  "isPublished": true
}
```

### Delete Course
```http
DELETE /api/courses/{id}
Authorization: Required (Instructor or Admin)
```

### Enroll in Course
```http
POST /api/courses/{id}/enroll
Authorization: Required
```

### Unenroll from Course
```http
DELETE /api/courses/{id}/enroll
Authorization: Required
```

---

## Freelancers

### Get All Freelancers
```http
GET /api/freelancers?page=1&limit=12&skills=React,Node.js&availability=AVAILABLE
```

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `skills` (string): Comma-separated skills
- `minRate` (number): Minimum hourly rate
- `maxRate` (number): Maximum hourly rate
- `availability` (string): AVAILABLE, BUSY
- `location` (string): Filter by location
- `rating` (number): Minimum rating
- `search` (string): Search in name, bio, skills
- `sortBy` (string): Field to sort by
- `order` (string): asc or desc

**Response:**
```json
{
  "freelancers": [...],
  "pagination": {...},
  "filters": {
    "availableSkills": ["React", "Node.js", ...],
    "locations": ["New York", "London", ...],
    "experienceLevels": [...],
    "availabilityOptions": [...]
  }
}
```

---

## Messages

### Get Conversations
```http
GET /api/messages
Authorization: Required
```

### Get Messages with User
```http
GET /api/messages?with={userId}&page=1&limit=50
Authorization: Required
```

### Send Message
```http
POST /api/messages
Authorization: Required
Content-Type: application/json

{
  "recipientId": "user_id",
  "content": "Hello, I'm interested in your project",
  "type": "TEXT",
  "projectId": "project_id" // optional
}
```

### Mark Messages as Read
```http
PUT /api/messages?action=mark-read&sender={userId}
Authorization: Required
```

---

## User Profile

### Get Current User Profile
```http
GET /api/users/profile
Authorization: Required
```

### Update Profile
```http
PUT /api/users/profile
Authorization: Required
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "avatar": "https://example.com/avatar.jpg",
  "profile": {
    "bio": "Experienced developer...",
    "location": "New York, USA",
    "skills": ["React", "Node.js"],
    "hourlyRate": 85,
    "availability": "AVAILABLE",
    "timezone": "EST",
    "languages": ["English", "Spanish"]
  }
}
```

---

## Dashboard

### Get Dashboard Data
```http
GET /api/dashboard
Authorization: Required
```

Returns role-specific dashboard data:
- **Client**: Projects, spending, active projects
- **Freelancer**: Projects, earnings, available projects, courses
- **Student**: Enrolled courses, progress, recommendations
- **Admin**: Platform statistics, users, projects, courses

---

## Student Registration

### Register as Student
```http
POST /api/student-registration
Content-Type: application/json

{
  "personalInfo": {
    "firstName": "Emma",
    "lastName": "Student",
    "email": "emma@example.com",
    "phone": "+1234567890",
    "dateOfBirth": "2000-01-01"
  },
  "coursePreferences": ["Web Development", "Mobile Development"],
  "skillLevel": "beginner",
  "learningGoals": ["Career change", "Skill improvement"],
  "timeCommitment": "10-15 hours/week",
  "preferredLearningStyle": ["Video tutorials", "Hands-on projects"],
  "motivation": "I want to become a professional developer...",
  "password": "password123",
  "agreeToTerms": true
}
```

### Get Registration Stats
```http
GET /api/student-registration?stats=true
```

---

## File Upload

### Upload File
```http
POST /api/upload
Authorization: Required
Content-Type: multipart/form-data

{
  "file": <file>,
  "type": "avatar" // or "project", "course", "document"
}
```

**Response:**
```json
{
  "message": "File uploaded successfully",
  "file": {
    "url": "https://cloudinary.com/...",
    "publicId": "codeaxis/avatars/...",
    "type": "image/jpeg",
    "size": 123456,
    "name": "avatar.jpg"
  }
}
```

### Delete File
```http
DELETE /api/upload?publicId={cloudinary_public_id}
Authorization: Required
```

---

## System

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected",
  "version": "1.0.0"
}
```

### Initialize Database
```http
POST /api/init
```

Creates sample users, projects, and courses. Only works if database is empty.

### Check Database Status
```http
GET /api/init
```

**Response:**
```json
{
  "initialized": true,
  "stats": {
    "users": 6,
    "projects": 2,
    "courses": 2
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error",
  "details": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 409 Conflict
```json
{
  "error": "User already exists"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding rate limiting middleware.

## CORS

CORS is configured to allow requests from the same origin. For production with separate frontend, update CORS settings.

## Pagination

All list endpoints support pagination with the following parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default varies by endpoint)

Response includes pagination metadata:
```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## Filtering and Sorting

Most list endpoints support:
- **Filtering**: Query parameters for specific fields
- **Sorting**: `sortBy` and `order` parameters
- **Search**: `search` parameter for text search

## WebSocket (Future)

Real-time features like messaging and notifications will use WebSocket connections. Implementation coming soon.
