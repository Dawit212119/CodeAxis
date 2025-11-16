# 🚀 Quick Start Guide

Get CodeAxis Platform running in 5 minutes!

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

This installs all packages and generates the Prisma client automatically.

## Step 2: Add Your Database (1 min)

Open `.env` file and replace the DATABASE_URL with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://username:password@host:5432/database?sslmode=require"
DIRECT_URL="postgresql://username:password@host:5432/database?sslmode=require"
```

**Don't have a PostgreSQL database?** Get a free one from:
- [Neon](https://neon.tech) - Free tier, instant setup
- [Supabase](https://supabase.com) - Free tier with dashboard
- [Railway](https://railway.app) - Free tier, easy deployment

## Step 3: Create Database Tables (1 min)

```bash
npm run db:push
```

This creates all necessary tables in your PostgreSQL database.

## Step 4: Start the Server (30 seconds)

```bash
npm run dev
```

Server starts at `http://localhost:3000`

## Step 5: Add Sample Data (30 seconds)

Open your browser and visit:
```
http://localhost:3000/api/init
```

Or use curl:
```bash
curl -X POST http://localhost:3000/api/init
```

This creates sample users, projects, and courses.

## 🎉 Done! You're Ready!

### Test the Application

1. **Visit the homepage**: http://localhost:3000
2. **Login**: http://localhost:3000/auth/signin
   - Use: `client@example.com` / `client123`
3. **View Dashboard**: http://localhost:3000/dashboard
4. **Browse Projects**: http://localhost:3000/api/projects
5. **Browse Courses**: http://localhost:3000/api/courses

### Default Login Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@codeaxis.com | admin123 |
| Client | client@example.com | client123 |
| Freelancer | sarah@example.com | password123 |
| Freelancer | marcus@example.com | password123 |
| Freelancer | priya@example.com | password123 |
| Student | student@example.com | student123 |

### Test API Endpoints

**Health Check:**
```bash
curl http://localhost:3000/api/health
```

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

## 🔧 Troubleshooting

### Database Connection Error
- Check your DATABASE_URL is correct
- Ensure your database is accessible
- Verify SSL mode if required

### Prisma Client Not Found
```bash
npm run db:generate
```

### Port 3000 Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### Reset Everything
```bash
# Reset database
npm run db:push -- --force-reset

# Reinitialize
curl -X POST http://localhost:3000/api/init
```

## 📚 Next Steps

- Read [SETUP.md](SETUP.md) for detailed setup instructions
- Check [API.md](API.md) for complete API documentation
- Explore the codebase and customize for your needs
- Deploy to production (see README.md)

## 🆘 Need Help?

1. Check the console for error messages
2. Verify database connection: `http://localhost:3000/api/health`
3. Ensure all environment variables are set
4. See [SETUP.md](SETUP.md) for detailed troubleshooting

---

**That's it!** You now have a fully functional freelance marketplace and learning platform running locally. 🎊
