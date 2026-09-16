@echo off
REM ===============================================
REM STUDYWORLD COLLEGE - COMPLETE SYSTEM STARTUP
REM ===============================================

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  🎓 STUDYWORLD COLLEGE LEAVE MANAGEMENT SYSTEM           ║
echo ║  Complete System Initialization & Startup                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected
echo.

REM Step 1: Initialize Database
echo ╔═══════════════════════════════════════════════════════════╗
echo ║ STEP 1: Database Initialization                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 📌 This will:
echo    • Create leave_system database
echo    • Create all required tables (users, leaves, notifications)
echo    • Seed test users with credentials
echo.
echo Starting database initialization...
echo.

node init-database.js
if errorlevel 1 (
    echo ❌ Database initialization FAILED!
    echo.
    echo Troubleshooting:
    echo   1. Ensure MySQL/MariaDB is running (Services or command line)
    echo   2. Check credentials in init-database.js (root/software20developer@2006)
    echo   3. Run MySQL manually: mysql -u root -p software20developer@2006
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Database initialized successfully!
echo.
timeout /t 2

REM Step 2: Start Backend Server
echo ╔═══════════════════════════════════════════════════════════╗
echo ║ STEP 2: Starting Backend Server                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 📌 Backend will run on: http://localhost:5000
echo.

start "Backend Server" cmd /k "node server.js"
if errorlevel 1 (
    echo ❌ Failed to start backend server!
    pause
    exit /b 1
)

echo ✅ Backend server started in new window
echo.
timeout /t 3

REM Step 3: Start Frontend Server
echo ╔═══════════════════════════════════════════════════════════╗
echo ║ STEP 3: Starting Frontend Server                         ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 📌 Frontend will run on: http://localhost:3000
echo.

start "Frontend Server" cmd /k "node frontend-server.js"
if errorlevel 1 (
    echo ❌ Failed to start frontend server!
    pause
    exit /b 1
)

echo ✅ Frontend server started in new window
echo.
timeout /t 2

REM Display final information
cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ SYSTEM STARTUP COMPLETE                              ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 🎓 STUDYWORLD COLLEGE OF ENGINEERING
echo    Digital Leave Letter Management System
echo.
echo ═══════════════════════════════════════════════════════════
echo  ACCESS INFORMATION
echo ═══════════════════════════════════════════════════════════
echo.
echo 🌐 Frontend (Login Page): http://localhost:3000/login/login.html
echo 🔌 Backend API:           http://localhost:5000
echo 📊 Health Check:          http://localhost:5000/health
echo.
echo ═══════════════════════════════════════════════════════════
echo  TEST CREDENTIALS
echo ═══════════════════════════════════════════════════════════
echo.
echo 👨‍💼 Admin:        admin / admin123
echo 👨‍🎓 Student:      student_001 / student123
echo 👨‍🏫 Faculty:      faculty_001 / faculty123
echo 📋 HOD:          hod_001 / hod123
echo 🎓 Principal:    principal_001 / principal123
echo.
echo ═══════════════════════════════════════════════════════════
echo  TROUBLESHOOTING
echo ═══════════════════════════════════════════════════════════
echo.
echo ❌ If login fails:
echo   1. Check both Backend and Frontend windows are open
echo   2. Verify MySQL/MariaDB is running (Services)
echo   3. Check Windows Firewall (allow port 5000, 3000)
echo   4. Try fresh database init: node init-database.js
echo.
echo ❌ If you see "Cannot connect to database":
echo   1. Start MySQL/MariaDB service
echo   2. Verify username/password in init-database.js
echo   3. Run init-database.js again
echo.
echo 🔄 To restart system:
echo   1. Close both Backend and Frontend windows
echo   2. Run this script again
echo.
echo ═══════════════════════════════════════════════════════════
echo.
echo ✅ System is ready! Opening login page in browser...
echo.

timeout /t 3

REM Open browser
start http://localhost:3000/login/login.html

echo.
echo 💡 Both server windows should remain open while using the system
echo 💡 Press Ctrl+C in server windows to stop them
echo.
pause
