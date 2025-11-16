# CodeAxis Platform - Complete Setup Guide

## 🚀 Quick Start

This guide will help you set up the CodeAxis platform with your PostgreSQL database.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (you'll provide the connection string)
- npm or yarn package manager

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages and automatically generate Prisma client.

## Step 2: Configure Database

1. Open the `.env` file in the root directory
2. Replace the `DATABASE_URL` and `DIRECT_URL` with your PostgreSQL connection string:

```env
DATABASE_URL="your-postgresql-connection-string-here"
DIRECT_URL="your-postgresql-connection-string-here"
```

Example format:
```
postgresql://username:password@host:5432/database?sslmode=require
```

## Step 3: Initialize Database Schema

Run Prisma migrations to create all database tables:

```bash
npm run db:push
```

This will create all the necessary tables in your PostgreSQL database:
- users
- user_profiles
- user_stats
- projects
- attachments
- milestones
- proposals
- courses
- lessons
- lesson_resources
- enrollments
- messages

## Step 4: Seed Database with Sample Data

Initialize the database with sample users, projects, and courses:

```bash
# Start the development server first
npm run dev

# Then in another terminal or browser, call the init endpoint:
curl -X POST http://localhost:3000/api/init
```

Or simply visit `http://localhost:3000/api/init` in your browser after starting the dev server.

This will create:
- **Admin user**: admin@codeaxis.com / admin123
- **Client user**: client@example.com / client123
- **Freelancer users**: 
  - sarah@example.com / password123
  - marcus@example.com / password123
  - priya@example.com / password123
- **Student user**: student@example.com / student123
- Sample projects and courses

## Step 5: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🎯 Testing the Application

### 1. Health Check
Visit: `http://localhost:3000/api/health`

Should return:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

### 2. Login
Visit: `http://localhost:3000/auth/signin`

Use any of the default accounts:
- Admin: admin@codeaxis.com / admin123
- Client: client@example.com / client123
- Freelancer: sarah@example.com / password123
- Student: student@example.com / student123

### 3. Test API Endpoints

**Get Projects:**
```bash
curl http://localhost:3000/api/projects
```

**Get Courses:**
```bash
curl http://localhost:3000/api/courses
```

**Get Freelancers:**
```bash
curl http://localhost:3000/api/freelancers
```

## 📁 Project Structure

```
codeaxis-platform/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication
│   │   ├── projects/          # Project management
│   │   ├── courses/           # Course management
│   │   ├── freelancers/       # Freelancer directory
│   │   ├── messages/          # Messaging system
│   │   ├── dashboard/         # Dashboard data
│   │   ├── upload/            # File uploads
│   │   ├── users/             # User management
│   │   ├── student-registration/ # Student onboarding
│   │   ├── init/              # Database initialization
│   │   └── health/            # Health check
│   ├── dashboard/             # Dashboard pages
│   ├── auth/                  # Auth pages
│   ├── learn/                 # Learning platform
│   ├── submit-project/        # Project submission
│   └── page.tsx               # Landing page
├── components/                # React components
├── lib/                       # Utilities and helpers
├── prisma/                    # Database schema
└── public/                    # Static assets
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Run migrations
npm run db:studio        # Open Prisma Studio (database GUI)

# Production
npm run build            # Build for production
npm run start            # Start production server

# Linting
npm run lint             # Run ESLint
```

## 🔐 API Authentication

Most API endpoints require authentication. After logging in, a JWT token is stored in an HTTP-only cookie.

### Protected Routes:
- `/api/projects` (POST) - Create project
- `/api/courses` (POST) - Create course
- `/api/messages` - Messaging
- `/api/dashboard` - Dashboard data
- `/api/users/profile` - User profile
- `/api/upload` - File uploads

### Public Routes:
- `/api/auth` - Login/Register
- `/api/projects` (GET) - Browse projects
- `/api/courses` (GET) - Browse courses
- `/api/freelancers` (GET) - Browse freelancers
- `/api/health` - Health check

## 📊 Database Schema Overview

### Core Models:
- **User**: Multi-role user system (CLIENT, FREELANCER, STUDENT, ADMIN)
- **UserProfile**: Extended user information
- **UserStats**: User statistics and ratings
- **Project**: Project listings and management
- **Proposal**: Freelancer proposals for projects
- **Course**: Learning platform courses
- **Lesson**: Course lessons and content
- **Enrollment**: Student course enrollments
- **Message**: Real-time messaging system

## 🎨 Frontend Features

### Landing Page
- Hero section with animations
- Feature showcase
- Project gallery
- Call-to-action sections

### Dashboard (Role-based)
- **Client**: Project management, freelancer hiring
- **Freelancer**: Available projects, earnings, courses
- **Student**: Enrolled courses, progress tracking
- **Admin**: Platform statistics and management

### Project Submission
- Multi-step form
- File attachments
- Budget and timeline configuration

### Learning Platform
- Course browsing and filtering
- Enrollment system
- Progress tracking

## 🔄 API Response Format

### Success Response:
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response:
```json
{
  "error": "Error message",
  "details": [ ... ]
}
```

### Pagination:
```json
{
  "items": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## 🐛 Troubleshooting

### Database Connection Issues
1. Verify your PostgreSQL connection string is correct
2. Ensure your database is accessible from your machine
3. Check if SSL mode is required: `?sslmode=require`

### Prisma Client Not Found
```bash
npm run db:generate
```

### Port Already in Use
Change the port in package.json or kill the process:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### Clear Database and Restart
```bash
# Reset database
npm run db:push -- --force-reset

# Reinitialize
curl -X POST http://localhost:3000/api/init
```

## 📝 Environment Variables

### Required:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens

### Optional:
- `CLOUDINARY_*` - For file uploads
- `SMTP_*` - For email notifications
- `STRIPE_*` - For payment processing

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- Railway
- Render
- AWS
- DigitalOcean

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify database connection
3. Ensure all environment variables are set
4. Check API health: `/api/health`

## 🎉 You're All Set!

Your CodeAxis platform is now ready to use. Visit `http://localhost:3000` to get started!
