#!/usr/bin/env pwsh

Write-Host ""
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host "  🚀 Starting Digital Leave Letter System" -ForegroundColor Green
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/4] Starting backend server on port 5000..." -ForegroundColor Yellow
Start-Process -NoNewWindow -FilePath "cmd" -ArgumentList "/k", "node server.js"
Write-Host "      ✓ Backend server window opened" -ForegroundColor Green

Write-Host ""
Write-Host "[2/4] Waiting 3 seconds for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "[3/4] Seeding test users to database..." -ForegroundColor Yellow
& node seed-test-users.js
Write-Host "      ✓ Test users seeded" -ForegroundColor Green

Start-Sleep -Seconds 1

Write-Host ""
Write-Host "[4/4] Starting frontend server on port 3000..." -ForegroundColor Yellow
Start-Process -NoNewWindow -FilePath "cmd" -ArgumentList "/k", "node frontend-server.js"
Write-Host "      ✓ Frontend server window opened" -ForegroundColor Green

Write-Host ""
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host "  ✅ Both servers are starting!" -ForegroundColor Green
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 OPEN IN BROWSER:" -ForegroundColor Cyan
Write-Host "   http://localhost:3000/login/login.html" -ForegroundColor Green
Write-Host ""
Write-Host "👤 TEST CREDENTIALS:" -ForegroundColor Cyan
Write-Host "   Student:   student_001 / student123" -ForegroundColor White
Write-Host "   Faculty:   faculty_001 / faculty123" -ForegroundColor White
Write-Host "   HOD:       hod_001     / hod123" -ForegroundColor White
Write-Host "   Principal: principal_001 / principal123" -ForegroundColor White
Write-Host ""
Write-Host "🏫 College: STUDYWORLD COLLEGE OF ENGINEERING" -ForegroundColor Magenta
Write-Host ""
Write-Host "📊 Backend logs: Check Command Prompt window #1" -ForegroundColor Yellow
Write-Host "📊 Frontend logs: Check Command Prompt window #2" -ForegroundColor Yellow
Write-Host ""
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Enter to continue..." -ForegroundColor Yellow
Read-Host
