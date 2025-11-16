# ✅ Setup Checklist

Use this checklist to ensure everything is set up correctly.

## Pre-Setup

- [ ] Node.js 18+ installed
- [ ] PostgreSQL database ready (or account on Neon/Supabase/Railway)
- [ ] Code editor installed (VS Code recommended)
- [ ] Terminal/Command Prompt ready

## Installation

- [ ] Run `npm install`
- [ ] Verify no errors during installation
- [ ] Check that `node_modules` folder exists
- [ ] Prisma client generated automatically

## Database Configuration

- [ ] Open `.env` file
- [ ] Add PostgreSQL connection string to `DATABASE_URL`
- [ ] Add same connection string to `DIRECT_URL`
- [ ] Save the file
- [ ] Connection string format: `postgresql://user:password@host:5432/database?sslmode=require`

## Database Setup

- [ ] Run `npm run db:push`
- [ ] Verify all tables created successfully
- [ ] Check for any error messages
- [ ] Confirm Prisma client is up to date

## Start Server

- [ ] Run `npm run dev`
- [ ] Server starts without errors
- [ ] Visit `http://localhost:3000`
- [ ] Homepage loads successfully

## Initialize Database

- [ ] Visit `http://localhost:3000/api/init` OR
- [ ] Run `curl -X POST http://localhost:3000/api/init`
- [ ] Verify success message
- [ ] Check that sample data was created

## Test API Endpoints

- [ ] Health Check: `http://localhost:3000/api/health`
  - Should return: `{"status": "healthy", "database": "connected"}`
  
- [ ] Projects: `http://localhost:3000/api/projects`
  - Should return: List of 2 sample projects
  
- [ ] Courses: `http://localhost:3000/api/courses`
  - Should return: List of 2 sample courses
  
- [ ] Freelancers: `http://localhost:3000/api/freelancers`
  - Should return: List of 3 freelancers

## Test Authentication

- [ ] Visit `http://localhost:3000/auth/signin`
- [ ] Login with: `client@example.com` / `client123`
- [ ] Redirected to dashboard
- [ ] Dashboard loads with data
- [ ] Logout works

## Test Each Role

### Client Account
- [ ] Login: `client@example.com` / `client123`
- [ ] Dashboard shows client data
- [ ] Can view projects
- [ ] Can submit new project

### Freelancer Account
- [ ] Login: `sarah@example.com` / `password123`
- [ ] Dashboard shows freelancer data
- [ ] Can view available projects
- [ ] Can view earnings

### Student Account
- [ ] Login: `student@example.com` / `student123`
- [ ] Dashboard shows student data
- [ ] Can view courses
- [ ] Can enroll in courses

### Admin Account
- [ ] Login: `admin@codeaxis.com` / `admin123`
- [ ] Dashboard shows admin data
- [ ] Can view all statistics
- [ ] Has access to all features

## Test Core Features

### Projects
- [ ] Browse projects page works
- [ ] Can filter projects
- [ ] Can view project details
- [ ] Can create new project (as client)
- [ ] Can submit proposal (as freelancer)

### Courses
- [ ] Browse courses page works
- [ ] Can filter courses
- [ ] Can view course details
- [ ] Can enroll in course (as student)
- [ ] Can create course (as freelancer/admin)

### Messaging
- [ ] Can access messages
- [ ] Can send message
- [ ] Can view conversations
- [ ] Messages marked as read

### Profile
- [ ] Can view profile
- [ ] Can edit profile
- [ ] Changes save successfully
- [ ] Avatar upload works (if Cloudinary configured)

## Optional Features

### File Upload (Requires Cloudinary)
- [ ] Add Cloudinary credentials to `.env`
- [ ] Test avatar upload
- [ ] Test document upload
- [ ] Files appear in Cloudinary dashboard

### Email (Requires SMTP)
- [ ] Add SMTP credentials to `.env`
- [ ] Test welcome email
- [ ] Test notification email

## Production Readiness

- [ ] Change `JWT_SECRET` to secure random string
- [ ] Change `NEXTAUTH_SECRET` to secure random string
- [ ] Set `NODE_ENV=production`
- [ ] Configure production database
- [ ] Set up error logging
- [ ] Configure monitoring
- [ ] Set up backups
- [ ] Test all features in production

## Documentation Review

- [ ] Read [README.md](README.md)
- [ ] Read [QUICKSTART.md](QUICKSTART.md)
- [ ] Read [SETUP.md](SETUP.md)
- [ ] Read [API.md](API.md)
- [ ] Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

## Troubleshooting

If any step fails:

1. **Check Console Errors**
   - Look for error messages in terminal
   - Check browser console for frontend errors

2. **Verify Database Connection**
   - Test: `http://localhost:3000/api/health`
   - Should show "connected"

3. **Check Environment Variables**
   - Ensure `.env` file exists
   - Verify all required variables are set

4. **Regenerate Prisma Client**
   ```bash
   npm run db:generate
   ```

5. **Reset Database**
   ```bash
   npm run db:push -- --force-reset
   curl -X POST http://localhost:3000/api/init
   ```

6. **Clear Node Modules**
   ```bash
   rm -rf node_modules
   npm install
   ```

## Success Criteria

✅ All checkboxes above are checked
✅ No errors in console
✅ All API endpoints return data
✅ Can login with all account types
✅ Dashboard loads for each role
✅ Can perform CRUD operations

## 🎉 Congratulations!

If all items are checked, your CodeAxis Platform is fully operational!

---

**Need Help?** Check [SETUP.md](SETUP.md) for detailed troubleshooting.
