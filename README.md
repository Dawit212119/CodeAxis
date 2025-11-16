# CodeAxis Platform - Complete Full-Stack Application

A modern, comprehensive freelance marketplace and learning platform built with Next.js 14, TypeScript, PostgreSQL (Prisma), and cutting-edge technologies.

## ✨ Status: COMPLETE & READY TO USE

All backend functionality is implemented and connected to the frontend. Just add your PostgreSQL connection string and you're ready to go!

## 🚀 Features

### 🎯 Core Functionality
- ✅ **User Management**: Complete authentication, profiles, role-based access (Client/Freelancer/Student/Admin)
- ✅ **Project Marketplace**: Post projects, browse opportunities, proposal system with full CRUD
- ✅ **Learning Platform**: Course management, enrollment, progress tracking
- ✅ **Real-time Messaging**: Complete messaging system with conversations
- ✅ **File Management**: Cloudinary integration for uploads (avatar, documents, etc.)
- ✅ **Dashboard Analytics**: Role-specific dashboards with real-time insights
- ✅ **Freelancer Directory**: Browse and filter freelancers by skills, rate, availability
- ✅ **Student Registration**: Specialized onboarding flow for students

### 🛠️ Technical Features
- ✅ **Authentication**: JWT-based auth with HTTP-only cookies
- ✅ **Database**: PostgreSQL with Prisma ORM (fully typed)
- ✅ **API**: RESTful API with comprehensive Zod validation
- ✅ **Middleware**: Request authentication and authorization
- ✅ **File Upload**: Image and document handling with Cloudinary
- ✅ **Error Handling**: Comprehensive error management
- ✅ **TypeScript**: Full type safety throughout
- ✅ **Database Seeding**: Sample data initialization

## 🏗️ Architecture

### Frontend (Next.js 14)
- **App Router**: Modern Next.js routing
- **Server Components**: Optimized rendering
- **Client Components**: Interactive UI elements
- **TypeScript**: Complete type safety
- **Tailwind CSS**: Modern styling with animations
- **Framer Motion**: Advanced animations

### Backend (API Routes)
```
/api/
├── auth/              # Authentication endpoints
├── users/profile/     # User profile management
├── projects/          # Project CRUD operations
├── courses/           # Course management
├── freelancers/       # Freelancer directory
├── messages/          # Real-time messaging
├── upload/            # File upload handling
├── dashboard/         # Dashboard data
├── student-registration/ # Student onboarding
└── init/              # Database initialization
```

### Database Models
- **User**: Multi-role user system (Client/Freelancer/Student/Admin)
- **Project**: Complete project lifecycle management
- **Course**: Learning platform with lessons and resources
- **Message**: Real-time messaging system

## 🚦 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (you'll provide the connection string)
- npm or yarn

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Configure your PostgreSQL database**
Open `.env` file and add your PostgreSQL connection string:
```env
DATABASE_URL="your-postgresql-connection-string-here"
DIRECT_URL="your-postgresql-connection-string-here"
```

3. **Initialize database schema**
```bash
npm run db:push
```

4. **Start the development server**
```bash
npm run dev
```

5. **Seed database with sample data**
Visit `http://localhost:3000/api/init` in your browser or:
```bash
curl -X POST http://localhost:3000/api/init
```

### Default Accounts
After initialization, you can login with:

- **Admin**: admin@codeaxis.com / admin123
- **Client**: client@example.com / client123  
- **Freelancers**: 
  - sarah@example.com / password123
  - marcus@example.com / password123
  - priya@example.com / password123
- **Student**: student@example.com / student123

### 📚 Detailed Setup Guide
See [SETUP.md](SETUP.md) for complete setup instructions and troubleshooting.

## 📱 Application Flow

### For Clients
1. **Register/Login** → Complete profile
2. **Post Projects** → Define requirements, budget, timeline  
3. **Review Proposals** → Browse freelancer applications
4. **Hire & Collaborate** → Work with selected freelancer
5. **Track Progress** → Monitor project milestones
6. **Complete & Review** → Finalize project and provide feedback

### For Freelancers  
1. **Register/Login** → Build comprehensive profile
2. **Browse Projects** → Find matching opportunities
3. **Submit Proposals** → Apply with custom proposals
4. **Deliver Work** → Complete project milestones
5. **Get Paid** → Receive payments and build reputation
6. **Teach Courses** → Create and sell educational content

### For Students
1. **Register** → Specialized student onboarding
2. **Browse Courses** → Discover learning content
3. **Enroll & Learn** → Take courses and track progress
4. **Earn Certificates** → Complete courses for credentials
5. **Access Resources** → Download materials and resources

## 🔧 Development

### API Documentation
All API endpoints include:
- **Authentication**: JWT token validation
- **Validation**: Zod schema validation
- **Error Handling**: Comprehensive error responses
- **Type Safety**: Full TypeScript support

