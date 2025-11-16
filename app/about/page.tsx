'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  Target, 
  Award, 
  TrendingUp,
  Heart,
  Shield,
  Zap,
  Globe,
  Code,
  Briefcase,
  GraduationCap,
  Star
} from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { pageVariants, staggerContainer, staggerItem } from '@/lib/animations'

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Active Users', value: '50,000+', color: 'text-blue-400' },
    { icon: Briefcase, label: 'Projects Completed', value: '100,000+', color: 'text-emerald-400' },
    { icon: Globe, label: 'Countries', value: '150+', color: 'text-purple-400' },
    { icon: Award, label: 'Success Rate', value: '98%', color: 'text-yellow-400' },
  ]

  const values = [
    {
      icon: Heart,
      title: 'Client-Centric',
      description: 'We put our clients and freelancers first, ensuring the best experience for everyone on our platform.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your security is our priority. We use industry-leading encryption and secure payment systems.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously innovate to provide cutting-edge tools and features for modern work.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from platform features to customer support.'
    },
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: '15+ years in tech industry'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      bio: 'Former Google engineer'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      bio: 'Award-winning designer'
    },
    {
      name: 'David Kim',
      role: 'Head of Operations',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      bio: 'MBA from Stanford'
    },
  ]

  const milestones = [
    { year: '2020', title: 'Founded', description: 'CodeAxis was born with a vision to revolutionize freelancing' },
    { year: '2021', title: '10K Users', description: 'Reached 10,000 active users milestone' },
    { year: '2022', title: 'Global Expansion', description: 'Expanded to 100+ countries worldwide' },
    { year: '2023', title: '50K Users', description: 'Growing community of 50,000+ professionals' },
    { year: '2024', title: 'Learning Platform', description: 'Launched comprehensive learning platform' },
  ]

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                variants={staggerItem}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 mb-6"
              >
                <Star className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-gray-300">
                  Building the Future of Work
                </span>
              </motion.div>

              <motion.h1
                variants={staggerItem}
                className="text-5xl md:text-7xl font-bold text-white font-display leading-tight mb-6"
              >
                Empowering Talent,
                <br />
                <span className="text-emerald-400">Connecting Opportunities</span>
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                CodeAxis is more than a platform—it's a community where talented professionals 
                and innovative companies come together to create amazing things.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="glass rounded-2xl p-6 border border-white/10 text-center"
                >
                  <stat.icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={staggerItem}>
                <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  We're on a mission to democratize access to opportunities and talent worldwide. 
                  By connecting skilled professionals with innovative projects, we're building a 
                  future where work is flexible, rewarding, and accessible to everyone.
                </p>
                <p className="text-lg text-gray-300">
                  Whether you're a freelancer looking for your next project or a company seeking 
                  top talent, CodeAxis provides the tools, security, and community you need to succeed.
                </p>
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="glass rounded-3xl p-8 border border-white/10"
              >
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Vision</h3>
                      <p className="text-gray-400">
                        To be the world's most trusted platform for remote work and collaboration.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Code className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Technology</h3>
                      <p className="text-gray-400">
                        Built with cutting-edge technology to provide the best user experience.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Learning</h3>
                      <p className="text-gray-400">
                        Empowering continuous learning and skill development for all users.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2
                variants={staggerItem}
                className="text-4xl md:text-5xl font-bold text-white font-display mb-4"
              >
                Our Values
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="text-xl text-gray-300 max-w-2xl mx-auto"
              >
                The principles that guide everything we do
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={staggerItem}
                  whileHover={{ y: -10 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                        <value.icon className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                      <p className="text-gray-400">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2
                variants={staggerItem}
                className="text-4xl md:text-5xl font-bold text-white font-display mb-4"
              >
                Our Journey
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="text-xl text-gray-300"
              >
                Key milestones in our growth
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  variants={staggerItem}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-24 text-right">
                    <div className="text-2xl font-bold text-emerald-400">{milestone.year}</div>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500 mt-2" />
                  <div className="flex-1 glass rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2
                variants={staggerItem}
                className="text-4xl md:text-5xl font-bold text-white font-display mb-4"
              >
                Meet Our Team
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="text-xl text-gray-300"
              >
                The people behind CodeAxis
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={staggerItem}
                  whileHover={{ y: -10 }}
                >
                  <Card>
                    <CardContent className="p-6 text-center">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                      />
                      <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                      <p className="text-emerald-400 text-sm mb-2">{member.role}</p>
                      <p className="text-gray-400 text-sm">{member.bio}</p>
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
                Join Our Growing Community
              </motion.h2>

              <motion.p
                variants={staggerItem}
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Be part of the future of work. Whether you're looking for talent or opportunities, 
                CodeAxis is your platform.
              </motion.p>

              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/auth/signup">
                  <Button variant="primary" size="xl">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/work">
                  <Button variant="secondary" size="xl">
                    Explore Projects
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
