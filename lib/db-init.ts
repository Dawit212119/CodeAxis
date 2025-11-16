import { connectToDatabase } from './database'
import { User } from './models/User'
import { Project } from './models/Project'
import { Course } from './models/Course'
import bcrypt from 'bcryptjs'

export async function initializeDatabase() {
  try {
    await connectToDatabase()
    console.log('Database connected successfully')

    // Check if admin user exists
    const adminExists = await User.findOne({ role: 'admin' })
    
    if (!adminExists) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash('admin123', 12)
      
      await User.create({
        email: 'admin@codeaxis.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isVerified: true,
        profile: {
          isComplete: true,
          bio: 'Platform Administrator',
          skills: ['Management', 'System Administration'],
          availability: 'available'
        }
      })
      
      console.log('Admin user created')
    }

    // Create sample freelancers if they don't exist
    const freelancerCount = await User.countDocuments({ role: 'freelancer' })
    
    if (freelancerCount === 0) {
      const sampleFreelancers = [
        {
          email: 'sarah@example.com',
          firstName: 'Sarah',
          lastName: 'Chen',
          skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'GraphQL'],
          hourlyRate: 120,
          experience: '8+ years',
          location: 'San Francisco, CA',
          bio: 'Passionate about creating scalable web applications with modern technologies.'
        },
        {
          email: 'marcus@example.com',
          firstName: 'Marcus',
          lastName: 'Rodriguez',
          skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Python'],
          hourlyRate: 110,
          experience: '6+ years',
          location: 'Seattle, WA',
          bio: 'Expert in cloud infrastructure and DevOps practices.'
        },
        {
          email: 'priya@example.com',
          firstName: 'Priya',
          lastName: 'Patel',
          skills: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Flutter'],
          hourlyRate: 115,
          experience: '7+ years',
          location: 'New York, NY',
          bio: 'Creating exceptional mobile experiences for iOS and Android.'
        }
      ]

      const hashedPassword = await bcrypt.hash('password123', 12)

      for (const freelancer of sampleFreelancers) {
        await User.create({
          email: freelancer.email,
          password: hashedPassword,
          firstName: freelancer.firstName,
          lastName: freelancer.lastName,
          role: 'freelancer',
          isVerified: true,
          profile: {
            isComplete: true,
            bio: freelancer.bio,
            location: freelancer.location,
            skills: freelancer.skills,
            experience: freelancer.experience,
            hourlyRate: freelancer.hourlyRate,
            availability: 'available'
          },
          stats: {
            totalProjects: Math.floor(Math.random() * 50) + 10,
            completedProjects: Math.floor(Math.random() * 40) + 8,
            totalHours: Math.floor(Math.random() * 1000) + 500,
            rating: 4.5 + Math.random() * 0.5,
            reviewCount: Math.floor(Math.random() * 20) + 5
          }
        })
      }

      console.log('Sample freelancers created')
    }

    // Create sample client if doesn't exist
    const clientExists = await User.findOne({ role: 'client' })
    
    if (!clientExists) {
      const hashedPassword = await bcrypt.hash('client123', 12)
      
      const client = await User.create({
        email: 'client@example.com',
        password: hashedPassword,
        firstName: 'John',
        lastName: 'Client',
        role: 'client',
        isVerified: true,
        profile: {
          isComplete: true,
          bio: 'Looking for talented developers for innovative projects.',
          location: 'New York, NY',
          skills: ['Project Management', 'Business Development']
        }
      })

      // Create a sample project
      await Project.create({
        title: 'E-commerce Website Development',
        description: 'Looking for an experienced developer to build a modern e-commerce website with React and Node.js. The project includes user authentication, product catalog, shopping cart, and payment integration.',
        client: client._id,
        status: 'open',
        category: 'web-development',
        skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        budget: {
          type: 'fixed',
          amount: 5000,
          currency: 'USD'
        },
        timeline: {
          estimatedDuration: 30,
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        },
        priority: 'high',
        tags: ['ecommerce', 'react', 'nodejs'],
        isUrgent: false,
        isFeatured: true
      })

      console.log('Sample client and project created')
    }

    // Create sample courses if they don't exist
    const courseCount = await Course.countDocuments()
    
    if (courseCount === 0) {
      // Get a freelancer to be the instructor
      const instructor = await User.findOne({ role: 'freelancer' })
      
      if (instructor) {
        const sampleCourses = [
          {
            title: 'Complete React Development Course',
            slug: 'complete-react-development-course',
            description: 'Master React.js from fundamentals to advanced concepts. Build real-world projects and learn modern React patterns.',
            shortDescription: 'Learn React.js from scratch and build amazing web applications',
            category: 'web-development',
            subcategory: 'frontend',
            level: 'beginner',
            price: 99,
            originalPrice: 149,
            duration: 1200, // 20 hours
            requirements: ['Basic JavaScript knowledge', 'HTML/CSS fundamentals'],
            whatYouWillLearn: [
              'React components and JSX',
              'State management with Redux',
              'React Hooks',
              'Building real-world projects'
            ],
            targetAudience: ['Beginner developers', 'JavaScript developers wanting to learn React'],
            tags: ['react', 'javascript', 'frontend', 'web development'],
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
            certificate: true,
            hasSubtitles: true
          },
          {
            title: 'Node.js Backend Mastery',
            slug: 'nodejs-backend-mastery',
            description: 'Learn to build scalable backend applications with Node.js, Express, and MongoDB.',
            shortDescription: 'Master backend development with Node.js',
            category: 'web-development',
            subcategory: 'backend',
            level: 'intermediate',
            price: 129,
            duration: 1500, // 25 hours
            requirements: ['JavaScript fundamentals', 'Basic understanding of web development'],
            whatYouWillLearn: [
              'Node.js fundamentals',
              'Express.js framework',
              'Database integration',
              'API development',
              'Authentication and security'
            ],
            targetAudience: ['Frontend developers', 'Full-stack aspirants'],
            tags: ['nodejs', 'backend', 'express', 'mongodb'],
            thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop',
            certificate: true,
            hasSubtitles: true
          }
        ]

        for (const course of sampleCourses) {
          await Course.create({
            ...course,
            instructor: instructor._id,
            isPublished: true,
            isFeatured: true,
            lessons: [
              {
                title: 'Introduction',
                description: 'Course introduction and overview',
                duration: 15,
                order: 1,
                isFree: true
              },
              {
                title: 'Getting Started',
                description: 'Setting up the development environment',
                duration: 30,
                order: 2,
                isFree: false
              }
            ],
            rating: {
              average: 4.5 + Math.random() * 0.5,
              count: Math.floor(Math.random() * 100) + 20
            },
            enrollment: {
              count: Math.floor(Math.random() * 500) + 100
            }
          })
        }

        console.log('Sample courses created')
      }
    }

    console.log('Database initialization completed')
    return true

  } catch (error) {
    console.error('Database initialization error:', error)
    return false
  }
}