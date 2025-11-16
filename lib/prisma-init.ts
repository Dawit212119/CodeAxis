import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export async function initializePrismaDatabase() {
  try {
    console.log('Initializing Prisma database...')

    // Check if admin user exists
    const adminExists = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    })

    if (!adminExists) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash('admin123', 12)

      await prisma.user.create({
        data: {
          email: 'admin@codeaxis.com',
          password: hashedPassword,
          firstName: 'Admin',
          lastName: 'User',
          role: 'ADMIN',
          isVerified: true,
          profile: {
            create: {
              isComplete: true,
              bio: 'Platform Administrator',
              skills: ['Management', 'System Administration'],
              availability: 'AVAILABLE'
            }
          },
          stats: {
            create: {
              totalProjects: 0,
              completedProjects: 0,
              totalHours: 0,
              rating: 0,
              reviewCount: 0
            }
          }
        }
      })

      console.log('Admin user created')
    }

    // Create sample freelancers if they don't exist
    const freelancerCount = await prisma.user.count({
      where: { role: 'FREELANCER' }
    })

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
          bio: 'Passionate about creating scalable web applications with modern technologies.',
          rating: 4.8,
          reviewCount: 24,
          totalProjects: 45,
          completedProjects: 42
        },
        {
          email: 'marcus@example.com',
          firstName: 'Marcus',
          lastName: 'Rodriguez',
          skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Python'],
          hourlyRate: 110,
          experience: '6+ years',
          location: 'Seattle, WA',
          bio: 'Expert in cloud infrastructure and DevOps practices.',
          rating: 4.7,
          reviewCount: 18,
          totalProjects: 32,
          completedProjects: 30
        },
        {
          email: 'priya@example.com',
          firstName: 'Priya',
          lastName: 'Patel',
          skills: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Flutter'],
          hourlyRate: 115,
          experience: '7+ years',
          location: 'New York, NY',
          bio: 'Creating exceptional mobile experiences for iOS and Android.',
          rating: 4.9,
          reviewCount: 31,
          totalProjects: 58,
          completedProjects: 55
        }
      ]

      const hashedPassword = await bcrypt.hash('password123', 12)

      for (const freelancer of sampleFreelancers) {
        await prisma.user.create({
          data: {
            email: freelancer.email,
            password: hashedPassword,
            firstName: freelancer.firstName,
            lastName: freelancer.lastName,
            role: 'FREELANCER',
            isVerified: true,
            profile: {
              create: {
                isComplete: true,
                bio: freelancer.bio,
                location: freelancer.location,
                skills: freelancer.skills,
                experience: freelancer.experience,
                hourlyRate: freelancer.hourlyRate,
                availability: 'AVAILABLE'
              }
            },
            stats: {
              create: {
                totalProjects: freelancer.totalProjects,
                completedProjects: freelancer.completedProjects,
                totalHours: Math.floor(Math.random() * 1000) + 500,
                rating: freelancer.rating,
                reviewCount: freelancer.reviewCount
              }
            }
          }
        })
      }

      console.log('Sample freelancers created')
    }

    // Create sample client if doesn't exist
    const clientExists = await prisma.user.findFirst({
      where: { role: 'CLIENT' }
    })

    if (!clientExists) {
      const hashedPassword = await bcrypt.hash('client123', 12)

      const client = await prisma.user.create({
        data: {
          email: 'client@example.com',
          password: hashedPassword,
          firstName: 'John',
          lastName: 'Client',
          role: 'CLIENT',
          isVerified: true,
          profile: {
            create: {
              isComplete: true,
              bio: 'Looking for talented developers for innovative projects.',
              location: 'New York, NY',
              skills: ['Project Management', 'Business Development']
            }
          },
          stats: {
            create: {
              totalProjects: 5,
              completedProjects: 3,
              totalHours: 0,
              rating: 4.5,
              reviewCount: 8
            }
          }
        }
      })

      // Create a sample project
      await prisma.project.create({
        data: {
          title: 'E-commerce Website Development',
          description: 'Looking for an experienced developer to build a modern e-commerce website with React and Node.js. The project includes user authentication, product catalog, shopping cart, and payment integration.',
          clientId: client.id,
          status: 'OPEN',
          category: 'web-development',
          skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          budgetType: 'FIXED',
          budgetAmount: 5000,
          budgetCurrency: 'USD',
          estimatedDuration: 30,
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          priority: 'HIGH',
          tags: ['ecommerce', 'react', 'nodejs'],
          isUrgent: false,
          isFeatured: true
        }
      })

      console.log('Sample client and project created')
    }

    // Create sample courses if they don't exist
    const courseCount = await prisma.course.count()

    if (courseCount === 0) {
      // Get a freelancer to be the instructor
      const instructor = await prisma.user.findFirst({
        where: { role: 'FREELANCER' }
      })

      if (instructor) {
        const sampleCourses = [
          {
            title: 'Complete React Development Course',
            slug: 'complete-react-development-course',
            description: 'Master React.js from fundamentals to advanced concepts. Build real-world projects and learn modern React patterns.',
            shortDescription: 'Learn React.js from scratch and build amazing web applications',
            category: 'web-development',
            subcategory: 'frontend',
            level: 'BEGINNER' as const,
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
            level: 'INTERMEDIATE' as const,
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
          const createdCourse = await prisma.course.create({
            data: {
              ...course,
              instructorId: instructor.id,
              isPublished: true,
              isFeatured: true,
              ratingAverage: 4.5 + Math.random() * 0.5,
              ratingCount: Math.floor(Math.random() * 100) + 20,
              enrollmentCount: Math.floor(Math.random() * 500) + 100
            }
          })

          // Add sample lessons
          await prisma.lesson.createMany({
            data: [
              {
                courseId: createdCourse.id,
                title: 'Introduction',
                description: 'Course introduction and overview',
                duration: 15,
                order: 1,
                isFree: true
              },
              {
                courseId: createdCourse.id,
                title: 'Getting Started',
                description: 'Setting up the development environment',
                duration: 30,
                order: 2,
                isFree: false
              }
            ]
          })
        }

        console.log('Sample courses created')
      }
    }

    console.log('Prisma database initialization completed')
    return true

  } catch (error) {
    console.error('Prisma database initialization error:', error)
    return false
  }
}