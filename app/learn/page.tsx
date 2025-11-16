'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Star, 
  ArrowRight,
  Play,
  Trophy,
  Clock,
  Target,
  Zap
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { pageVariants, staggerContainer, staggerItem, hero3D } from '@/lib/animations'
import { useAuth } from '@/lib/auth-context'

export default function LearnPage() {
  const router = useRouter()
  const { user } = useAuth()

  const handleStartLearning = () => {
    if (!user) {
      // Redirect to login with redirect back to student registration
      router.push('/auth/signin?redirect=/student-registration')
    } else {
      // If already signed in, go directly to registration
      router.push('/student-registration')
    }
  }
  const stats = [
    { icon: Users, label: 'Active Students', value: '50K+', color: 'text-blue-400' },
    { icon: BookOpen, label: 'Courses Available', value: '500+', color: 'text-emerald-400' },
    { icon: Trophy, label: 'Certificates Issued', value: '25K+', color: 'text-yellow-400' },
    { icon: Star, label: 'Average Rating', value: '4.9', color: 'text-purple-400' },
  ]

  const features = [
    {
      icon: Target,
      title: 'Personalized Learning Path',
      description: 'AI-powered curriculum tailored to your goals and skill level',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with real-world experience',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Study at your own pace with 24/7 access to all content',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Trophy,
      title: 'Industry Certificates',
      description: 'Earn recognized certificates to advance your career',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Zap,
      title: 'Hands-on Projects',
      description: 'Build real projects to strengthen your portfolio',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Resources',
      description: 'Access to premium learning materials and tools',
      color: 'from-pink-500 to-rose-500'
    },
  ]

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      <Header />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                variants={hero3D}
                initial="initial"
                animate="animate"
                className="space-y-8"
              >
                <motion.div
                  variants={staggerItem}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-gray-300">
                    🎓 Transform Your Career with CodeAxis Learn
                  </span>
                </motion.div>

                <motion.h1
                  variants={staggerItem}
                  className="text-5xl md:text-7xl font-bold text-white font-display leading-tight"
                >
                  Master Tech Skills
                  <br />
                  <span className="text-emerald-400">
                    Shape Your Future
                  </span>
                </motion.h1>

                <motion.p
                  variants={staggerItem}
                  className="text-xl text-gray-300 max-w-xl leading-relaxed"
                >
                  Join our comprehensive learning platform designed by industry experts. 
                  From beginner to advanced, we'll guide you every step of the way.
                </motion.p>

                <motion.div
                  variants={staggerItem}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    variant="primary"
                    size="xl"
                    className="group"
                    onClick={handleStartLearning}
                  >
                    <span>Start Learning Today</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button
                    variant="glass"
                    size="xl"
                    className="group"
                  >
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    <span>Watch Demo</span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right Content - Stats */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-2 gap-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={staggerItem}
                    className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-4">
                        <div className="p-3 rounded-xl bg-white">
                          <stat.icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-white mb-2 font-display">
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2
                variants={staggerItem}
                className="text-4xl md:text-6xl font-bold text-white font-display mb-6"
              >
                Why Choose
                <br />
                <span className="text-emerald-400">CodeAxis Learn</span>
              </motion.h2>

              <motion.p
                variants={staggerItem}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                Our learning platform combines cutting-edge technology with proven 
                educational methods to deliver exceptional results.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={staggerItem}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    z: 50 
                  }}
                  className="group"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <motion.div 
                        className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6"
                        whileHover={{ rotateY: 180 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <feature.icon className="w-7 h-7 text-black" />
                      </motion.div>

                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="glass rounded-3xl p-12 border border-white/10"
            >
              <motion.h2
                variants={staggerItem}
                className="text-3xl md:text-5xl font-bold text-white font-display mb-6"
              >
                Ready to Transform Your Career?
              </motion.h2>

              <motion.p
                variants={staggerItem}
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Join thousands of students who have already started their journey 
                to success. Your future in tech begins today.
              </motion.p>

              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  variant="primary"
                  size="xl"
                  className="group"
                  onClick={handleStartLearning}
                >
                  <span>Get Started Free</span>
                  <GraduationCap className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                </Button>

                <Link href="/learn/courses">
                  <Button
                    variant="glass"
                    size="xl"
                    className="group"
                  >
                    <span>Browse Courses</span>
                    <BookOpen className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  )
}