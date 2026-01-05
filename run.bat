@echo off
REM Portfolio Website Run Script for Windows
REM This script starts the development server for the portfolio website

echo 🚀 Starting Portfolio Website...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

REM Start the development server
echo ✨ Starting development server...
echo 📍 Website will be available at: http://localhost:5173
echo 🛑 Press Ctrl+C to stop the server
echo.

call npm run dev

