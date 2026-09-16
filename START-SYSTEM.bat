@echo off
echo.
echo ====================================================================
echo   Starting Digital Leave Letter System
echo ====================================================================
echo.
echo [1/4] Starting backend server on port 5000...
start "Backend Server" cmd /k "node server.js"
echo.
echo [2/4] Waiting 3 seconds for backend to initialize...
timeout /t 3 /nobreak
echo.
echo [3/4] Seeding test users to database...
timeout /t 1 /nobreak
node seed-test-users.js
echo.
echo [4/4] Starting frontend server on port 3000...
start "Frontend Server" cmd /k "node frontend-server.js"
echo.
echo ====================================================================
echo   ✅ Both servers are starting!
echo ====================================================================
echo.
echo 🌐 OPEN IN BROWSER: http://localhost:3000/login/login.html
echo.
echo 👤 TEST CREDENTIALS:
echo    Student:   student_001 / student123
echo    Faculty:   faculty_001 / faculty123
echo    HOD:       hod_001     / hod123
echo    Principal: principal_001 / principal123
echo.
echo 🏫 College: STUDYWORLD COLLEGE OF ENGINEERING
echo.
echo 📊 Backend logs: Check "Backend Server" window
echo 📊 Frontend logs: Check "Frontend Server" window
echo.
echo ====================================================================
pause
