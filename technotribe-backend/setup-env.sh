#!/bin/bash

# ===========================================
# TechnoTribes Backend Environment Setup Script
# ===========================================

echo "🚀 Setting up TechnoTribes Backend Environment"
echo "=============================================="

# Check if .env file already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled. .env file unchanged."
        exit 1
    fi
fi

# Ask user for environment type
echo ""
echo "Choose environment setup:"
echo "1) Minimal (recommended for development)"
echo "2) Complete (all features and configurations)"
echo "3) Production (secure production settings)"
read -p "Enter your choice (1-3): " env_choice

case $env_choice in
    1)
        echo "📝 Creating minimal environment file..."
        cp env.minimal .env
        echo "✅ Minimal .env file created successfully!"
        ;;
    2)
        echo "📝 Creating complete environment file..."
        cp env.example .env
        echo "✅ Complete .env file created successfully!"
        echo "⚠️  Remember to update the values in .env file!"
        ;;
    3)
        echo "📝 Creating production environment file..."
        cp env.example .env
        echo "✅ Production .env file created successfully!"
        echo "🔒 IMPORTANT: Update all production values in .env file!"
        echo "   - Change JWT_SECRET to a strong random string"
        echo "   - Update MONGODB_URI to your production database"
        echo "   - Set NODE_ENV=production"
        echo "   - Configure CORS_ORIGIN to your domain"
        ;;
    *)
        echo "❌ Invalid choice. Using minimal setup."
        cp env.minimal .env
        echo "✅ Minimal .env file created successfully!"
        ;;
esac

echo ""
echo "🔧 Next steps:"
echo "1. Edit .env file and update the values"
echo "2. Install dependencies: pnpm install"
echo "3. Create admin user: pnpm run create-admin"
echo "4. Start development server: pnpm run start:dev"
echo "5. Access Swagger docs: http://localhost:3000/api"
echo ""
echo "📚 For more information, check the README.md file"
echo "🎉 Happy coding!" 