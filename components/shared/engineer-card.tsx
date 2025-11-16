'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Star, Briefcase, Users, Award, ExternalLink, Clock } from 'lucide-react'

interface EngineerCardProps {
  engineer: {
    id: string; name: string; title: string; company: string; location: string;
    experience: string; rating: number; hourlyRate: number; skills: string[];
    avatar: string; completedProjects: number; totalHours: number;
    specialty: string; achievements: string[]; bio: string;
  }
  onHover: (id: string | null) => void
}

export function EngineerCard({ engineer, onHover }: EngineerCardProps) {
  return (
    <motion.div
      className="w-[380px] flex-shrink-0"
      onMouseEnter={() => onHover(engineer.id)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="glass rounded-3xl p-6 h-full hover:bg-white/10 transition-all duration-300 group border border-white/10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <motion.img
              src={engineer.avatar}
              alt={engineer.name}
              className="w-16 h-16 rounded-2xl object-cover"
              whileHover={{ scale: 1.1 }}
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-black flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
              {engineer.name}
            </h3>
            <p className="text-emerald-400 font-medium text-sm mb-1">{engineer.title}</p>
            <p className="text-gray-400 text-sm">{engineer.company}</p>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white font-semibold">{engineer.rating}</span>
            </div>
            <div className="text-emerald-400 font-bold">${engineer.hourlyRate}/hr</div>
          </div>
        </div>

        {/* Details */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{engineer.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{engineer.experience}</span>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{engineer.bio}</p>

        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-medium rounded-full">
            {engineer.specialty}
          </span>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {engineer.skills.slice(0, 4).map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-md">
                {skill}
              </span>
            ))}
            {engineer.skills.length > 4 && (
              <span className="px-2 py-1 bg-white/10 text-gray-400 text-xs rounded-md">
                +{engineer.skills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Briefcase className="w-4 h-4 text-blue-400 mr-1" />
              <span className="text-lg font-bold text-white">{engineer.completedProjects}</span>
            </div>
            <div className="text-xs text-gray-400">Projects</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-purple-400 mr-1" />
              <span className="text-lg font-bold text-white">{engineer.totalHours}h</span>
            </div>
            <div className="text-xs text-gray-400">Total Hours</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-1">
            <Award className="w-4 h-4 text-yellow-400" />
            Achievements
          </h4>
          <div className="space-y-1">
            {engineer.achievements.slice(0, 2).map((achievement, idx) => (
              <div key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                <div className="w-1 h-1 bg-yellow-400 rounded-full" />
                {achievement}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <motion.button
            className="flex-1 bg-white text-black font-semibold py-2 px-4 rounded-xl hover:bg-gray-100 transition-colors text-sm flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Users className="w-4 h-4" />
            Hire Now
          </motion.button>
          <motion.button
            className="px-4 py-2 glass hover:bg-white/20 rounded-xl transition-colors text-sm flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-4 h-4 text-gray-300" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}