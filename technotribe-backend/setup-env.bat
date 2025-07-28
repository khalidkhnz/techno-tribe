@echo off
REM ===========================================
REM TechnoTribe Backend Environment Setup Script (Windows)
REM ===========================================

echo 🚀 Setting up TechnoTribe Backend Environment
echo ==============================================

REM Check if .env file already exists
if exist ".env" (
    echo ⚠️  .env file already exists!
    set /p overwrite="Do you want to overwrite it? (y/N): "
    if /i not "%overwrite%"=="y" (
        echo ❌ Setup cancelled. .env file unchanged.
        pause
        exit /b 1
    )
)

REM Ask user for environment type
echo.
echo Choose environment setup:
echo 1) Minimal (recommended for development)
echo 2) Complete (all features and configurations)
echo 3) Production (secure production settings)
set /p env_choice="Enter your choice (1-3): "

if "%env_choice%"=="1" (
    echo 📝 Creating minimal environment file...
    copy env.minimal .env >nul
    echo ✅ Minimal .env file created successfully!
) else if "%env_choice%"=="2" (
    echo 📝 Creating complete environment file...
    copy env.example .env >nul
    echo ✅ Complete .env file created successfully!
    echo ⚠️  Remember to update the values in .env file!
) else if "%env_choice%"=="3" (
    echo 📝 Creating production environment file...
    copy env.example .env >nul
    echo ✅ Production .env file created successfully!
    echo 🔒 IMPORTANT: Update all production values in .env file!
    echo    - Change JWT_SECRET to a strong random string
    echo    - Update MONGODB_URI to your production database
    echo    - Set NODE_ENV=production
    echo    - Configure CORS_ORIGIN to your domain
) else (
    echo ❌ Invalid choice. Using minimal setup.
    copy env.minimal .env >nul
    echo ✅ Minimal .env file created successfully!
)

echo.
echo 🔧 Next steps:
echo 1. Edit .env file and update the values
echo 2. Install dependencies: pnpm install
echo 3. Create admin user: pnpm run create-admin
echo 4. Start development server: pnpm run start:dev
echo 5. Access Swagger docs: http://localhost:3000/api
echo.
echo 📚 For more information, check the README.md file
echo 🎉 Happy coding!
pause 