### Key Endpoints
```typescript
// Authentication
POST /api/auth - Login/Register/Logout

// User Management  
GET/PUT /api/users/profile - Profile management

// Projects
GET/POST /api/projects - Browse/Create projects
GET /api/freelancers - Browse freelancer directory

// Courses & Learning
GET/POST /api/courses - Course management
POST /api/student-registration - Student onboarding

// Communication
GET/POST /api/messages - Real-time messaging

// File Management
POST /api/upload - File upload to Cloudinary
DELETE /api/upload - File deletion

// Analytics
GET /api/dashboard - Role-specific dashboard data
```

### Database Schema
The application uses PostgreSQL with Prisma ORM. Schema includes:
- `users` - Multi-role user system with authentication
- `user_profiles` - Extended user information and preferences
- `user_stats` - User statistics, ratings, and achievements
- `projects` - Project listings with full lifecycle management
- `proposals` - Freelancer proposals for projects
- `milestones` - Project milestones and deliverables
- `attachments` - File attachments for projects
- `courses` - Learning platform courses
- `lessons` - Course lessons and content
- `lesson_resources` - Downloadable resources
- `enrollments` - Student course enrollments with progress
- `messages` - Real-time messaging system

See [prisma/schema.prisma](prisma/schema.prisma) for complete schema.

## 🌟 Advanced Features

### Real-time Features
- **Live Messaging**: WebSocket-based chat
- **Notifications**: Real-time updates
- **Status Updates**: Live project status changes

### Security
- **JWT Authentication**: Secure token-based auth
- **Role-based Access**: Granular permissions
- **Input Validation**: Comprehensive data validation
- **File Upload Security**: Type and size restrictions

### Performance
- **Server Components**: Optimized rendering
- **Image Optimization**: Next.js image handling
- **Database Indexing**: Optimized queries
- **Caching**: Strategic data caching

## 🚀 Deployment

### Production Setup
1. **Database**: PostgreSQL (Neon, Supabase, Railway, etc.)
2. **Environment**: Configure production environment variables
3. **File Storage**: Set up Cloudinary account (optional)
4. **Deploy**: Deploy to Vercel, Netlify, or your preferred platform

### Production Checklist
- [ ] PostgreSQL database configured
- [ ] DATABASE_URL environment variable set
- [ ] JWT_SECRET changed to secure random string
- [ ] Cloudinary configured for file uploads (optional)
- [ ] Run database migrations: `npm run db:push`
- [ ] Initialize database: POST to `/api/init`
- [ ] Test health endpoint: `/api/health`

### Recommended Hosting
- **Frontend + API**: Vercel (recommended), Netlify, Railway
- **Database**: Neon, Supabase, Railway, AWS RDS
- **File Storage**: Cloudinary (already integrated)

## 📖 Documentation

- **[SETUP.md](SETUP.md)** - Complete setup guide with troubleshooting
- **[API.md](API.md)** - Full API documentation with examples
- **[prisma/schema.prisma](prisma/schema.prisma)** - Database schema

## 🎯 What's Included

### ✅ Complete Backend API
- Authentication & Authorization (JWT)
- User Management (CRUD + Profiles)
- Project Management (CRUD + Proposals)
- Course Management (CRUD + Enrollment)
- Messaging System (Conversations + Real-time)
- File Upload (Cloudinary integration)
- Dashboard Analytics (Role-based)
- Freelancer Directory (Search + Filter)
- Student Registration (Multi-step onboarding)
- Database Seeding (Sample data)
- Health Checks

### ✅ Frontend Pages
- Landing Page (Hero, Features, CTA)
- Authentication (Login, Register)
- Dashboard (Role-specific views)
- Project Submission (Multi-step form)
- Learning Platform (Course browsing)
- Responsive Design (Mobile-first)
- Animations (Framer Motion)
- Modern UI (Tailwind CSS)

### ✅ Database
- PostgreSQL with Prisma ORM
- Complete schema with relations
- Migrations ready
- Seeding scripts
- Type-safe queries

## 🔧 Available Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Create migration
npm run db:studio        # Open Prisma Studio GUI

# Utilities
npm run check            # Check setup status
npm run lint             # Run ESLint
```

## 🤝 Contributing

This is a complete, production-ready codebase that demonstrates:
- ✅ Modern full-stack development with Next.js 14
- ✅ Type-safe backend with Prisma + PostgreSQL
- ✅ Comprehensive authentication and authorization
- ✅ RESTful API design with validation
- ✅ Role-based application architecture
- ✅ File upload and management
- ✅ Real-time messaging system
- ✅ TypeScript best practices
- ✅ Error handling and validation
- ✅ Production-ready code structure

## 📄 License

Built with ❤️ for the modern web - Ready for production use!

---

## 🎉 Ready to Use!

1. Add your PostgreSQL connection string to `.env`
2. Run `npm run db:push`
3. Run `npm run dev`
4. Visit `http://localhost:3000/api/init` to seed data
5. Start building! 🚀

