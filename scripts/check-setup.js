const fs = require('fs');
const path = require('path');

console.log('🔍 Checking CodeAxis Platform Setup...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found');
  console.log('   Please copy .env.example to .env and configure your database\n');
  process.exit(1);
}

// Read .env file
const envContent = fs.readFileSync(envPath, 'utf8');

// Check for DATABASE_URL
if (!envContent.includes('DATABASE_URL=') || envContent.includes('DATABASE_URL="postgresql://user:password@host')) {
  console.log('⚠️  DATABASE_URL not configured');
  console.log('   Please update DATABASE_URL in .env with your PostgreSQL connection string\n');
} else {
  console.log('✅ DATABASE_URL configured');
}

// Check for JWT_SECRET
if (!envContent.includes('JWT_SECRET=') || envContent.includes('JWT_SECRET=codeaxis-super-secret')) {
  console.log('⚠️  JWT_SECRET should be changed for production');
  console.log('   Current JWT_SECRET is the default value\n');
} else {
  console.log('✅ JWT_SECRET configured');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('❌ node_modules not found');
  console.log('   Run: npm install\n');
  process.exit(1);
} else {
  console.log('✅ Dependencies installed');
}

// Check if Prisma client is generated
const prismaClientPath = path.join(__dirname, '..', 'node_modules', '.prisma', 'client');
if (!fs.existsSync(prismaClientPath)) {
  console.log('⚠️  Prisma client not generated');
  console.log('   Run: npm run db:generate\n');
} else {
  console.log('✅ Prisma client generated');
}

console.log('\n📋 Next Steps:');
console.log('1. Configure DATABASE_URL in .env file');
console.log('2. Run: npm run db:push');
console.log('3. Run: npm run dev');
console.log('4. Visit: http://localhost:3000/api/init (to seed database)');
console.log('5. Visit: http://localhost:3000\n');

console.log('📚 For detailed instructions, see SETUP.md\n');
