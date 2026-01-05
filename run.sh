#!/bin/bash

# Portfolio Website Run Script
# This script starts the development server for the portfolio website

echo "🚀 Starting Portfolio Website..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the development server
echo "✨ Starting development server..."
echo "📍 Website will be available at: http://localhost:5173"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

npm run dev