A cutting-edge freelance marketplace built with Next.js 14+, featuring award-winning design patterns, sophisticated animations, and premium user experience.

## 🌟 Features

### Design Excellence
- **Awwwards-Level Design**: Premium, minimalist aesthetic with bold typography
- **Glass Morphism**: Beautiful glass effects throughout the interface
- **Sophisticated Animations**: Framer Motion powered micro-interactions
- **Responsive Excellence**: Mobile-first design that maintains premium feel
- **Dark/Light Mode**: Elegant theme implementation

### Tech Stack
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **TailwindCSS** with custom extensions
- **Framer Motion** for advanced animations
- **Lucide React** for beautiful icons

### Key Pages & Features
1. **Landing Page** - Hero section with animated backgrounds and magnetic buttons
2. **What We Do Section** - Interactive 3D card grid with tilt effects
3. **Projects Section** - Masonry grid with smooth hover animations
4. **Submit Project** - Multi-step form with progress indicators
5. **Dashboard** - Glass morphism data cards with animated charts
6. **Global Navigation** - Blurred glass morphism with smooth scroll effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd premium-web-platform
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Secondary**: Purple gradient (#d946ef to #c026d3)
- **Neutral**: Sophisticated gray scale
- **Glass Effects**: RGBA overlays with backdrop-blur

### Typography
- **Display Font**: Cal Sans for headings
- **Body Font**: Inter for readable text
- **Mono Font**: JetBrains Mono for code

### Spacing & Layout
- **4px base spacing scale** for consistent rhythm
- **Custom grid system** with asymmetrical layouts
- **Strategic white space** for premium feel

## 🔧 Components

### UI Components
- **Button**: Magnetic hover effects with gradient overlays
- **Card**: Glass morphism with tilt animations
- **Input**: Floating labels with smooth transitions

### Layout Components
- **Header**: Sticky navigation with scroll-triggered background
- **Footer**: Comprehensive links with newsletter signup
- **Hero**: Full-screen with animated gradient backgrounds

### Page Components
- **Landing Sections**: Modular, animated sections
- **Forms**: Multi-step with validation and success animations
- **Dashboard**: Data visualization with interactive charts

## 🎭 Animations

### Animation Library
All animations are built with Framer Motion and include:
- **Page Transitions**: Smooth route changes
- **Scroll Triggers**: Reveal animations on scroll
- **Hover Effects**: Magnetic and scale transformations
- **Loading States**: Skeleton loaders with shimmer effects

### Performance Optimization
- **Lazy Loading**: Components load on demand
- **Image Optimization**: Next.js Image component
- **Animation Debouncing**: Smooth 60fps animations

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

### Touch Optimization
- **Touch Targets**: Minimum 44px for accessibility
- **Gesture Support**: Swipe and touch interactions
- **Mobile Navigation**: Hamburger menu with animations

## 🔍 SEO & Performance

### SEO Features
- **Meta Tags**: Dynamic meta data per page
- **Structured Data**: Schema.org markup
- **Sitemap**: Auto-generated XML sitemap
- **Open Graph**: Social media optimization

### Performance
- **Core Web Vitals**: Optimized for Google metrics
- **Image Optimization**: WebP format with lazy loading
- **Code Splitting**: Route-based code splitting
- **Caching**: Static generation where possible

## 🛠 Development

### File Structure
```
├── app/                    # Next.js 14+ app router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── dashboard/         # Dashboard pages
│   └── submit-project/    # Project submission
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   └── sections/         # Page sections
├── lib/                  # Utilities
│   ├── utils.ts          # Helper functions
│   └── animations.ts     # Framer Motion variants
└── public/               # Static assets
```

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js configuration
- **Prettier**: Code formatting
- **Conventional Commits**: Git message format

## 🎯 Advanced Features

### Micro-Interactions
- **Magnetic Buttons**: Cursor-following hover effects
- **Text Reveals**: Split text animations
- **Loading Sequences**: Staggered element appearances
- **Success Animations**: Confetti and particle effects

### Glass Morphism Implementation
- **Backdrop Blur**: CSS backdrop-filter
- **Gradient Borders**: Pseudo-element techniques
- **Layered Transparency**: Multiple opacity levels
- **Context-Aware Blur**: Dynamic blur based on background

### Animation Timing
- **Ease Functions**: Custom cubic-bezier curves
- **Spring Physics**: Natural motion with Framer Motion
- **Stagger Delays**: Sequential element animations
- **Performance**: 60fps with hardware acceleration

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
- **Netlify**: Supports Next.js out of the box
- **Railway**: Easy deployment with git integration
- **AWS**: Amplify or custom EC2 setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- **Framer Motion** for animation capabilities
- **TailwindCSS** for utility-first styling
- **Next.js** team for the amazing framework
- **Awwwards** for design inspiration

---

Built with ❤️ for the modern web