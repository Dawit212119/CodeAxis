#!/bin/bash

echo "🚀 Setting up CodeAxis Platform..."
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
    echo "✅ Node.js version $NODE_VERSION is compatible"
else
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to 18.0.0 or higher."
    exit 1
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi

echo ""
echo "🎨 Setting up development environment..."

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" > .env.local
    echo "✅ Created .env.local file"
fi

echo ""
echo "🌟 CodeAxis Platform is ready!"
echo "======================================"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "To build for production:"
echo "  npm run build"
echo ""
echo "Open http://localhost:3000 in your browser to see the magic! ✨"
echo ""
echo "Features included:"
echo "  🎯 Award-winning design patterns"
echo "  🎪 Sophisticated animations with Framer Motion"
echo "  💎 Glass morphism and gradient effects"
echo "  📱 Premium responsive design"
echo "  ⚡ Optimized performance"
echo "  🎨 Dark/light mode ready"
echo ""
echo "Happy coding! 🚀"