// Navigation
export const NAVIGATION = [
  { name: 'Find Talent', href: '/talent', requiresAuth: false },
  { name: 'Find Work', href: '/work', requiresAuth: false },
  { name: 'Submit Project', href: '/submit-project', requiresAuth: true },
  { name: 'Learn', href: '/learn', requiresAuth: false },
  { name: 'Dashboard', href: '/dashboard', requiresAuth: true },
  { name: 'About', href: '/about', requiresAuth: false },
]

// Engineers Data
export const ENGINEERS = [
  {
    id: '1', name: 'Sarah Chen', title: 'Senior Full Stack Developer', company: 'Google',
    location: 'San Francisco, CA', experience: '8+ years', rating: 4.9, hourlyRate: 120,
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'GraphQL'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b734b32b?w=150&h=150&fit=crop&crop=face',
    completedProjects: 47, totalHours: 1240, specialty: 'Frontend Architecture',
    achievements: ['Top Rated Plus', 'Google Cloud Certified', 'React Expert'],
    bio: 'Passionate about creating scalable web applications with modern technologies.'
  },
  {
    id: '2', name: 'Marcus Rodriguez', title: 'DevOps Engineer', company: 'Microsoft',
    location: 'Seattle, WA', experience: '6+ years', rating: 4.8, hourlyRate: 110,
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Python'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    completedProjects: 32, totalHours: 980, specialty: 'Cloud Infrastructure',
    achievements: ['AWS Solutions Architect', 'Kubernetes Expert', 'Top Performer'],
    bio: 'Expert in cloud infrastructure and DevOps practices.'
  },
  {
    id: '3', name: 'Priya Patel', title: 'Mobile App Developer', company: 'Spotify',
    location: 'New York, NY', experience: '7+ years', rating: 4.9, hourlyRate: 115,
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Flutter'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    completedProjects: 38, totalHours: 1150, specialty: 'Mobile Development',
    achievements: ['iOS Expert', 'Top Rated', 'App Store Featured Developer'],
    bio: 'Creating exceptional mobile experiences for iOS and Android.'
  },
  {
    id: '4', name: 'Alex Kim', title: 'Data Science Engineer', company: 'Netflix',
    location: 'Los Angeles, CA', experience: '5+ years', rating: 4.7, hourlyRate: 105,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Spark'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    completedProjects: 28, totalHours: 840, specialty: 'Machine Learning',
    achievements: ['ML Specialist', 'Data Science Expert', 'Rising Talent'],
    bio: 'Transforming data into actionable insights using machine learning.'
  },
  {
    id: '5', name: 'Emma Thompson', title: 'Backend Engineer', company: 'Stripe',
    location: 'Austin, TX', experience: '9+ years', rating: 4.8, hourlyRate: 125,
    skills: ['Go', 'PostgreSQL', 'Redis', 'Microservices', 'Docker'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    completedProjects: 52, totalHours: 1560, specialty: 'Distributed Systems',
    achievements: ['Backend Expert', 'System Design Pro', 'Top Rated Plus'],
    bio: 'Building robust and scalable backend systems.'
  }
]

// Services
export const SERVICES = [
  { icon: '🌐', title: 'Web Development', description: 'Full-stack development with modern frameworks', gradient: 'from-blue-500 to-cyan-500' },
  { icon: '🎨', title: 'UI/UX Design', description: 'Award-winning designs that captivate users', gradient: 'from-purple-500 to-pink-500' },
  { icon: '📱', title: 'Mobile Apps', description: 'Native and cross-platform applications', gradient: 'from-green-500 to-emerald-500' },
  { icon: '📈', title: 'Digital Marketing', description: 'Strategic marketing campaigns', gradient: 'from-orange-500 to-red-500' },
  { icon: '📊', title: 'Data Analytics', description: 'Transform data into insights', gradient: 'from-indigo-500 to-purple-500' },
  { icon: '🔐', title: 'Cybersecurity', description: 'Comprehensive security solutions', gradient: 'from-gray-500 to-slate-500' },
]

// Course Categories
export const COURSE_CATEGORIES = [
  { id: 'web-development', title: 'Web Development', icon: '🌐', description: 'Frontend, Backend, Full-stack' },
  { id: 'mobile-development', title: 'Mobile Development', icon: '📱', description: 'iOS, Android, React Native' },
  { id: 'data-science', title: 'Data Science', icon: '📊', description: 'Analytics, ML, AI' },
  { id: 'ui-ux-design', title: 'UI/UX Design', icon: '🎨', description: 'User Interface, User Experience' },
  { id: 'cybersecurity', title: 'Cybersecurity', icon: '🔐', description: 'Security, Ethical Hacking' },
  { id: 'cloud-computing', title: 'Cloud Computing', icon: '☁️', description: 'AWS, Azure, DevOps' },
]