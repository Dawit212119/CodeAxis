const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 Setting up CodeAxis Platform...\n')

// Check if .env file exists, if not create from example
const envPath = path.join(__dirname, '..', '.env')
const envExamplePath = path.join(__dirname, '..', '.env.example')

if (!fs.existsSync(envPath)) {
  console.log('📄 Creating .env file from example...')
  fs.copyFileSync(envExamplePath, envPath)
  console.log('✅ .env file created. Please update with your actual values.\n')
} else {
  console.log('✅ .env file already exists.\n')
}

// Install dependencies
console.log('📦 Installing dependencies...')
try {
  execSync('npm install', { stdio: 'inherit' })
  console.log('✅ Dependencies installed successfully.\n')
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message)
  process.exit(1)
}

// Initialize database (will be done when the app starts)
console.log('🗄️  Database will be initialized when you start the application.\n')

console.log('🎉 Setup complete! Here\'s what you need to do next:\n')
console.log('1. Update the .env file with your database and service credentials')
console.log('2. Start MongoDB if running locally')
console.log('3. Run "npm run dev" to start the development server')
console.log('4. Visit http://localhost:3000 to see your application\n')

console.log('📚 Default accounts that will be created:')
console.log('   - Admin: admin@codeaxis.com / admin123')
console.log('   - Client: client@example.com / client123')
console.log('   - Freelancers: sarah@example.com, marcus@example.com, priya@example.com / password123\n')

console.log('🔧 Make sure to configure:')
console.log('   - MongoDB connection (MONGODB_URI)')
console.log('   - JWT secret (JWT_SECRET)')
console.log('   - Email settings (SMTP_*) for notifications')
console.log('   - Cloudinary settings for file uploads')
console.log('   - Stripe settings for payments (optional)\n')