#!/bin/bash

# DESCRIPTA - Automated Installation and Deployment Script
# This script sets up Firebase, installs dependencies, and deploys to production

set -e  # Exit on error

echo "🚀 DESCRIPTA - Installation and Deployment Script"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 20+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js version: $(node -v)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm version: $(npm -v)${NC}"
echo ""

# Install Firebase CLI globally if not present
if ! command -v firebase &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Firebase CLI...${NC}"
    npm install -g firebase-tools
else
    echo -e "${GREEN}✓ Firebase CLI already installed${NC}"
fi

echo ""
echo -e "${YELLOW}📦 Installing project dependencies...${NC}"
npm install

echo ""
echo -e "${YELLOW}🔧 Setting up Firebase...${NC}"

# Login to Firebase
echo "Please login to Firebase:"
firebase login

# Initialize Firebase if not already done
if [ ! -f "firebase.json" ]; then
    echo -e "${YELLOW}Initializing Firebase project...${NC}"
    firebase init hosting
else
    echo -e "${GREEN}✓ Firebase already initialized${NC}"
fi

# Create or check .env file
if [ ! -f ".env" ]; then
    echo ""
    echo -e "${YELLOW}⚙️  Setting up environment variables...${NC}"
    echo "Please enter your Firebase configuration:"
    
    read -p "Firebase API Key: " FIREBASE_API_KEY
    read -p "Firebase Auth Domain (e.g., your-app.firebaseapp.com): " FIREBASE_AUTH_DOMAIN
    read -p "Firebase Project ID: " FIREBASE_PROJECT_ID
    read -p "Firebase Storage Bucket (e.g., your-app.appspot.com): " FIREBASE_STORAGE_BUCKET
    read -p "Firebase Messaging Sender ID: " FIREBASE_MESSAGING_SENDER_ID
    read -p "Firebase App ID: " FIREBASE_APP_ID
    
    cat > .env << EOF
VITE_FIREBASE_API_KEY=$FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=$FIREBASE_APP_ID
EOF
    
    echo -e "${GREEN}✓ Environment variables saved to .env${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# Configure Firebase Authentication
echo ""
echo -e "${YELLOW}🔐 Enabling Firebase Authentication...${NC}"
echo "Please ensure Google and GitHub authentication providers are enabled in Firebase Console:"
echo "https://console.firebase.google.com/project/$FIREBASE_PROJECT_ID/authentication/providers"
echo ""
read -p "Press Enter once you've enabled Google and GitHub auth providers..."

# Build the application
echo ""
echo -e "${YELLOW}🏗️  Building production bundle...${NC}"
npm run build

# Run tests
echo ""
echo -e "${YELLOW}🧪 Running tests...${NC}"
npm run test

# Deploy to Firebase Hosting
echo ""
echo -e "${YELLOW}🚀 Deploying to Firebase Hosting...${NC}"
firebase deploy --only hosting

echo ""
echo -e "${GREEN}=================================================="
echo -e "✅ DESCRIPTA has been successfully deployed!"
echo -e "==================================================${NC}"
echo ""
echo "Your app should now be live at:"
firebase hosting:sites:list
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Set up GitHub secrets for CI/CD (see README.md)"
echo "2. Test the authentication flow with Google and GitHub"
echo "3. Add your Gemini/OpenAI API keys in the app settings"
echo ""
echo -e "${GREEN}🎉 Happy coding!${NC}"
