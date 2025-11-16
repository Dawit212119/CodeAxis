'use client'

import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowUp,
  Heart
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { staggerContainer, staggerItem } from '@/lib/animations'

export function Footer() {
  const navigation = {
    platform: [
      { name: 'Find Talent', href: '/talent' },
      { name: 'Find Work', href: '/work' },
      { name: 'Submit Project', href: '/submit-project' },
      { name: 'Success Stories', href: '/success-stories' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Contact', href: '/contact' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Community', href: '/community' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  }

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Instagram', href: '#', icon: Instagram },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-b from-transparent to-black/20 border-t border-white/10">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"
        >
          {/* Brand Section */}
          <motion.div
            variants={staggerItem}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-2xl font-bold text-white font-display">
                CodeAxis
              </span>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              Connecting exceptional developers with extraordinary projects. 
              Building the future of code, one collaboration at a time.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span>hello@codeaxis.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-lg glass hover:bg-white/20 text-gray-400 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Sections */}
          {Object.entries(navigation).map(([category, links]) => (
            <motion.div
              key={category}
              variants={staggerItem}
              className="space-y-4"
            >
              <h3 className="text-white font-semibold capitalize">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="py-8 border-t border-white/10"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <motion.div variants={staggerItem}>
              <h3 className="text-white font-semibold text-lg mb-2">
                Stay in the loop
              </h3>
              <p className="text-gray-400 text-sm">
                Get the latest updates, insights, and opportunities delivered to your inbox.
              </p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="flex gap-4 w-full lg:w-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="input-glass flex-1 lg:w-64"
              />
              <Button variant="primary" magnetic>
                Subscribe
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="py-8 border-t border-white/10"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-2 text-gray-400 text-sm"
            >
              <span>© 2024 CodeAxis. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>in San Francisco</span>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="flex items-center gap-6 text-sm text-gray-400"
            >
              <span>All rights reserved</span>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <span>Back to top</span>
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}