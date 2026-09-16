// build_dashboard.js
// Script to generate the comprehensive, production-grade frontend/dashboard.html
const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'frontend', 'dashboard.html');

console.log('Generating dashboard HTML at:', targetPath);

// We will construct the HTML content cleanly in parts.
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SWCE Final Dashboards All Buttons Working RealTime Professional</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: {
              DEFAULT: '#0A2D6A',
              dark: '#071f4a',
              light: '#133e8d',
            },
            accent: {
              blue: '#DBEAFE',
              blueDark: '#1E40AF',
            }
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: #F6F8FB;
      color: #111827;
      margin: 0;
      padding: 0;
    }
    .lift-on-hover {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .lift-on-hover:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
    }
    .sidebar-menu-btn {
      transition: all 0.2s ease;
    }
    .sidebar-menu-btn.active {
      background-color: #FFFFFF !important;
      color: #0A2D6A !important;
      font-weight: 600;
    }
    .sidebar-menu-btn:not(.active):hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: #FFFFFF;
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .shimmer-bar::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      animation: shimmer 1.6s infinite;
    }
    @keyframes bounceScale {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.15); }
    }
    .badge-bounce {
      animation: bounceScale 1.2s infinite ease-in-out;
    }
    .card-stagger {
      animation: fadeIn 0.3s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    /* Stepper connector line */
    .stepper-line {
      transition: width 0.8s ease-in-out;
    }
    /* Hide scrollbar for tabs */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
</head>
<body class="bg-[#F6F8FB] text-[#111827] flex min-h-screen">

  <!-- SIDEBAR (w-60 bg-[#0A2D6A] fixed left height full slide-in-left) -->
  <aside id="mainSidebar" class="w-60 bg-[#0A2D6A] text-white fixed left-0 top-0 bottom-0 z-30 flex flex-col justify-between shadow-lg border-r border-[#0A2D6A]">
    <!-- Top Branding & Navigation -->
    <div class="flex flex-col h-full overflow-y-auto no-scrollbar">
      <!-- College Logo & Name -->
      <div class="p-4 border-b border-white/10 flex items-center gap-3">
        <img src="../logo.png" onerror="this.onerror=null; this.src='logo.png';" alt="SWCE Logo" class="h-8 w-auto bg-white rounded-[6px] object-contain p-1 flex-shrink-0" />
        <div class="leading-tight overflow-hidden">
          <h1 class="text-sm font-bold text-white tracking-tight truncate">STUDY WORLD College</h1>
          <p class="text-xs text-gray-300">Coimbatore</p>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="p-3 space-y-1 text-sm font-medium" id="sidebarMenu">
        <!-- Common / Student Items -->
        <button onclick="showPage('dashboard')" id="nav-dashboard" class="sidebar-menu-btn active w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>
          <span class="truncate">Dashboard</span>
        </button>

        <button onclick="showPage('student-profile')" id="nav-student-profile" class="sidebar-menu-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-200 transition">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
          <span class="truncate">Profile</span>
        </button>

        <button onclick="showPage('student-leave')" id="nav-student-leave" class="sidebar-menu-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-200 transition">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
          <span class="truncate">Student Leave</span>
        </button>

        <button onclick="showPage('my-leave')" id="nav-my-leave" class="sidebar-menu-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-200 transition">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span class="truncate">My Status</span>
        </button>

        <!-- Faculty Specific -->
        <button onclick="showPage('faculty-attendance')" id="nav-faculty-attendance" class="sidebar-menu-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-200 transition">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>
          <span class="truncate">Faculty Attendance</span>
        </button>

        <button onclick="showPage('faculty-leave')" id="nav-faculty-leave" class="sidebar-menu-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-200 transition">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"/></svg>
          <span class="truncate">Faculty Leave</span>
        </button>

        <button onclick="showPage('faculty-approval')" id="nav-faculty-approval" class="sidebar-menu-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-200 transition">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-7.5-6h10.5A2.25 2.25 0 0120.25 6v12a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V6A2.25 2.25 0 016.75 3.75z"/></svg>
          <span class="truncate">Student Approval</span>
          <span id="navBadgeFacultyApproval" class="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full hidden">0</span>
        </button>

        <!-- HOD Specific -->
        <button onclick="showPage('hod-approval')" id="nav-hod-approval" class="sidebar-menu-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-200 transition">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"/></svg>
          <span class="truncate">Faculty Approval</span>
          <span id="navBadgeHodApproval" class="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full hidden">0</span>
        </button>

        <!-- Principal Specific -->
        <button onclick="showPage('principal-approval')" id="nav-principal-approval" class="sidebar-menu-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-200 transition">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V8.25A2.25 2.25 0 0118 10.5H6a2.25 2.25 0 01-2.25-2.25V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.124-.08M12 14.25a3 3 0 100-6 3 3 0 000 6z"/></svg>
          <span class="truncate">Principal Approval</span>
          <span id="navBadgePrincipalApproval" class="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full hidden">0</span>
        </button>

        <button onclick="showPage('admin-panel')" id="nav-admin-panel" class="sidebar-menu-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-200 transition">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
          <span class="truncate">Admin Panel</span>
        </button>

        <button onclick="showPage('reports')" id="nav-reports" class="sidebar-menu-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-200 transition">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
          <span class="truncate">Reports</span>
        </button>

        <button onclick="showPage('settings')" id="nav-settings" class="sidebar-menu-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-200 transition">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.6 6.6 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span class="truncate">Settings</span>
        </button>
      </nav>
    </div>















  <!-- MAIN WRAPPER (ml-60 bg-[#F6F8FB] min-h-screen) -->
  <div class="ml-60 flex-1 flex flex-col min-w-0">
    
    <!-- HEADER (h-14 bg-white border-b #E5E7EB sticky top-0 z-20) -->
    <header class="h-14 bg-white border-b border-[#E5E7EB] sticky top-0 z-20 flex items-center justify-between px-6">
      <!-- Left: Breadcrumbs & Role Badge -->
      <div class="flex items-center gap-3">
        <span id="pageBreadcrumb" class="text-sm font-semibold text-gray-800">Dashboard</span>
        <span id="headerRoleBadge" class="px-2 py-0.5 rounded-full bg-[#DBEAFE] text-[#0A2D6A] text-xs font-medium">Student</span>
      </div>

      <!-- Right: Real-time Live Status, Bell, User Info, Logout -->
      <div class="flex items-center gap-4">
        <!-- Live System Pulse indicator -->
        <div class="flex items-center gap-1.5 text-xs text-gray-500 mr-1">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-[11px] font-medium text-emerald-700 hidden sm:inline">Realtime Live</span>
        </div>

        <!-- Notification Bell with Red Badge -->
        <div class="relative">
          <button id="headerBellBtn" onclick="toggleNotifDropdown()" class="relative p-1.5 text-gray-500 hover:text-[#0A2D6A] hover:bg-gray-100 rounded-lg transition" title="Notifications">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/></svg>
            <span id="headerBellBadge" class="badge-bounce absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">0</span>
          </button>
          <!-- Notification Dropdown -->
          <div id="notifDropdown" class="hidden absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#E5E7EB] p-3 z-50 text-xs">
            <div class="flex justify-between items-center pb-2 border-b border-gray-100 font-semibold text-gray-800">
              <span>Real-Time Notifications</span>
              <button onclick="clearAllNotifications()" class="text-xs text-[#0A2D6A] hover:underline font-normal">Clear</button>
            </div>
            <div id="notifDropdownList" class="max-h-60 overflow-y-auto divide-y divide-gray-100 py-1 space-y-1">
              <p class="text-gray-400 py-3 text-center">No new notifications</p>
            </div>
          </div>
        </div>

        <!-- User Profile Info -->
        <div class="flex items-center gap-2.5">
          <img id="headerProfilePhoto" src="" class="w-8 h-8 rounded-full border border-gray-200 object-cover bg-gray-100" onerror="this.src='https://ui-avatars.com/api/?name=User&background=0A2D6A&color=fff';" alt="Avatar">
          <div class="hidden sm:block leading-tight text-left">
            <div id="headerUserName" class="text-sm font-medium text-gray-900 leading-none">Arun Kumar</div>
            <div id="headerUserMail" class="text-xs text-gray-500 mt-0.5">arun@gmail.com</div>
          </div>
        </div>

        <!-- Logout Button -->
        <button id="headerLogoutBtn" onclick="handleLogout()" class="bg-[#0A2D6A] text-white text-xs font-medium px-3 py-1.5 rounded-lg lift-on-hover shadow-sm">
          Logout
        </button>
      </div>
    </header>

    <!-- REAL-TIME STATUS BAR NOTIFICATION BANNER (facultyNotifBar, hodNotifBar, principalNotifBar) -->
    <div id="realtimeNotifBar" class="bg-blue-50 border-b border-blue-100 px-6 py-2 flex items-center justify-between text-xs text-[#0A2D6A]">
      <div class="flex items-center gap-2">
        <span class="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
        <span id="roleNotifContent" class="font-medium">System ready. Real-time synchronizer active.</span>
      </div>
      <span id="roleNotifTime" class="text-gray-500 text-[11px]">Just now</span>
    </div>

    <!-- MAIN PAGES CONTAINER (bg-[#F6F8FB] p-6) -->
    <main class="p-6 flex-1 max-w-[1400px] w-full mx-auto">
      
      <!-- ======================================================== -->
      <!-- 1. STUDENT DASHBOARD (id="page-dashboard") -->
      <!-- ======================================================== -->
      <div id="page-dashboard" class="page-content space-y-6">
        <!-- Top Row 2 Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Left: Profile Quick Card -->
          <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm lift-on-hover flex flex-col sm:flex-row items-start sm:items-center gap-4 card-stagger">
            <img id="dashStudentPhoto" src="" class="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover bg-gray-100 flex-shrink-0" onerror="this.src='https://ui-avatars.com/api/?name=Arun+Kumar&background=0A2D6A&color=fff';" alt="Student Photo">
            <div class="space-y-1">
              <h2 id="dashStudentName" class="text-base font-semibold text-gray-900 leading-tight">Arun Kumar</h2>
              <p id="dashStudentReg" class="text-xs text-gray-500 font-mono">Reg: 7324CS001</p>
              <p id="dashStudentDept" class="text-xs text-gray-500">Dept: CSE | Year: III Year</p>
              <p id="dashStudentEmail" class="text-xs text-gray-600">Email: arun@gmail.com</p>
              <p id="dashStudentPhone" class="text-xs text-gray-600">Student No: 9123456789</p>
            </div>
          </div>

          <!-- Right: Minimal Stats Cards (3 cards) -->
          <div class="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- Total Leaves -->
            <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm lift-on-hover flex flex-col justify-between card-stagger">
              <div class="flex justify-between items-start">
                <span class="text-xs text-gray-500 font-medium">Total Leaves</span>
                <span class="p-1.5 rounded-lg bg-blue-50 text-[#0A2D6A]">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12"/></svg>
                </span>
              </div>
              <div class="mt-3">
                <span id="dashTotalLeavesCount" class="text-2xl font-bold text-[#0A2D6A]">0</span>
                <div class="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden mt-2 relative">
                  <div class="h-full bg-[#0A2D6A] rounded-full shimmer-bar" style="width: 70%;"></div>
                </div>
              </div>
            </div>

            <!-- Pending Leaves -->
            <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm lift-on-hover flex flex-col justify-between card-stagger">
              <div class="flex justify-between items-start">
                <span class="text-xs text-gray-500 font-medium">Pending</span>
                <span class="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </span>
              </div>
              <div class="mt-3">
                <span id="dashPendingLeavesCount" class="text-2xl font-bold text-amber-600">0</span>
                <div class="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden mt-2 relative">
                  <div class="h-full bg-amber-500 rounded-full" style="width: 40%;"></div>
                </div>
              </div>
            </div>

            <!-- Approved Leaves -->
            <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm lift-on-hover flex flex-col justify-between card-stagger">
              <div class="flex justify-between items-start">
                <span class="text-xs text-gray-500 font-medium">Approved</span>
                <span class="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </span>
              </div>
              <div class="mt-3">
                <span id="dashApprovedLeavesCount" class="text-2xl font-bold text-emerald-600">0</span>
                <div class="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden mt-2 relative">
                  <div class="h-full bg-emerald-500 rounded-full shimmer-bar" style="width: 85%;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Attendance & Leave Stats (2 Cards) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Attendance Stat Card -->
          <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm lift-on-hover card-stagger">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Attendance Ratio</span>
              <span id="dashAttendancePercent" class="text-2xl font-bold text-[#0A2D6A]">85%</span>
            </div>
            <div class="h-2.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden relative">
              <div id="dashAttendanceBar" class="h-full bg-[#0A2D6A] rounded-full transition-all duration-1000 shimmer-bar" style="width: 85%;"></div>
            </div>
            <div class="flex justify-between text-[11px] text-gray-400 mt-2">
              <span>Required: 75%</span>
              <span id="dashAttendanceStatusText" class="text-emerald-600 font-medium">Good Standing</span>
            </div>
          </div>

          <!-- Leave Stat Card -->
          <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm lift-on-hover card-stagger">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Leave Consumed</span>
              <span id="dashLeavePercent" class="text-2xl font-bold text-emerald-600">15%</span>
            </div>
            <div class="h-2.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden relative">
              <div id="dashLeaveBar" class="h-full bg-emerald-500 rounded-full transition-all duration-1000 shimmer-bar" style="width: 15%;"></div>
            </div>
            <div class="flex justify-between text-[11px] text-gray-400 mt-2">
              <span>Academic Limit: 25%</span>
              <span class="text-gray-500">Normal Range</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap gap-2.5">
              <button id="btnApplyLeaveStudent" onclick="showPage('student-leave')" class="bg-[#0A2D6A] text-white text-sm font-medium px-4 py-2 rounded-lg lift-on-hover shadow-sm flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
                Apply Leave
              </button>
              <button id="btnMyStatusStudent" onclick="showPage('my-leave')" class="bg-white border border-[#E5E7EB] text-[#0A2D6A] hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg lift-on-hover shadow-sm">
                View My Status
              </button>
              <button id="btnProfileStudent" onclick="showPage('student-profile')" class="bg-white border border-[#E5E7EB] text-gray-700 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg lift-on-hover shadow-sm">
                View Profile
              </button>
              <button id="editProfileBtnStudent" onclick="showPage('student-profile')" class="bg-white border border-[#E5E7EB] text-gray-700 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg lift-on-hover shadow-sm">
                Edit Profile
              </button>
            </div>
            <span class="text-xs text-gray-400">Synced in real-time</span>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 2. STUDENT PROFILE PAGE (id="page-student-profile") -->
      <!-- ======================================================== -->
      <div id="page-student-profile" class="page-content hidden space-y-6">
        <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-sm card-stagger">
          <div class="flex justify-between items-center pb-4 mb-6 border-b border-[#E5E7EB]">
            <div>
              <h2 class="text-lg font-bold text-[#0A2D6A]">Student Academic Profile</h2>
              <p class="text-xs text-gray-500">Official student records and attendance percentages</p>
            </div>
            <div id="lastUpdatedInfo" class="text-xs bg-blue-50 text-[#0A2D6A] px-3 py-1 rounded-full font-medium">
              Updated Just now
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Left: Profile Photo & Upload -->
            <div class="lg:col-span-4 flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div class="relative">
                <img id="profilePicPreview" src="" class="w-24 h-24 rounded-full border-2 border-white shadow-md object-cover bg-white" onerror="this.src='https://ui-avatars.com/api/?name=Arun+Kumar&background=0A2D6A&color=fff';" alt="Student Avatar">
              </div>
              <label for="profilePicInput" class="mt-4 cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/></svg>
                Change Photo
              </label>
              <input type="file" id="profilePicInput" accept="image/png, image/jpeg" class="hidden" onchange="handleProfilePicChange(event)">
              <span class="text-[11px] text-gray-400 mt-2">PNG or JPEG (Max 2MB)</span>

              <!-- Live Progress Display on Profile -->
              <div class="w-full mt-6 space-y-4 text-left">
                <div>
                  <div class="flex justify-between text-xs font-medium text-gray-700 mb-1">
                    <span>Attendance Rate</span>
                    <span id="profileAttText">85%</span>
                  </div>
                  <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div id="profileAttBar" class="h-full bg-[#0A2D6A] transition-all duration-1000" style="width: 85%;"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-xs font-medium text-gray-700 mb-1">
                    <span>Leave Consumed</span>
                    <span id="profileLeaveText">15%</span>
                  </div>
                  <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div id="profileLeaveBar" class="h-full bg-emerald-500 transition-all duration-1000" style="width: 15%;"></div>
                  </div>
                </div>
                <div class="pt-2 text-[11px] text-gray-500 border-t border-gray-200" id="facultyEditNotice">
                  Last updated by Faculty: <span>Today, Active</span>
                </div>
              </div>
            </div>

            <!-- Right: Editable Inputs -->
            <form id="studentProfileForm" onsubmit="handleProfileSave(event)" class="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Student Full Name</label>
                <input type="text" id="profileName" required class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#0A2D6A] focus:border-[#0A2D6A] outline-none" value="Arun Kumar">
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Register Number</label>
                <input type="text" id="regNo" placeholder="7324CS001" required pattern="^[0-9]{4}[A-Z]{2,4}[0-9]{3}$" class="w-full text-sm font-mono border border-[#E5E7EB] rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#0A2D6A] focus:border-[#0A2D6A] outline-none" value="7324CS001">
                <span class="text-[10px] text-gray-400">Format: 4 digits, 2-4 uppercase, 3 digits</span>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
                <input type="date" id="dob" required class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#0A2D6A] focus:border-[#0A2D6A] outline-none" value="2004-05-14">
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Attendance Percentage (0-100)</label>
                <input type="number" id="attendancePercent" min="0" max="100" readonly class="w-full text-sm border border-[#E5E7EB] bg-gray-50 rounded-lg px-3 py-2 text-gray-600 outline-none" value="85">
                <span class="text-[10px] text-gray-400">Editable by faculty in Attendance ERP</span>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Leave Percentage (0-100)</label>
                <input type="number" id="leavePercent" min="0" max="100" readonly class="w-full text-sm border border-[#E5E7EB] bg-gray-50 rounded-lg px-3 py-2 text-gray-600 outline-none" value="15">
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Parent Mobile Number</label>
                <input type="tel" id="parentNumber" maxlength="10" pattern="^[0-9]{10}$" required class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#0A2D6A] focus:border-[#0A2D6A] outline-none" value="9876543210">
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Student Mobile Number</label>
                <input type="tel" id="studentNumber" maxlength="10" pattern="^[0-9]{10}$" required class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#0A2D6A] focus:border-[#0A2D6A] outline-none" value="9123456789">
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">UserMail ID</label>
                <input type="text" id="displayUserMail" readonly class="w-full text-sm border border-[#E5E7EB] bg-gray-50 rounded-lg px-3 py-2 text-gray-500 outline-none" value="arun@gmail.com">
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">College Email ID</label>
                <input type="text" id="displayCollegeMail" readonly class="w-full text-sm border border-[#E5E7EB] bg-gray-50 rounded-lg px-3 py-2 text-gray-500 outline-none" value="arun.cs@swce.ac.in">
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Department / Year</label>
                <input type="text" id="displayDeptYear" readonly class="w-full text-sm border border-[#E5E7EB] bg-gray-50 rounded-lg px-3 py-2 text-gray-500 outline-none" value="CSE | III Year">
              </div>

              <div class="md:col-span-2 pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button type="submit" id="saveProfileBtn" class="bg-[#0A2D6A] text-white text-sm font-medium px-5 py-2.5 rounded-lg lift-on-hover shadow-sm">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 3. STUDENT LEAVE APPLICATION PAGE (id="page-student-leave") -->
      <!-- ======================================================== -->
      <div id="page-student-leave" class="page-content hidden space-y-6">
        <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-sm card-stagger max-w-4xl mx-auto">
          <div class="pb-4 mb-6 border-b border-[#E5E7EB] flex justify-between items-center">
            <div>
              <h2 class="text-lg font-bold text-[#0A2D6A]">Leave Application Letter</h2>
              <p class="text-xs text-gray-500">Formal academic leave request with auto-workflow routing</p>
            </div>
            <span class="text-xs bg-blue-50 text-[#0A2D6A] px-2.5 py-1 rounded-full font-medium">Standard ERP Format</span>
          </div>

          <form id="studentLeaveForm" onsubmit="handleLeaveSubmit(event)" class="space-y-4">
            <!-- From Section -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div class="sm:col-span-2">
                <label class="block text-xs font-medium text-gray-700 mb-1">FROM (Student Name)</label>
                <input type="text" id="fromName" required class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none focus:border-[#0A2D6A]" value="Arun Kumar">
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Department</label>
                <select id="leaveDept" class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none focus:border-[#0A2D6A]">
                  <option value="CSE">CSE</option>
                  <option value="AI&DS">AI&DS</option>
                  <option value="AI&ML">AI&ML</option>
                  <option value="CYBER SECURITY">CYBER SECURITY</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="ECE">ECE</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Year</label>
                <select id="leaveYear" class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none focus:border-[#0A2D6A]">
                  <option value="I Year">I Year</option>
                  <option value="II Year">II Year</option>
                  <option value="III Year" selected>III Year</option>
                  <option value="IV Year">IV Year</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Roll / Reg No</label>
                <input type="text" id="rollNo" required class="w-full text-sm font-mono border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none" value="7324CS001">
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Letter Date</label>
                <input type="date" id="letterDate" required class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none">
              </div>
              <div class="sm:col-span-2">
                <label class="block text-xs font-medium text-gray-700 mb-1">TO (Designation)</label>
                <input type="text" id="toDesignation" required class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none" value="The Class Advisor">
              </div>
            </div>

            <!-- Subject & Dates -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Leave Subject</label>
                <select id="leaveSubject" onchange="onSubjectChange()" class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none focus:border-[#0A2D6A]">
                  <option value="Fever / Sick">Fever / Sick</option>
                  <option value="Medical">Medical</option>
                  <option value="Family Wedding">Family Wedding</option>
                  <option value="Family Emergency">Family Emergency</option>
                  <option value="OD Symposium">OD Symposium</option>
                  <option value="OD Sports">OD Sports</option>
                  <option value="Personal">Personal</option>
                  <option value="Festival Onam Function">Festival Onam Function</option>
                  <option value="Pongal Function">Pongal Function</option>
                  <option value="Diwali Function">Diwali Function</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div id="customSubjectBox" class="hidden">
                <label class="block text-xs font-medium text-gray-700 mb-1">Custom Subject Title</label>
                <input type="text" id="customSubject" placeholder="Enter reason..." class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none">
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">From Date</label>
                <input type="date" id="fromDate" required onchange="calculateDays()" class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none">
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">To Date</label>
                <input type="date" id="toDate" required onchange="calculateDays()" class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none">
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Total Days</label>
                <input type="number" id="noDays" readonly class="w-full text-sm border border-[#E5E7EB] bg-gray-50 rounded-lg px-3 py-2 font-semibold text-[#0A2D6A]" value="1">
              </div>
            </div>

            <!-- Letter Body with Auto-Write -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="block text-xs font-medium text-gray-700">Body of Letter</label>
                <button type="button" id="autoWriteBtn" onclick="generateBody()" class="inline-flex items-center gap-1.5 text-xs text-white bg-[#0A2D6A] px-3 py-1 rounded-md lift-on-hover shadow-sm">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l2.846-.813a4.5 4.5 0 003.09-3.09L21.75 8.04a2.25 2.25 0 00-3.182-3.182l-6.804 6.804a4.5 4.5 0 00-3.09 3.09zM3.75 21h16.5"/></svg>
                  Auto-Write Formal Body
                </button>
              </div>
              <textarea id="leaveBody" rows="6" required class="w-full text-sm border border-[#E5E7EB] rounded-lg p-3 outline-none focus:border-[#0A2D6A] leading-relaxed text-gray-800" placeholder="Click 'Auto-Write Formal Body' or type letter here..."></textarea>
            </div>

            <!-- Submit Button -->
            <div class="pt-4 flex justify-end">
              <button type="submit" id="submitLeaveBtn" class="bg-[#0A2D6A] text-white text-sm font-semibold px-6 py-2.5 rounded-lg lift-on-hover shadow-md flex items-center gap-2">
                <span>Submit Leave Letter</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 4. MY STATUS PAGE (id="page-my-leave") -->
      <!-- ======================================================== -->
      <div id="page-my-leave" class="page-content hidden space-y-6">
        <!-- Tracking Input Card -->
        <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger">
          <div class="flex flex-col sm:flex-row items-center gap-3">
            <div class="flex-1 w-full">
              <label class="block text-xs font-medium text-gray-700 mb-1">Enter Tracking ID</label>
              <input type="text" id="trackingInput" placeholder="e.g. SWCE2026..." class="w-full text-sm font-mono border border-[#E5E7EB] rounded-lg px-3 py-2 uppercase outline-none focus:border-[#0A2D6A]">
            </div>
            <div class="self-end w-full sm:w-auto">
              <button id="trackBtn" onclick="trackSingleLeave()" class="w-full sm:w-auto bg-[#0A2D6A] text-white text-sm font-medium px-5 py-2 rounded-lg lift-on-hover shadow-sm">
                Track Status
              </button>
            </div>
          </div>
        </div>

        <!-- My Leaves Cards List -->
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <h2 class="text-base font-bold text-gray-800">My Leave Applications</h2>
            <span id="myLeaveCountBadge" class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">0 requests</span>
          </div>

          <div id="myLeaveList" class="space-y-4">
            <!-- Dynamic cards rendered by JS -->
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 5. FACULTY DASHBOARD (id="page-faculty-dashboard") -->
      <!-- ======================================================== -->
      <div id="page-faculty-dashboard" class="page-content hidden space-y-6">
        <!-- Faculty Top Stats (3 cards) -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm lift-on-hover card-stagger">
            <span class="text-xs text-gray-500 font-medium">Total Students</span>
            <div class="mt-2 flex items-baseline justify-between">
              <span id="facTotalStudents" class="text-2xl font-bold text-[#0A2D6A]">0</span>
              <span class="text-xs text-gray-400">Enrolled</span>
            </div>
          </div>

          <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm lift-on-hover card-stagger">
            <span class="text-xs text-gray-500 font-medium">Present Today</span>
            <div class="mt-2 flex items-baseline justify-between">
              <span id="facPresentToday" class="text-2xl font-bold text-emerald-600">0</span>
              <span class="text-xs text-emerald-600 font-medium">Verified</span>
            </div>
          </div>

          <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm lift-on-hover card-stagger">
            <span class="text-xs text-gray-500 font-medium">Pending Leaves</span>
            <div class="mt-2 flex items-baseline justify-between">
              <span id="facPendingLeavesCount" class="text-2xl font-bold text-amber-600">0</span>
              <span class="text-xs text-amber-600 font-medium">Needs Action</span>
            </div>
          </div>
        </div>

        <!-- Student List Table (5 columns only) -->
        <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 mb-4 border-b border-[#E5E7EB]">
            <div>
              <h3 class="text-base font-bold text-gray-900">Student Attendance & Performance</h3>
              <p class="text-xs text-gray-500">Student metrics with secure attendance editor</p>
            </div>
            <!-- Search input -->
            <input type="text" id="studentSearchInput" oninput="filterStudentTable()" placeholder="Search student name..." class="text-xs border border-[#E5E7EB] rounded-lg px-3 py-1.5 w-64 outline-none focus:border-[#0A2D6A]">
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm" id="studentListTable">
              <thead class="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-100">
                <tr>
                  <th class="py-2.5 px-3">Photo</th>
                  <th class="py-2.5 px-3">Name</th>
                  <th class="py-2.5 px-3">Attendance</th>
                  <th class="py-2.5 px-3">Leave</th>
                  <th class="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody id="studentListBody" class="divide-y divide-gray-100 text-xs">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Faculty Attendance & Quick Actions Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Mark Faculty Attendance Card -->
          <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger">
            <h3 class="text-sm font-semibold text-gray-800 mb-3">Mark Faculty Attendance</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Date</label>
                <input type="date" id="facultyAttendanceDate" class="w-full text-xs border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 bg-white outline-none">
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Status</label>
                <select id="facultyAttendanceStatus" class="w-full text-xs border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 bg-white outline-none">
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="OD">On Duty (OD)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Location</label>
                <select id="facultyAttendanceLocation" class="w-full text-xs border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 bg-white outline-none">
                  <option value="Inside Campus">Inside Campus</option>
                  <option value="Outside Campus">Outside Campus</option>
                  <option value="QR">QR Verification</option>
                </select>
              </div>
            </div>
            <button id="markFacultyAttendanceBtn" onclick="markFacultyAttendance()" class="bg-[#0A2D6A] text-white text-xs font-medium px-4 py-2 rounded-lg lift-on-hover shadow-sm">
              Mark Attendance
            </button>

            <!-- Faculty Attendance History Table -->
            <div class="mt-5 border-t border-gray-100 pt-4">
              <h4 class="text-xs font-semibold text-gray-700 mb-2">Faculty Attendance Records</h4>
              <div class="overflow-x-auto max-h-40">
                <table class="w-full text-left text-xs" id="facultyAttendanceTable">
                  <thead class="text-[10px] uppercase text-gray-400 border-b">
                    <tr>
                      <th class="py-1">Date</th>
                      <th class="py-1">Status</th>
                      <th class="py-1">Location</th>
                    </tr>
                  </thead>
                  <tbody id="facultyAttendanceBody" class="divide-y divide-gray-50">
                    <!-- Populated via JS -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Weekly Chart & Apply Faculty Leave Card -->
          <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center mb-3">
                <h3 class="text-sm font-semibold text-gray-800">Weekly Faculty Attendance Summary</h3>
                <span class="text-[11px] text-gray-400">Current Week</span>
              </div>
              <!-- Visual bar chart for attendance -->
              <div id="facultyAttendanceChart" class="flex items-end justify-between h-28 pt-4 pb-2 border-b border-gray-100 px-2 gap-2">
                <div class="flex flex-col items-center gap-1 flex-1">
                  <div class="w-full bg-[#0A2D6A] rounded-t" style="height: 80%;"></div>
                  <span class="text-[10px] text-gray-500">Mon</span>
                </div>
                <div class="flex flex-col items-center gap-1 flex-1">
                  <div class="w-full bg-[#0A2D6A] rounded-t" style="height: 95%;"></div>
                  <span class="text-[10px] text-gray-500">Tue</span>
                </div>
                <div class="flex flex-col items-center gap-1 flex-1">
                  <div class="w-full bg-[#0A2D6A] rounded-t" style="height: 90%;"></div>
                  <span class="text-[10px] text-gray-500">Wed</span>
                </div>
                <div class="flex flex-col items-center gap-1 flex-1">
                  <div class="w-full bg-[#0A2D6A] rounded-t" style="height: 85%;"></div>
                  <span class="text-[10px] text-gray-500">Thu</span>
                </div>
                <div class="flex flex-col items-center gap-1 flex-1">
                  <div class="w-full bg-[#0A2D6A] rounded-t" style="height: 100%;"></div>
                  <span class="text-[10px] text-gray-500">Fri</span>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 class="text-xs font-semibold text-gray-800">Need Leave as Faculty?</h4>
                <p class="text-[11px] text-gray-500">Directly route to HOD and Principal approval</p>
              </div>
              <button id="btnFacultyLeaveApply" onclick="showPage('faculty-leave')" class="bg-[#0A2D6A] text-white text-xs font-medium px-4 py-2 rounded-lg lift-on-hover shadow-sm">
                Apply Faculty Leave
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 6. FACULTY LEAVE PAGE (id="page-faculty-leave") -->
      <!-- ======================================================== -->
      <div id="page-faculty-leave" class="page-content hidden space-y-6">
        <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-sm card-stagger max-w-4xl mx-auto">
          <div class="pb-4 mb-6 border-b border-[#E5E7EB] flex justify-between items-center">
            <div>
              <h2 class="text-lg font-bold text-[#0A2D6A]">Faculty Leave Application</h2>
              <p class="text-xs text-gray-500">Official leave workflow: Faculty &rarr; HOD &rarr; Principal</p>
            </div>
            <span class="text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full font-medium">Faculty Quota</span>
          </div>

          <form id="facultyLeaveForm" onsubmit="handleFacultyLeaveSubmit(event)" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div class="sm:col-span-2">
                <label class="block text-xs font-medium text-gray-700 mb-1">FROM Faculty Name</label>
                <input type="text" id="facultyFromName" required class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none" value="Dr. M. Ramanathan">
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Department</label>
                <input type="text" id="facLeaveDept" class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none" value="CSE">
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Designation</label>
                <input type="text" id="facDesignation" class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none" value="Associate Professor">
              </div>
              <div class="sm:col-span-4">
                <label class="block text-xs font-medium text-gray-700 mb-1">TO (Approvers)</label>
                <input type="text" readonly class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-gray-100 text-gray-600 outline-none" value="Head of the Department / The Principal, SWCE">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Subject</label>
                <select id="facLeaveSubject" class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none">
                  <option value="Medical">Medical Leave</option>
                  <option value="Family Wedding">Family Wedding</option>
                  <option value="OD Symposium">OD - Paper Presentation / Symposium</option>
                  <option value="Personal">Personal Urgent Work</option>
                  <option value="Festival">Festival Celebration</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">From Date</label>
                <input type="date" id="facFromDate" required onchange="calculateFacDays()" class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none">
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">To Date</label>
                <input type="date" id="facToDate" required onchange="calculateFacDays()" class="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none">
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">No. of Days</label>
                <input type="number" id="facNoDays" readonly class="w-full text-sm border border-[#E5E7EB] bg-gray-50 rounded-lg px-3 py-2 font-semibold text-[#0A2D6A]" value="1">
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="block text-xs font-medium text-gray-700">Body of Letter</label>
                <button type="button" onclick="generateFacultyBody()" class="text-xs text-white bg-[#0A2D6A] px-3 py-1 rounded-md lift-on-hover shadow-sm">
                  Auto-Write Formal Body
                </button>
              </div>
              <textarea id="facLeaveBody" rows="5" required class="w-full text-sm border border-[#E5E7EB] rounded-lg p-3 outline-none focus:border-[#0A2D6A] leading-relaxed text-gray-800" placeholder="Type formal leave request..."></textarea>
            </div>

            <div class="pt-4 flex justify-end">
              <button type="submit" id="submitFacultyLeaveBtn" class="bg-[#0A2D6A] text-white text-sm font-semibold px-6 py-2.5 rounded-lg lift-on-hover shadow-md">
                Submit Faculty Leave
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 7. STUDENT APPROVAL PAGE (FACULTY LEVEL) (id="page-faculty-approval") -->
      <!-- ======================================================== -->
      <div id="page-faculty-approval" class="page-content hidden space-y-6">
        <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger">
          <div class="flex justify-between items-center pb-4 mb-4 border-b border-[#E5E7EB]">
            <div>
              <h2 class="text-base font-bold text-gray-900">Student Leave Approval (Faculty Review)</h2>
              <p class="text-xs text-gray-500">Approve and forward requests to HOD</p>
            </div>
            <span id="facultyBellCount" class="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-semibold">0 Pending</span>
          </div>

          <!-- Forward Instructions Banner (hidden until approved) -->
          <div id="forwardBanner" class="hidden mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center justify-between">
            <span>Faculty Approved. Click Forward to pass to HOD.</span>
            <span class="font-semibold text-[10px] bg-emerald-100 px-2 py-0.5 rounded">Action Ready</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm" id="facultyApprovalTable">
              <thead class="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-100">
                <tr>
                  <th class="py-2.5 px-3">Photo</th>
                  <th class="py-2.5 px-3">Tracking ID</th>
                  <th class="py-2.5 px-3">Name</th>
                  <th class="py-2.5 px-3">Dept</th>
                  <th class="py-2.5 px-3">Subject</th>
                  <th class="py-2.5 px-3">Date</th>
                  <th class="py-2.5 px-3">Status</th>
                  <th class="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody id="facultyApprovalBody" class="divide-y divide-gray-100 text-xs">
                <!-- Dynamically filled -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 8. HOD PANEL (id="page-hod-approval") -->
      <!-- ======================================================== -->
      <div id="page-hod-approval" class="page-content hidden space-y-6">
        <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 mb-4 border-b border-[#E5E7EB]">
            <div>
              <h2 class="text-base font-bold text-gray-900">Head of Department Approval Portal</h2>
              <p class="text-xs text-gray-500">Review student leaves forwarded by faculty and staff requests</p>
            </div>
            <span id="hodBellCount" class="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-semibold">0 Awaiting HOD</span>
          </div>

          <!-- Two Tabs Pill Style -->
          <div class="flex items-center gap-2 mb-4 bg-gray-100 p-1 rounded-xl max-w-sm">
            <button id="hodTabStudents" onclick="switchHodTab('students')" class="flex-1 text-xs py-1.5 px-3 rounded-lg font-medium transition bg-[#0A2D6A] text-white">
              Student Leaves
            </button>
            <button id="hodTabFaculty" onclick="switchHodTab('faculty')" class="flex-1 text-xs py-1.5 px-3 rounded-lg font-medium transition text-gray-600 hover:text-[#0A2D6A]">
              Faculty Leaves
            </button>
          </div>

          <!-- Tab 1: Student Leaves forwarded to HOD -->
          <div id="hodStudentLeavesView" class="overflow-x-auto">
            <table class="w-full text-left text-sm" id="hodStudentLeavesTable">
              <thead class="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-100">
                <tr>
                  <th class="py-2.5 px-3">Tracking</th>
                  <th class="py-2.5 px-3">Name</th>
                  <th class="py-2.5 px-3">Dept</th>
                  <th class="py-2.5 px-3">Subject</th>
                  <th class="py-2.5 px-3">Date</th>
                  <th class="py-2.5 px-3">Status</th>
                  <th class="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody id="hodStudentLeavesBody" class="divide-y divide-gray-100 text-xs">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>

          <!-- Tab 2: Faculty Leaves -->
          <div id="hodFacultyLeavesView" class="hidden overflow-x-auto">
            <table class="w-full text-left text-sm" id="hodFacultyLeavesTable">
              <thead class="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-100">
                <tr>
                  <th class="py-2.5 px-3">Tracking</th>
                  <th class="py-2.5 px-3">Faculty Name</th>
                  <th class="py-2.5 px-3">Dept</th>
                  <th class="py-2.5 px-3">Subject</th>
                  <th class="py-2.5 px-3">Date</th>
                  <th class="py-2.5 px-3">Status</th>
                  <th class="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody id="hodFacultyLeavesBody" class="divide-y divide-gray-100 text-xs">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 9. PRINCIPAL APPROVAL PAGE (id="page-principal-approval") -->
      <!-- ======================================================== -->
      <div id="page-principal-approval" class="page-content hidden space-y-6">
        <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger">
          <div class="flex justify-between items-center pb-4 mb-4 border-b border-[#E5E7EB]">
            <div>
              <h2 class="text-base font-bold text-gray-900">Principal Final Approval Dashboard</h2>
              <p class="text-xs text-gray-500">Institution-wide final decision on all academic leave letters</p>
            </div>
            <span id="principalBellCount" class="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-semibold">0 Ready for Decision</span>
          </div>

          <!-- Green Banner: All Departments Auto -->
          <div class="mb-4 p-3 bg-[#D1FAE5] text-[#065F46] rounded-lg text-xs font-medium flex items-center gap-2">
            <svg class="w-4 h-4 text-[#065F46]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>All Departments Auto-Selected (AI&DS, AI&ML, CSE, CYBER SECURITY, EEE, MECH, CIVIL, ECE)</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm" id="principalApprovalTable">
              <thead class="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-100">
                <tr>
                  <th class="py-2.5 px-3">Tracking</th>
                  <th class="py-2.5 px-3">Name</th>
                  <th class="py-2.5 px-3">Dept</th>
                  <th class="py-2.5 px-3">Date</th>
                  <th class="py-2.5 px-3">Type</th>
                  <th class="py-2.5 px-3">Status</th>
                  <th class="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody id="principalApprovalBody" class="divide-y divide-gray-100 text-xs">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 10. ADMIN PANEL (id="page-admin-panel") -->
      <!-- ======================================================== -->
      <div id="page-admin-panel" class="page-content hidden space-y-6">
        <!-- Whitelist Management -->
        <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger">
          <div class="pb-3 mb-4 border-b border-[#E5E7EB]">
            <h2 class="text-base font-bold text-[#0A2D6A]">Whitelist Management</h2>
            <p class="text-xs text-gray-500">Configure role access for Faculty, HOD, and Principal accounts</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Faculty Whitelist -->
            <div class="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 class="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2">Faculty Whitelist</h3>
                <div class="flex gap-2 mb-3">
                  <input type="email" id="addFacultyEmailInput" placeholder="faculty@swce.ac.in" class="flex-1 text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white outline-none">
                  <button id="addFacultyBtn" onclick="addWhitelist('faculty')" class="bg-[#0A2D6A] text-white text-xs px-3 py-1.5 rounded-lg lift-on-hover font-medium">Add</button>
                </div>
              </div>
              <ul id="facultyWhitelistList" class="space-y-1.5 max-h-40 overflow-y-auto text-xs">
                <!-- Populated via JS -->
              </ul>
            </div>

            <!-- HOD Whitelist -->
            <div class="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 class="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2">HOD Whitelist</h3>
                <div class="flex gap-2 mb-3">
                  <input type="email" id="addHodEmailInput" placeholder="hod.cse@swce.ac.in" class="flex-1 text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white outline-none">
                  <button id="addHodBtn" onclick="addWhitelist('hod')" class="bg-[#0A2D6A] text-white text-xs px-3 py-1.5 rounded-lg lift-on-hover font-medium">Add</button>
                </div>
              </div>
              <ul id="hodWhitelistList" class="space-y-1.5 max-h-40 overflow-y-auto text-xs">
                <!-- Populated via JS -->
              </ul>
            </div>

            <!-- Principal Whitelist -->
            <div class="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 class="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2">Principal Whitelist</h3>
                <div class="flex gap-2 mb-3">
                  <input type="email" id="addPrincipalEmailInput" placeholder="principal@swce.ac.in" class="flex-1 text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white outline-none">
                  <button id="addPrincipalBtn" onclick="addWhitelist('principal')" class="bg-[#0A2D6A] text-white text-xs px-3 py-1.5 rounded-lg lift-on-hover font-medium">Add</button>
                </div>
              </div>
              <ul id="principalWhitelistList" class="space-y-1.5 max-h-40 overflow-y-auto text-xs">
                <!-- Populated via JS -->
              </ul>
            </div>
          </div>
        </div>

        <!-- Security Logs -->
        <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger">
          <div class="pb-3 mb-4 border-b border-[#E5E7EB] flex justify-between items-center">
            <div>
              <h2 class="text-base font-bold text-[#0A2D6A]">Security Audit Logs</h2>
              <p class="text-xs text-gray-500">Real-time tracking of role access checks and unauthorized attempts</p>
            </div>
            <button onclick="clearSecurityLogs()" class="text-xs text-[#0A2D6A] hover:underline">Clear Logs</button>
          </div>

          <div class="overflow-x-auto max-h-60">
            <table class="w-full text-left text-xs" id="securityLogsList">
              <thead class="bg-gray-50 text-[10px] uppercase text-gray-400 border-b">
                <tr>
                  <th class="py-2 px-3">Email</th>
                  <th class="py-2 px-3">Attempted Role</th>
                  <th class="py-2 px-3">Actual Role</th>
                  <th class="py-2 px-3">Time</th>
                  <th class="py-2 px-3">Result</th>
                </tr>
              </thead>
              <tbody id="securityLogsBody" class="divide-y divide-gray-100 font-mono">
                <!-- Populated via JS -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 11. REPORTS PAGE (id="page-reports") -->
      <!-- ======================================================== -->
      <div id="page-reports" class="page-content hidden space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Dept Wise Leaves -->
          <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger">
            <h3 class="text-sm font-semibold text-gray-800 mb-3">Department-wise Leave Requests</h3>
            <div id="deptWiseBars" class="space-y-2.5 text-xs">
              <!-- Dynamically updated -->
            </div>
          </div>

          <!-- Faculty Attendance Weekly -->
          <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger">
            <h3 class="text-sm font-semibold text-gray-800 mb-3">Faculty Attendance Weekly Average</h3>
            <div class="flex items-end justify-between h-36 pt-4 pb-2 border-b border-gray-100 px-4 gap-3">
              <div class="flex flex-col items-center gap-1 flex-1">
                <div class="w-full bg-[#0A2D6A] rounded-t" style="height: 88%;"></div>
                <span class="text-[10px] text-gray-500">Mon 88%</span>
              </div>
              <div class="flex flex-col items-center gap-1 flex-1">
                <div class="w-full bg-[#0A2D6A] rounded-t" style="height: 94%;"></div>
                <span class="text-[10px] text-gray-500">Tue 94%</span>
              </div>
              <div class="flex flex-col items-center gap-1 flex-1">
                <div class="w-full bg-[#0A2D6A] rounded-t" style="height: 92%;"></div>
                <span class="text-[10px] text-gray-500">Wed 92%</span>
              </div>
              <div class="flex flex-col items-center gap-1 flex-1">
                <div class="w-full bg-[#0A2D6A] rounded-t" style="height: 89%;"></div>
                <span class="text-[10px] text-gray-500">Thu 89%</span>
              </div>
              <div class="flex flex-col items-center gap-1 flex-1">
                <div class="w-full bg-[#0A2D6A] rounded-t" style="height: 97%;"></div>
                <span class="text-[10px] text-gray-500">Fri 97%</span>
              </div>
            </div>
          </div>

          <!-- Faculty Leave Types -->
          <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger">
            <h3 class="text-sm font-semibold text-gray-800 mb-3">Faculty Leave Types Distribution</h3>
            <div class="space-y-2 text-xs">
              <div>
                <div class="flex justify-between text-[11px] mb-1"><span>Medical</span><span class="font-semibold">30%</span></div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden"><div class="h-full bg-blue-600" style="width: 30%;"></div></div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] mb-1"><span>Wedding</span><span class="font-semibold">25%</span></div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden"><div class="h-full bg-emerald-600" style="width: 25%;"></div></div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] mb-1"><span>OD / Symposium</span><span class="font-semibold">20%</span></div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden"><div class="h-full bg-purple-600" style="width: 20%;"></div></div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] mb-1"><span>Personal</span><span class="font-semibold">15%</span></div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden"><div class="h-full bg-amber-500" style="width: 15%;"></div></div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] mb-1"><span>Festival</span><span class="font-semibold">10%</span></div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden"><div class="h-full bg-rose-500" style="width: 10%;"></div></div>
              </div>
            </div>
          </div>

          <!-- Turnaround Latency Comparison -->
          <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger">
            <h3 class="text-sm font-semibold text-gray-800 mb-3">Approval Turnaround Latency</h3>
            <div class="space-y-4 text-xs">
              <div>
                <div class="flex justify-between text-[11px] mb-1 text-gray-600">
                  <span>Manual Paper Work</span>
                  <span class="font-semibold text-red-600">2880 mins (2 days)</span>
                </div>
                <div class="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-red-400" style="width: 100%;"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] mb-1 text-gray-600">
                  <span>Legacy ERP</span>
                  <span class="font-semibold text-amber-600">60 mins (1 hr)</span>
                </div>
                <div class="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-amber-400" style="width: 25%;"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] mb-1 text-gray-600">
                  <span>SWCE ERP Realtime</span>
                  <span class="font-semibold text-emerald-600">1 min (Instant)</span>
                </div>
                <div class="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-500 shimmer-bar" style="width: 5%;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 12. SETTINGS PAGE (id="page-settings") -->
      <!-- ======================================================== -->
      <div id="page-settings" class="page-content hidden space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <!-- Profile & Security -->
          <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger">
            <h3 class="text-sm font-semibold text-gray-800 mb-4">Account Preferences</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Profile Photo</label>
                <input type="file" id="settingsProfilePicInput" accept="image/*" onchange="handleProfilePicChange(event)" class="text-xs text-gray-500">
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">New Password</label>
                <input type="password" id="settingsNewPass" placeholder="Enter new password" class="w-full text-xs border border-[#E5E7EB] rounded-lg px-3 py-2 outline-none">
              </div>
              <button onclick="toast('Password updated successfully')" class="bg-[#0A2D6A] text-white text-xs px-4 py-2 rounded-lg lift-on-hover font-medium">
                Update Password
              </button>
            </div>
          </div>

          <!-- Data Backup & Reset -->
          <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm card-stagger flex flex-col justify-between">
            <div>
              <h3 class="text-sm font-semibold text-gray-800 mb-2">System Data Management</h3>
              <p class="text-xs text-gray-500 mb-4">Backup local database or reset demo storage</p>
              <div class="space-y-2.5">
                <button id="exportDataBtn" onclick="exportData()" class="w-full bg-white border border-[#E5E7EB] hover:bg-gray-50 text-xs font-medium text-gray-700 py-2 rounded-lg lift-on-hover shadow-sm flex items-center justify-center gap-2">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg>
                  Export Data (swce_backup.json)
                </button>
                <button id="clearDataBtn" onclick="clearDemoData()" class="w-full bg-red-50 hover:bg-red-100 text-xs font-medium text-red-600 py-2 rounded-lg transition border border-red-200">
                  Clear Data & Reset Defaults
                </button>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-100 mt-4">
              <button id="logoutBtn" onclick="handleLogout()" class="w-full bg-[#0A2D6A] text-white text-xs font-medium py-2 rounded-lg lift-on-hover shadow-sm">
                Sign Out of SWCE ERP
              </button>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>

  <!-- ======================================================== -->
  <!-- MODALS -->
  <!-- ======================================================== -->

  <!-- 1. Tracking Modal (id="trackingModal") -->
  <div id="trackingModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-[16px] max-w-lg w-full p-6 shadow-2xl border border-[#E5E7EB] transform transition-all duration-300 scale-95 relative">
      <button onclick="closeTrackingModal()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg">&times;</button>
      
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2 bg-blue-50 text-[#0A2D6A] rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-7.5-6h10.5A2.25 2.25 0 0120.25 6v12a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V6A2.25 2.25 0 016.75 3.75z"/></svg>
        </div>
        <div>
          <h3 class="text-base font-bold text-gray-900" id="modalTrackingId">SWCE2026</h3>
          <p class="text-xs text-gray-500" id="modalStudentDetails">Arun Kumar &bull; CSE &bull; III Year</p>
        </div>
      </div>

      <!-- Stepper: Faculty -> HOD -> Principal -->
      <div class="my-6">
        <div class="flex items-center justify-between relative px-4">
          <!-- Line -->
          <div class="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0">
            <div id="modalStepLine" class="h-full bg-emerald-500 stepper-line" style="width: 0%;"></div>
          </div>

          <!-- Step 1: Faculty -->
          <div class="flex flex-col items-center z-10">
            <div id="modalStepFacCircle" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-amber-400 text-white shadow">1</div>
            <span class="text-[11px] font-medium text-gray-700 mt-1">Faculty</span>
            <span id="modalStepFacStatus" class="text-[9px] text-amber-600 font-semibold">Pending</span>
          </div>

          <!-- Step 2: HOD -->
          <div class="flex flex-col items-center z-10">
            <div id="modalStepHodCircle" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-gray-300 text-white shadow">2</div>
            <span class="text-[11px] font-medium text-gray-700 mt-1">HOD</span>
            <span id="modalStepHodStatus" class="text-[9px] text-gray-400 font-semibold">Waiting</span>
          </div>

          <!-- Step 3: Principal -->
          <div class="flex flex-col items-center z-10">
            <div id="modalStepPrinCircle" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-gray-300 text-white shadow">3</div>
            <span class="text-[11px] font-medium text-gray-700 mt-1">Principal</span>
            <span id="modalStepPrinStatus" class="text-[9px] text-gray-400 font-semibold">Waiting</span>
          </div>
        </div>
      </div>

      <!-- Leave Details & History Timeline -->
      <div class="bg-gray-50 rounded-xl p-3 border border-gray-100 text-xs space-y-2">
        <div class="flex justify-between">
          <span class="text-gray-500">Subject:</span>
          <span id="modalSubject" class="font-medium text-gray-800">Fever / Sick</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Dates:</span>
          <span id="modalDates" class="font-medium text-gray-800">2026-09-15 to 2026-09-17 (3 days)</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Overall Status:</span>
          <span id="modalOverallBadge" class="font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Pending</span>
        </div>
      </div>

      <!-- History log -->
      <div class="mt-4">
        <h4 class="text-xs font-semibold text-gray-700 mb-2">Audit History</h4>
        <div id="modalHistoryList" class="space-y-1.5 text-[11px] max-h-28 overflow-y-auto divide-y divide-gray-100">
          <!-- Rendered in JS -->
        </div>
      </div>

      <div class="mt-5 pt-3 border-t border-gray-100 flex justify-end">
        <button onclick="closeTrackingModal()" class="bg-[#0A2D6A] text-white text-xs px-4 py-2 rounded-lg">Close</button>
      </div>
    </div>
  </div>

  <!-- 2. Faculty Edit Attendance Modal (id="facultyUpdateAttendanceModal") -->
  <div id="facultyUpdateAttendanceModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-[16px] max-w-md w-full p-6 shadow-2xl border border-[#E5E7EB] relative">
      <button onclick="closeFacultyModal()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg">&times;</button>
      
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2 bg-blue-50 text-[#0A2D6A] rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/></svg>
        </div>
        <div>
          <h3 class="text-base font-bold text-gray-900">Update Student Attendance</h3>
          <p class="text-xs text-gray-500">Secure faculty metric override</p>
        </div>
      </div>

      <div class="space-y-3 text-xs">
        <div>
          <label class="block text-gray-500 mb-1">Student Name</label>
          <input type="text" id="modalStudentName" readonly class="w-full text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg p-2 text-gray-800 outline-none">
          <input type="hidden" id="modalStudentEmail">
        </div>

        <div>
          <label class="block text-gray-500 mb-1">Attendance Percentage (0-100)</label>
          <input type="number" id="editAttendancePercent" min="0" max="100" class="w-full text-xs border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0A2D6A]">
        </div>

        <div>
          <label class="block text-gray-500 mb-1">Leave Percentage (0-100)</label>
          <input type="number" id="editLeavePercent" min="0" max="100" class="w-full text-xs border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0A2D6A]">
        </div>

        <div id="attendanceUpdateBadge" class="hidden p-2 rounded bg-emerald-50 text-emerald-700 text-[11px] font-medium">
          Updated Just now
        </div>
      </div>

      <div class="mt-5 pt-3 border-t border-gray-100 flex justify-end gap-2">
        <button onclick="closeFacultyModal()" class="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs">Cancel</button>
        <button id="saveAttendanceBtn" onclick="updateStudentAttendanceSecure()" class="bg-[#0A2D6A] text-white text-xs px-4 py-1.5 rounded-lg lift-on-hover font-medium">
          Save Changes
        </button>
      </div>
    </div>
  </div>

  <!-- Toast Notification Container -->
  <div id="toastContainer" class="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none"></div>

  <!-- ======================================================== -->
  <!-- JAVASCRIPT LOGIC -->
  <!-- ======================================================== -->
  <script>
    // --- LOCAL STORAGE KEYS ---
    const K = {
      USER: 'swce_current_user',
      LEAVES: 'swce_leaves',
      FAC_LEAVES: 'swce_faculty_leaves',
      PROFILES: 'swce_student_profiles',
      ATTENDANCE: 'swce_attendance',
      NOTIFS: 'swce_notifications',
      AUDIT: 'swce_attendance_audit',
      SECURITY: 'swce_security_logs',
      FAC_WL: 'swce_faculty_whitelist',
      HOD_WL: 'swce_hod_whitelist',
      PRIN_WL: 'swce_principal_whitelist',
      PROFILE_PREFIX: 'swce_profile_'
    };

    // --- INITIAL SEED DATA ---
    function initializeDefaultStorage() {
      // 1. Whitelists
      if (!localStorage.getItem(K.FAC_WL)) {
        localStorage.setItem(K.FAC_WL, JSON.stringify(['faculty@swce.ac.in', 'ramanathan@swce.ac.in']));
      }
      if (!localStorage.getItem(K.HOD_WL)) {
        localStorage.setItem(K.HOD_WL, JSON.stringify(['hod.cse@swce.ac.in', 'hod@swce.ac.in']));
      }
      if (!localStorage.getItem(K.PRIN_WL)) {
        localStorage.setItem(K.PRIN_WL, JSON.stringify(['principal@swce.ac.in']));
      }

      // 2. Student Profiles
      if (!localStorage.getItem(K.PROFILES)) {
        const defaultProfiles = {
          'arun@gmail.com': {
            studentName: 'Arun Kumar',
            fullName: 'Arun Kumar',
            regNo: '7324CS001',
            dob: '2004-05-14',
            profilePic: '',
            attendancePercent: 85,
            leavePercent: 15,
            parentNumber: '9876543210',
            studentNumber: '9123456789',
            userMailId: 'arun@gmail.com',
            collegeMail: 'arun.cs@swce.ac.in',
            dept: 'CSE',
            year: 'III Year'
          },
          'sneha@gmail.com': {
            studentName: 'Sneha Priya',
            fullName: 'Sneha Priya',
            regNo: '7324AD012',
            dob: '2004-08-22',
            profilePic: '',
            attendancePercent: 92,
            leavePercent: 8,
            parentNumber: '9443322110',
            studentNumber: '9845123456',
            userMailId: 'sneha@gmail.com',
            collegeMail: 'sneha.ad@swce.ac.in',
            dept: 'AI&DS',
            year: 'III Year'
          },
          'karthik@gmail.com': {
            studentName: 'Karthik Raja',
            fullName: 'Karthik Raja',
            regNo: '7324EC045',
            dob: '2003-11-10',
            profilePic: '',
            attendancePercent: 78,
            leavePercent: 22,
            parentNumber: '9123987456',
            studentNumber: '9789456123',
            userMailId: 'karthik@gmail.com',
            collegeMail: 'karthik.ec@swce.ac.in',
            dept: 'ECE',
            year: 'IV Year'
          }
        };
        localStorage.setItem(K.PROFILES, JSON.stringify(defaultProfiles));
      }

      // 3. Sample Leaves
      if (!localStorage.getItem(K.LEAVES)) {
        const sampleLeaves = [
          {
            id: 1710300001,
            trackingId: 'SWCE20268421',
            studentName: 'Arun Kumar',
            fromEmail: 'arun@gmail.com',
            rollNo: '7324CS001',
            dept: 'CSE',
            year: 'III Year',
            fromDate: '2026-09-15',
            toDate: '2026-09-17',
            days: 3,
            subject: 'Fever / Sick',
            customSubject: '',
            body: 'Respected Sir, I have been suffering from acute viral fever and headache. The consulting doctor advised complete rest. Hence, I request you to grant me leave for 3 days.',
            from: 'Arun Kumar',
            to: 'The Class Advisor',
            isAllDepts: true,
            profilePhoto: '',
            signature: 'arun@gmail.com',
            currentLevel: 'Faculty',
            overallStatus: 'Pending',
            statusChain: { Faculty: 'Pending', HOD: 'Waiting', Principal: 'Waiting' },
            history: [
              { level: 'Faculty', action: 'Submitted to Faculty', timestamp: new Date().toLocaleTimeString() }
            ],
            createdAt: new Date().toISOString()
          },
          {
            id: 1710300002,
            trackingId: 'SWCE20269102',
            studentName: 'Sneha Priya',
            fromEmail: 'sneha@gmail.com',
            rollNo: '7324AD012',
            dept: 'AI&DS',
            year: 'III Year',
            fromDate: '2026-09-18',
            toDate: '2026-09-19',
            days: 2,
            subject: 'Festival Onam Function',
            customSubject: '',
            body: 'Respected Sir, On account of Onam Festival celebration at native place, I need to participate in traditional Onasadya and cultural programs with family. Request leave for 2 days.',
            from: 'Sneha Priya',
            to: 'The Class Advisor',
            isAllDepts: true,
            profilePhoto: '',
            signature: 'sneha@gmail.com',
            currentLevel: 'HOD',
            overallStatus: 'Pending',
            statusChain: { Faculty: 'Approved', HOD: 'Pending', Principal: 'Waiting' },
            history: [
              { level: 'Faculty', action: 'Submitted to Faculty', timestamp: '10:00 AM' },
              { level: 'Faculty', action: 'Faculty Approved & Forwarded', timestamp: '10:30 AM' }
            ],
            createdAt: new Date().toISOString()
          }
        ];
        localStorage.setItem(K.LEAVES, JSON.stringify(sampleLeaves));
      }

      // 4. Sample Faculty Leaves
      if (!localStorage.getItem(K.FAC_LEAVES)) {
        const facLeaves = [
          {
            id: 1710300010,
            trackingId: 'SWCE2026FAC4192',
            facultyName: 'Dr. M. Ramanathan',
            email: 'faculty@swce.ac.in',
            dept: 'CSE',
            fromDate: '2026-09-20',
            toDate: '2026-09-21',
            days: 2,
            subject: 'OD Symposium',
            customSubject: '',
            body: 'Respected HOD / Principal, I have been invited to chair a technical symposium session at IIT Madras. Request OD approval for 2 days.',
            statusChain: { HOD: 'Pending', Principal: 'Waiting' },
            currentLevel: 'HOD',
            overallStatus: 'Pending',
            history: [
              { level: 'HOD', action: 'Submitted to HOD', timestamp: new Date().toLocaleTimeString() }
            ],
            createdAt: new Date().toISOString()
          }
        ];
        localStorage.setItem(K.FAC_LEAVES, JSON.stringify(facLeaves));
      }

      // 5. Current User (default Arun Kumar - Student)
      if (!localStorage.getItem(K.USER)) {
        localStorage.setItem(K.USER, JSON.stringify({
          email: 'arun@gmail.com',
          usermail: 'arun@gmail.com',
          fullName: 'Arun Kumar',
          role: 'Student',
          dept: 'CSE',
          year: 'III Year'
        }));
      }

      // 6. Faculty Attendance records
      if (!localStorage.getItem(K.ATTENDANCE)) {
        localStorage.setItem(K.ATTENDANCE, JSON.stringify([
          { id: 1, facultyName: 'Dr. M. Ramanathan', email: 'faculty@swce.ac.in', dept: 'CSE', date: new Date().toISOString().split('T')[0], status: 'Present', location: 'Inside Campus', markedAt: new Date().toLocaleTimeString() }
        ]));
      }

      // 7. Security Logs
      if (!localStorage.getItem(K.SECURITY)) {
        localStorage.setItem(K.SECURITY, JSON.stringify([
          { id: 1, email: 'student@gmail.com', attemptedRole: 'Faculty', actualRole: 'Student', time: new Date().toLocaleTimeString(), result: 'Blocked' }
        ]));
      }
    }

    // Run initialization
    initializeDefaultStorage();

    // --- STATE MANAGEMENT ---
    let currentUser = JSON.parse(localStorage.getItem(K.USER));
    let currentPage = 'dashboard';
    let hodActiveTab = 'students';

    // Auto-detect role according to whitelists
    function getActualRole(email) {
      const facWl = JSON.parse(localStorage.getItem(K.FAC_WL) || '[]');
      const hodWl = JSON.parse(localStorage.getItem(K.HOD_WL) || '[]');
      const prinWl = JSON.parse(localStorage.getItem(K.PRIN_WL) || '[]');

      if (prinWl.includes(email)) return 'Principal';
      if (hodWl.includes(email)) return 'HOD';
      if (facWl.includes(email)) return 'Faculty';
      return 'Student';
    }

    // Role-based Layout Adjustments
    function arrangeDashboardByRole() {
      const role = currentUser.role || 'Student';
      document.getElementById('headerRoleBadge').textContent = role;

      // Nav items to show/hide
      const navStudent = ['nav-student-leave', 'nav-my-leave'];
      const navFaculty = ['nav-faculty-attendance', 'nav-faculty-leave', 'nav-faculty-approval'];
      const navHod = ['nav-hod-approval'];
      const navPrin = ['nav-principal-approval', 'nav-admin-panel'];

      // Default: hide all role-specific
      [...navStudent, ...navFaculty, ...navHod, ...navPrin].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
      });

      if (role === 'Student') {
        navStudent.forEach(id => document.getElementById(id)?.classList.remove('hidden'));
      } else if (role === 'Faculty') {
        navFaculty.forEach(id => document.getElementById(id)?.classList.remove('hidden'));
      } else if (role === 'HOD') {
        ['nav-faculty-approval', ...navHod].forEach(id => document.getElementById(id)?.classList.remove('hidden'));
      } else if (role === 'Principal') {
        [...navFaculty, ...navHod, ...navPrin].forEach(id => document.getElementById(id)?.classList.remove('hidden'));
      }

      // Populate Header info
      document.getElementById('headerUserName').textContent = currentUser.fullName || currentUser.email;
      document.getElementById('headerUserMail').textContent = currentUser.email;
      
      const photoKey = K.PROFILE_PREFIX + currentUser.email;
      const customPhoto = localStorage.getItem(photoKey);
      if (customPhoto) {
        document.getElementById('headerProfilePhoto').src = customPhoto;
        const dashPhoto = document.getElementById('dashStudentPhoto');
        if (dashPhoto) dashPhoto.src = customPhoto;
        const previewPhoto = document.getElementById('profilePicPreview');
        if (previewPhoto) previewPhoto.src = customPhoto;
      }
    }

    // Switch Page
    function showPage(pageId) {
      currentPage = pageId;

      // Hide all pages
      document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));

      // Show target page
      const target = document.getElementById('page-' + pageId);
      if (target) {
        target.classList.remove('hidden');
      }

      // Update active nav button
      document.querySelectorAll('.sidebar-menu-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.remove('bg-white', 'text-[#0A2D6A]', 'font-semibold');
        btn.classList.add('text-gray-200');
      });
      const activeNav = document.getElementById('nav-' + pageId);
      if (activeNav) {
        activeNav.classList.add('active');
        activeNav.classList.remove('text-gray-200');
      }

      // Update breadcrumb
      const pageNames = {
        'dashboard': 'Dashboard',
        'student-profile': 'Student Profile',
        'student-leave': 'Student Leave Application',
        'my-leave': 'My Status & Tracking',
        'faculty-dashboard': 'Faculty Operations Dashboard',
        'faculty-attendance': 'Faculty Attendance ERP',
        'faculty-leave': 'Faculty Leave Request',
        'faculty-approval': 'Student Leave Approval',
        'hod-approval': 'HOD Decision Panel',
        'principal-approval': 'Principal Final Approvals',
        'admin-panel': 'System Administration',
        'reports': 'Analytics & Reports',
        'settings': 'System Settings'
      };
      document.getElementById('pageBreadcrumb').textContent = pageNames[pageId] || pageId;

      // Force immediate refresh for the page
      refreshAllRealTimeData();
    }

    // Quick demo role switcher
    function switchRoleDemo(newRole) {
      const emailMap = {
        'Student': 'arun@gmail.com',
        'Faculty': 'faculty@swce.ac.in',
        'HOD': 'hod.cse@swce.ac.in',
        'Principal': 'principal@swce.ac.in'
      };
      const nameMap = {
        'Student': 'Arun Kumar',
        'Faculty': 'Dr. M. Ramanathan',
        'HOD': 'Dr. K. Vijayaraghavan',
        'Principal': 'Dr. P. Sundaramoorthy'
      };

      currentUser = {
        email: emailMap[newRole],
        usermail: emailMap[newRole],
        fullName: nameMap[newRole],
        role: newRole,
        dept: 'CSE',
        year: 'III Year'
      };
      localStorage.setItem(K.USER, JSON.stringify(currentUser));
      arrangeDashboardByRole();

      if (newRole === 'Student') showPage('dashboard');
      else if (newRole === 'Faculty') showPage('faculty-dashboard');
      else if (newRole === 'HOD') showPage('hod-approval');
      else if (newRole === 'Principal') showPage('principal-approval');

      toast('Switched view to ' + newRole + ' workspace');
    }

    // --- REALTIME REFRESH ENGINE (setInterval 1000ms) ---
    function refreshAllRealTimeData() {
      const leaves = JSON.parse(localStorage.getItem(K.LEAVES) || '[]');
      const facLeaves = JSON.parse(localStorage.getItem(K.FAC_LEAVES) || '[]');
      const profiles = JSON.parse(localStorage.getItem(K.PROFILES) || '{}');
      const attendance = JSON.parse(localStorage.getItem(K.ATTENDANCE) || '[]');
      const notifs = JSON.parse(localStorage.getItem(K.NOTIFS) || '[]');

      // 1. Pending Counts
      const facPending = leaves.filter(l => l.currentLevel === 'Faculty' && l.overallStatus === 'Pending').length;
      const hodPendingLeaves = leaves.filter(l => l.currentLevel === 'HOD' && l.overallStatus === 'Pending').length;
      const hodPendingFacLeaves = facLeaves.filter(l => l.currentLevel === 'HOD' && l.overallStatus === 'Pending').length;
      const hodTotalPending = hodPendingLeaves + hodPendingFacLeaves;
      const prinPending = leaves.filter(l => l.currentLevel === 'Principal' && l.overallStatus === 'Pending').length +
                          facLeaves.filter(l => l.currentLevel === 'Principal' && l.overallStatus === 'Pending').length;

      // Update badges in Sidebar
      const bFac = document.getElementById('navBadgeFacultyApproval');
      if (bFac) {
        bFac.textContent = facPending;
        bFac.classList.toggle('hidden', facPending === 0);
      }
      const bHod = document.getElementById('navBadgeHodApproval');
      if (bHod) {
        bHod.textContent = hodTotalPending;
        bHod.classList.toggle('hidden', hodTotalPending === 0);
      }
      const bPrin = document.getElementById('navBadgePrincipalApproval');
      if (bPrin) {
        bPrin.textContent = prinPending;
        bPrin.classList.toggle('hidden', prinPending === 0);
      }

      // Bell badge in Header
      let totalRelevantAlerts = 0;
      if (currentUser.role === 'Student') {
        totalRelevantAlerts = notifs.filter(n => n.target === currentUser.email && !n.read).length;
      } else if (currentUser.role === 'Faculty') {
        totalRelevantAlerts = facPending;
      } else if (currentUser.role === 'HOD') {
        totalRelevantAlerts = hodTotalPending;
      } else if (currentUser.role === 'Principal') {
        totalRelevantAlerts = prinPending;
      }
      const bellEl = document.getElementById('headerBellBadge');
      if (bellEl) bellEl.textContent = totalRelevantAlerts;

      // Header Notification Sub-bar Just Now updates
      const notifBar = document.getElementById('roleNotifContent');
      if (currentUser.role === 'Student') {
        const myLast = leaves.filter(l => l.fromEmail === currentUser.email).pop();
        if (myLast) {
          notifBar.textContent = 'Application ' + myLast.trackingId + ' status: ' + myLast.overallStatus + ' (Level: ' + myLast.currentLevel + ')';
        } else {
          notifBar.textContent = 'Ready to submit student leave letters.';
        }
      } else if (currentUser.role === 'Faculty') {
        notifBar.textContent = facPending > 0 ? facPending + ' student leave request(s) awaiting your faculty approval.' : 'All student leave reviews up to date.';
      } else if (currentUser.role === 'HOD') {
        notifBar.textContent = hodTotalPending > 0 ? hodTotalPending + ' pending departmental requests require HOD endorsement.' : 'No pending HOD actions.';
      } else if (currentUser.role === 'Principal') {
        notifBar.textContent = prinPending > 0 ? prinPending + ' requests awaiting final institutional approval.' : 'All approvals cleared.';
      }

      // 2. Student Dashboard Stats Update
      if (currentPage === 'dashboard') {
        const myLeaves = leaves.filter(l => l.fromEmail === currentUser.email);
        const myTotal = myLeaves.length;
        const myPending = myLeaves.filter(l => l.overallStatus === 'Pending').length;
        const myApproved = myLeaves.filter(l => l.overallStatus === 'Approved').length;

        document.getElementById('dashTotalLeavesCount').textContent = myTotal;
        document.getElementById('dashPendingLeavesCount').textContent = myPending;
        document.getElementById('dashApprovedLeavesCount').textContent = myApproved;

        // Current profile stats
        const p = profiles[currentUser.email] || {};
        const att = p.attendancePercent || 85;
        const leaveP = p.leavePercent || 15;

        document.getElementById('dashAttendancePercent').textContent = att + '%';
        document.getElementById('dashAttendanceBar').style.width = att + '%';
        document.getElementById('dashLeavePercent').textContent = leaveP + '%';
        document.getElementById('dashLeaveBar').style.width = leaveP + '%';

        // Student Info
        document.getElementById('dashStudentName').textContent = p.fullName || currentUser.fullName || 'Student';
        document.getElementById('dashStudentReg').textContent = 'Reg: ' + (p.regNo || '7324CS001');
        document.getElementById('dashStudentDept').textContent = 'Dept: ' + (p.dept || 'CSE') + ' | Year: ' + (p.year || 'III Year');
        document.getElementById('dashStudentEmail').textContent = 'Email: ' + (p.userMailId || currentUser.email);
        document.getElementById('dashStudentPhone').textContent = 'Student No: ' + (p.studentNumber || '9123456789');
      }

      // 3. Student Profile Page Real-time Update
      if (currentPage === 'student-profile') {
        const p = profiles[currentUser.email] || {};
        const att = p.attendancePercent || 85;
        const leaveP = p.leavePercent || 15;

        document.getElementById('profileAttText').textContent = att + '%';
        document.getElementById('profileAttBar').style.width = att + '%';
        document.getElementById('profileLeaveText').textContent = leaveP + '%';
        document.getElementById('profileLeaveBar').style.width = leaveP + '%';
        document.getElementById('attendancePercent').value = att;
        document.getElementById('leavePercent').value = leaveP;
      }

      // 4. My Status Page
      if (currentPage === 'my-leave') {
        renderMyLeavesList(leaves);
      }

      // 5. Faculty Dashboard & Student List Table
      if (currentPage === 'faculty-dashboard') {
        document.getElementById('facTotalStudents').textContent = Object.keys(profiles).length;
        const todayStr = new Date().toISOString().split('T')[0];
        const presentCount = attendance.filter(a => a.date === todayStr && a.status === 'Present').length;
        document.getElementById('facPresentToday').textContent = presentCount || 1;
        document.getElementById('facPendingLeavesCount').textContent = facPending;

        renderStudentListTable(profiles);
        renderFacultyAttendanceTable(attendance);
      }

      // 6. Student Approval (Faculty) Page
      if (currentPage === 'faculty-approval') {
        document.getElementById('facultyBellCount').textContent = facPending + ' Pending';
        renderFacultyApprovalTable(leaves);
      }

      // 7. HOD Panel
      if (currentPage === 'hod-approval') {
        document.getElementById('hodBellCount').textContent = hodTotalPending + ' Awaiting HOD';
        renderHodTables(leaves, facLeaves);
      }

      // 8. Principal Approval Page
      if (currentPage === 'principal-approval') {
        document.getElementById('principalBellCount').textContent = prinPending + ' Ready for Decision';
        renderPrincipalApprovalTable(leaves, facLeaves);
      }

      // 9. Admin Panel Whitelists & Security Logs
      if (currentPage === 'admin-panel') {
        renderAdminWhitelists();
        renderSecurityLogs();
      }

      // 10. Reports Page
      if (currentPage === 'reports') {
        renderDeptReports(leaves);
      }
    }

    // --- RENDER TABLES & COMPONENTS ---

    // 1. Render Student List Table in Faculty Dashboard
    function renderStudentListTable(profiles) {
      const tbody = document.getElementById('studentListBody');
      if (!tbody) return;

      const filterText = (document.getElementById('studentSearchInput')?.value || '').toLowerCase();

      const profileList = Object.values(profiles).filter(p => {
        return (p.fullName || p.studentName || '').toLowerCase().includes(filterText) ||
               (p.regNo || '').toLowerCase().includes(filterText);
      });

      if (profileList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="py-4 text-center text-gray-400">No matching student records found.</td></tr>';
        return;
      }

      tbody.innerHTML = profileList.map(p => {
        const photo = p.profilePic || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(p.fullName || 'Student') + '&background=0A2D6A&color=fff';
        const email = p.userMailId;
        const att = p.attendancePercent || 85;
        const leave = p.leavePercent || 15;

        return \`
          <tr class="hover:bg-gray-50 transition border-b border-gray-100">
            <td class="py-2.5 px-3">
              <img src="\${photo}" class="w-8 h-8 rounded-full border border-gray-200 object-cover" onerror="this.src='https://ui-avatars.com/api/?name=Student';" />
            </td>
            <td class="py-2.5 px-3 font-medium text-gray-900">\${p.fullName || p.studentName}</td>
            <td class="py-2.5 px-3">
              <div class="flex items-center gap-2">
                <div class="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-[#0A2D6A]" style="width: \${att}%"></div>
                </div>
                <span class="font-semibold text-gray-700">\${att}%</span>
              </div>
            </td>
            <td class="py-2.5 px-3">
              <div class="flex items-center gap-2">
                <div class="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-500" style="width: \${leave}%"></div>
                </div>
                <span class="font-semibold text-emerald-600">\${leave}%</span>
              </div>
            </td>
            <td class="py-2.5 px-3 text-right">
              <button id="editAttendanceBtn-\${email}" onclick="openFacultyModal('\${email}', '\${p.fullName || p.studentName}', \${att}, \${leave})" class="text-xs text-[#0A2D6A] border border-[#0A2D6A] hover:bg-[#0A2D6A] hover:text-white px-2.5 py-1 rounded-[6px] transition font-medium">
                Edit
              </button>
            </td>
          </tr>
        \`;
      }).join('');
    }

    function filterStudentTable() {
      const profiles = JSON.parse(localStorage.getItem(K.PROFILES) || '{}');
      renderStudentListTable(profiles);
    }

    // 2. Render Faculty Attendance Records Table
    function renderFacultyAttendanceTable(attendance) {
      const tbody = document.getElementById('facultyAttendanceBody');
      if (!tbody) return;

      tbody.innerHTML = attendance.slice(-5).reverse().map(a => \`
        <tr class="border-b border-gray-50">
          <td class="py-1 text-gray-600">\${a.date}</td>
          <td class="py-1 font-medium \${a.status === 'Present' ? 'text-emerald-600' : 'text-amber-600'}">\${a.status}</td>
          <td class="py-1 text-gray-500">\${a.location}</td>
        </tr>
      \`).join('');
    }

    // 3. Render My Leaves (Student Status)
    function renderMyLeavesList(leaves) {
      const container = document.getElementById('myLeaveList');
      if (!container) return;

      const myLeaves = leaves.filter(l => l.fromEmail === currentUser.email);
      document.getElementById('myLeaveCountBadge').textContent = myLeaves.length + ' requests';

      if (myLeaves.length === 0) {
        container.innerHTML = '<div class="bg-white rounded-[16px] border border-[#E5E7EB] p-8 text-center text-gray-400 text-xs">No leave applications recorded yet. Click "Apply Leave" to submit.</div>';
        return;
      }

      container.innerHTML = myLeaves.map(l => {
        // Step status colors
        const facStatus = l.statusChain?.Faculty || 'Waiting';
        const hodStatus = l.statusChain?.HOD || 'Waiting';
        const prinStatus = l.statusChain?.Principal || 'Waiting';

        let facBg = 'bg-amber-400 text-white';
        if (facStatus === 'Approved') facBg = 'bg-emerald-500 text-white';
        else if (facStatus === 'Waiting') facBg = 'bg-gray-300 text-gray-600';

        let hodBg = 'bg-gray-300 text-gray-600';
        if (hodStatus === 'Pending') hodBg = 'bg-amber-400 text-white';
        else if (hodStatus === 'Approved') hodBg = 'bg-emerald-500 text-white';

        let prinBg = 'bg-gray-300 text-gray-600';
        if (prinStatus === 'Pending') prinBg = 'bg-amber-400 text-white';
        else if (prinStatus === 'Approved') prinBg = 'bg-emerald-500 text-white';

        let overallBadge = '<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">Pending</span>';
        if (l.overallStatus === 'Approved') {
          overallBadge = '<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">Fully Approved</span>';
        }

        return \`
          <div class="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm lift-on-hover card-stagger">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-gray-100">
              <div class="flex items-center gap-3">
                <span class="font-mono text-xs font-bold text-[#0A2D6A] bg-blue-50 px-2 py-0.5 rounded">\${l.trackingId}</span>
                <span class="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">\${l.dept}</span>
                <h3 class="text-sm font-semibold text-gray-900">\${l.subject}</h3>
              </div>
              <div class="flex items-center gap-3">
                \${overallBadge}
                <button onclick="openTrackingModal('\${l.trackingId}')" class="text-xs text-[#0A2D6A] font-medium hover:underline">Track Full &rarr;</button>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 text-xs text-gray-600">
              <div><b>Dates:</b> \${l.fromDate} to \${l.toDate} (\${l.days} days)</div>
              <div><b>Current Stage:</b> \${l.currentLevel} Level</div>
            </div>

            <!-- Stepper visual -->
            <div class="flex items-center justify-between pt-2 px-2">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold \${facBg}">1</div>
                <div class="text-[11px] leading-tight">
                  <div class="font-medium text-gray-700">Faculty</div>
                  <div class="text-[9px] text-gray-400">\${facStatus}</div>
                </div>
              </div>

              <div class="h-0.5 flex-1 bg-gray-200 mx-3"></div>

              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold \${hodBg}">2</div>
                <div class="text-[11px] leading-tight">
                  <div class="font-medium text-gray-700">HOD</div>
                  <div class="text-[9px] text-gray-400">\${hodStatus}</div>
                </div>
              </div>

              <div class="h-0.5 flex-1 bg-gray-200 mx-3"></div>

              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold \${prinBg}">3</div>
                <div class="text-[11px] leading-tight">
                  <div class="font-medium text-gray-700">Principal</div>
                  <div class="text-[9px] text-gray-400">\${prinStatus}</div>
                </div>
              </div>
            </div>
          </div>
        \`;
      }).join('');
    }

    // 4. Render Faculty Student Approval Table
    function renderFacultyApprovalTable(leaves) {
      const tbody = document.getElementById('facultyApprovalBody');
      if (!tbody) return;

      const pendingFac = leaves.filter(l => l.currentLevel === 'Faculty' && l.overallStatus === 'Pending');

      if (pendingFac.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="py-4 text-center text-gray-400">No student leave applications waiting for faculty approval.</td></tr>';
        return;
      }

      tbody.innerHTML = pendingFac.map(l => {
        const photo = l.profilePhoto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(l.studentName) + '&background=0A2D6A&color=fff';
        const isApproved = l.statusChain?.Faculty === 'Approved';

        return \`
          <tr class="hover:bg-gray-50 transition border-b border-gray-100">
            <td class="py-2.5 px-3">
              <img src="\${photo}" class="w-8 h-8 rounded-full border border-gray-200 object-cover" />
            </td>
            <td class="py-2.5 px-3 font-mono text-xs font-semibold text-[#0A2D6A]">\${l.trackingId}</td>
            <td class="py-2.5 px-3 font-medium text-gray-900">\${l.studentName}</td>
            <td class="py-2.5 px-3 text-gray-500">\${l.dept}</td>
            <td class="py-2.5 px-3 text-gray-700 max-w-[140px] truncate">\${l.subject}</td>
            <td class="py-2.5 px-3 text-gray-500 text-[11px]">\${l.fromDate} to \${l.toDate}</td>
            <td class="py-2.5 px-3">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700">
                \${l.statusChain?.Faculty || 'Pending'}
              </span>
            </td>
            <td class="py-2.5 px-3 text-right">
              <div class="inline-flex items-center gap-1.5">
                <button id="approveBtn-\${l.trackingId}" onclick="facultyApproveLeave('\${l.trackingId}')" class="\${isApproved ? 'hidden' : ''} bg-[#D1FAE5] text-[#065F46] border border-green-300 hover:bg-green-200 text-xs px-2.5 py-1 rounded-[6px] font-semibold transition">
                  Approve
                </button>
                <button id="forwardBtn-\${l.trackingId}" onclick="facultyForwardLeave('\${l.trackingId}')" class="\${isApproved ? '' : 'hidden'} bg-[#DBEAFE] text-[#0A2D6A] hover:bg-blue-200 text-xs px-2.5 py-1 rounded-[6px] font-semibold transition">
                  Forward to HOD
                </button>
              </div>
            </td>
          </tr>
        \`;
      }).join('');
    }

    // 5. Render HOD Tables (Student Leaves & Faculty Leaves)
    function switchHodTab(tab) {
      hodActiveTab = tab;
      const bStud = document.getElementById('hodTabStudents');
      const bFac = document.getElementById('hodTabFaculty');
      const vStud = document.getElementById('hodStudentLeavesView');
      const vFac = document.getElementById('hodFacultyLeavesView');

      if (tab === 'students') {
        bStud.className = 'flex-1 text-xs py-1.5 px-3 rounded-lg font-medium transition bg-[#0A2D6A] text-white';
        bFac.className = 'flex-1 text-xs py-1.5 px-3 rounded-lg font-medium transition text-gray-600 hover:text-[#0A2D6A]';
        vStud.classList.remove('hidden');
        vFac.classList.add('hidden');
      } else {
        bFac.className = 'flex-1 text-xs py-1.5 px-3 rounded-lg font-medium transition bg-[#0A2D6A] text-white';
        bStud.className = 'flex-1 text-xs py-1.5 px-3 rounded-lg font-medium transition text-gray-600 hover:text-[#0A2D6A]';
        vFac.classList.remove('hidden');
        vStud.classList.add('hidden');
      }
    }

    function renderHodTables(leaves, facLeaves) {
      // Tab 1: Student leaves
      const tbodyStud = document.getElementById('hodStudentLeavesBody');
      if (tbodyStud) {
        const hodStudPending = leaves.filter(l => l.currentLevel === 'HOD' && l.overallStatus === 'Pending');
        if (hodStudPending.length === 0) {
          tbodyStud.innerHTML = '<tr><td colspan="7" class="py-4 text-center text-gray-400">No student leaves awaiting HOD review.</td></tr>';
        } else {
          tbodyStud.innerHTML = hodStudPending.map(l => {
            const isApproved = l.statusChain?.HOD === 'Approved';
            return \`
              <tr class="hover:bg-gray-50 transition border-b border-gray-100">
                <td class="py-2.5 px-3 font-mono text-xs font-semibold text-[#0A2D6A]">\${l.trackingId}</td>
                <td class="py-2.5 px-3 font-medium text-gray-900">\${l.studentName}</td>
                <td class="py-2.5 px-3 text-gray-500">\${l.dept}</td>
                <td class="py-2.5 px-3 text-gray-700 max-w-[130px] truncate">\${l.subject}</td>
                <td class="py-2.5 px-3 text-gray-500 text-[11px]">\${l.fromDate} to \${l.toDate}</td>
                <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700">Awaiting HOD</span></td>
                <td class="py-2.5 px-3 text-right">
                  <div class="inline-flex items-center gap-1.5">
                    <button id="hodApproveStudent-\${l.trackingId}" onclick="hodApproveStudent('\${l.trackingId}')" class="\${isApproved ? 'hidden' : ''} bg-[#D1FAE5] text-[#065F46] border border-green-300 hover:bg-green-200 text-xs px-2.5 py-1 rounded-[6px] font-semibold transition">
                      Approve
                    </button>
                    <button id="hodForwardStudent-\${l.trackingId}" onclick="hodForwardStudent('\${l.trackingId}')" class="\${isApproved ? '' : 'hidden'} bg-[#DBEAFE] text-[#0A2D6A] hover:bg-blue-200 text-xs px-2.5 py-1 rounded-[6px] font-semibold transition">
                      Forward to Principal
                    </button>
                  </div>
                </td>
              </tr>
            \`;
          }).join('');
        }
      }

      // Tab 2: Faculty leaves
      const tbodyFac = document.getElementById('hodFacultyLeavesBody');
      if (tbodyFac) {
        const hodFacPending = facLeaves.filter(l => l.currentLevel === 'HOD' && l.overallStatus === 'Pending');
        if (hodFacPending.length === 0) {
          tbodyFac.innerHTML = '<tr><td colspan="7" class="py-4 text-center text-gray-400">No faculty leaves awaiting HOD review.</td></tr>';
        } else {
          tbodyFac.innerHTML = hodFacPending.map(l => {
            const isApproved = l.statusChain?.HOD === 'Approved';
            return \`
              <tr class="hover:bg-gray-50 transition border-b border-gray-100">
                <td class="py-2.5 px-3 font-mono text-xs font-semibold text-[#0A2D6A]">\${l.trackingId}</td>
                <td class="py-2.5 px-3 font-medium text-gray-900">\${l.facultyName}</td>
                <td class="py-2.5 px-3 text-gray-500">\${l.dept}</td>
                <td class="py-2.5 px-3 text-gray-700">\${l.subject}</td>
                <td class="py-2.5 px-3 text-gray-500 text-[11px]">\${l.fromDate} to \${l.toDate}</td>
                <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-100 text-purple-700">Faculty Quota</span></td>
                <td class="py-2.5 px-3 text-right">
                  <div class="inline-flex items-center gap-1.5">
                    <button onclick="hodApproveFacultyLeave('\${l.trackingId}')" class="\${isApproved ? 'hidden' : ''} bg-[#D1FAE5] text-[#065F46] border border-green-300 hover:bg-green-200 text-xs px-2.5 py-1 rounded-[6px] font-semibold transition">
                      Approve
                    </button>
                    <button onclick="hodForwardFacultyLeave('\${l.trackingId}')" class="\${isApproved ? '' : 'hidden'} bg-[#DBEAFE] text-[#0A2D6A] hover:bg-blue-200 text-xs px-2.5 py-1 rounded-[6px] font-semibold transition">
                      Forward to Principal
                    </button>
                  </div>
                </td>
              </tr>
            \`;
          }).join('');
        }
      }
    }

    // 6. Render Principal Approval Table (All Departments Combined)
    function renderPrincipalApprovalTable(leaves, facLeaves) {
      const tbody = document.getElementById('principalApprovalBody');
      if (!tbody) return;

      const pStud = leaves.filter(l => l.currentLevel === 'Principal' && l.overallStatus === 'Pending')
                          .map(l => ({ ...l, typeBadge: 'Student', applicantName: l.studentName }));
      const pFac = facLeaves.filter(l => l.currentLevel === 'Principal' && l.overallStatus === 'Pending')
                            .map(l => ({ ...l, typeBadge: 'Faculty', applicantName: l.facultyName }));

      const allPrincipalPending = [...pStud, ...pFac];

      if (allPrincipalPending.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="py-4 text-center text-gray-400">All student and faculty requests have been cleared.</td></tr>';
        return;
      }

      tbody.innerHTML = allPrincipalPending.map(l => {
        const typeStyle = l.typeBadge === 'Student' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700';

        return \`
          <tr class="hover:bg-gray-50 transition border-b border-gray-100">
            <td class="py-2.5 px-3 font-mono text-xs font-semibold text-[#0A2D6A]">\${l.trackingId}</td>
            <td class="py-2.5 px-3 font-medium text-gray-900">\${l.applicantName}</td>
            <td class="py-2.5 px-3 text-gray-500">\${l.dept}</td>
            <td class="py-2.5 px-3 text-gray-500 text-[11px]">\${l.fromDate} to \${l.toDate}</td>
            <td class="py-2.5 px-3">
              <span class="px-2 py-0.5 rounded text-[10px] font-semibold \${typeStyle}">\${l.typeBadge}</span>
            </td>
            <td class="py-2.5 px-3">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700">Awaiting Final</span>
            </td>
            <td class="py-2.5 px-3 text-right">
              <button id="principalApproveBtn-\${l.trackingId}" onclick="principalFinalApprove('\${l.trackingId}', '\${l.typeBadge}')" class="bg-[#0A2D6A] text-white text-xs px-3 py-1 rounded-[6px] font-semibold lift-on-hover transition">
                Final Approve
              </button>
            </td>
          </tr>
        \`;
      }).join('');
    }

    // 7. Render Admin Whitelists & Security Logs
    function renderAdminWhitelists() {
      const facWl = JSON.parse(localStorage.getItem(K.FAC_WL) || '[]');
      const hodWl = JSON.parse(localStorage.getItem(K.HOD_WL) || '[]');
      const prinWl = JSON.parse(localStorage.getItem(K.PRIN_WL) || '[]');

      document.getElementById('facultyWhitelistList').innerHTML = facWl.map(email => \`
        <li class="flex justify-between items-center py-1 px-2 bg-white rounded border border-gray-200">
          <span class="truncate font-mono">\${email}</span>
          <button id="removeFaculty-\${email}" onclick="removeWhitelist('faculty', '\${email}')" class="text-red-500 hover:text-red-700 font-bold ml-2">&times;</button>
        </li>
      \`).join('');

      document.getElementById('hodWhitelistList').innerHTML = hodWl.map(email => \`
        <li class="flex justify-between items-center py-1 px-2 bg-white rounded border border-gray-200">
          <span class="truncate font-mono">\${email}</span>
          <button onclick="removeWhitelist('hod', '\${email}')" class="text-red-500 hover:text-red-700 font-bold ml-2">&times;</button>
        </li>
      \`).join('');

      document.getElementById('principalWhitelistList').innerHTML = prinWl.map(email => \`
        <li class="flex justify-between items-center py-1 px-2 bg-white rounded border border-gray-200">
          <span class="truncate font-mono">\${email}</span>
          <button onclick="removeWhitelist('principal', '\${email}')" class="text-red-500 hover:text-red-700 font-bold ml-2">&times;</button>
        </li>
      \`).join('');
    }

    function renderSecurityLogs() {
      const logs = JSON.parse(localStorage.getItem(K.SECURITY) || '[]');
      const tbody = document.getElementById('securityLogsBody');
      if (!tbody) return;

      tbody.innerHTML = logs.slice(-10).reverse().map(log => \`
        <tr class="border-b border-gray-100">
          <td class="py-1.5 px-3 text-gray-700">\${log.email}</td>
          <td class="py-1.5 px-3 text-gray-500">\${log.attemptedRole}</td>
          <td class="py-1.5 px-3 text-gray-500">\${log.actualRole}</td>
          <td class="py-1.5 px-3 text-gray-400">\${log.time}</td>
          <td class="py-1.5 px-3 \${log.result === 'Blocked' ? 'text-red-600' : 'text-emerald-600'} font-semibold">\${log.result}</td>
        </tr>
      \`).join('');
    }

    // 8. Render Reports Charts
    function renderDeptReports(leaves) {
      const container = document.getElementById('deptWiseBars');
      if (!container) return;

      const depts = ['AI&DS', 'AI&ML', 'CSE', 'CYBER SECURITY', 'EEE', 'MECH', 'CIVIL', 'ECE'];
      const counts = {};
      depts.forEach(d => counts[d] = 0);
      leaves.forEach(l => {
        if (counts[l.dept] !== undefined) counts[l.dept]++;
      });

      const maxCount = Math.max(...Object.values(counts), 1);

      container.innerHTML = depts.map(dept => {
        const c = counts[dept] || 0;
        const pct = Math.max((c / maxCount) * 100, 6);
        return \`
          <div>
            <div class="flex justify-between text-[11px] mb-1">
              <span class="font-medium text-gray-700">\${dept}</span>
              <span class="text-gray-500">\${c} leaves</span>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-[#0A2D6A] rounded-full" style="width: \${pct}%;"></div>
            </div>
          </div>
        \`;
      }).join('');
    }

    // --- ACTIONS & SUBMISSIONS ---

    // 1. Save Profile Form
    function handleProfileSave(event) {
      event.preventDefault();
      const profiles = JSON.parse(localStorage.getItem(K.PROFILES) || '{}');
      const email = currentUser.email;

      const name = document.getElementById('profileName').value.trim();
      const reg = document.getElementById('regNo').value.trim();
      const dobVal = document.getElementById('dob').value;
      const parentNum = document.getElementById('parentNumber').value.trim();
      const studentNum = document.getElementById('studentNumber').value.trim();

      // Validate age > 16
      if (dobVal) {
        const birthDate = new Date(dobVal);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age < 16) {
          alert('Age must be at least 16 years.');
          return;
        }
      }

      profiles[email] = {
        ...profiles[email],
        studentName: name,
        fullName: name,
        regNo: reg,
        dob: dobVal,
        parentNumber: parentNum,
        studentNumber: studentNum,
        userMailId: email
      };

      currentUser.fullName = name;
      localStorage.setItem(K.USER, JSON.stringify(currentUser));
      localStorage.setItem(K.PROFILES, JSON.stringify(profiles));

      document.getElementById('lastUpdatedInfo').textContent = 'Updated Just now (' + new Date().toLocaleTimeString() + ')';
      toast('Profile saved successfully');
      refreshAllRealTimeData();
    }

    // Profile photo upload
    function handleProfilePicChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds Max 2MB limit.');
        return;
      }

      const reader = new FileReader();
      reader.onload = function(e) {
        const base64 = e.target.result;
        const key = K.PROFILE_PREFIX + currentUser.email;
        localStorage.setItem(key, base64);

        const profiles = JSON.parse(localStorage.getItem(K.PROFILES) || '{}');
        if (profiles[currentUser.email]) {
          profiles[currentUser.email].profilePic = base64;
          localStorage.setItem(K.PROFILES, JSON.stringify(profiles));
        }

        document.getElementById('headerProfilePhoto').src = base64;
        const dashPhoto = document.getElementById('dashStudentPhoto');
        if (dashPhoto) dashPhoto.src = base64;
        const prev = document.getElementById('profilePicPreview');
        if (prev) prev.src = base64;

        toast('Profile photo updated');
      };
      reader.readAsDataURL(file);
    }

    // 2. Submit Student Leave Application
    function calculateDays() {
      const f = document.getElementById('fromDate').value;
      const t = document.getElementById('toDate').value;
      if (f && t) {
        const diff = Math.ceil((new Date(t) - new Date(f)) / 86400000) + 1;
        document.getElementById('noDays').value = diff > 0 ? diff : 1;
      }
    }

    function onSubjectChange() {
      const sub = document.getElementById('leaveSubject').value;
      const customBox = document.getElementById('customSubjectBox');
      if (sub === 'Custom') {
        customBox.classList.remove('hidden');
      } else {
        customBox.classList.add('hidden');
      }
    }

    function generateBody() {
      const name = document.getElementById('fromName').value || 'Student';
      const dept = document.getElementById('leaveDept').value;
      const year = document.getElementById('leaveYear').value;
      const subject = document.getElementById('leaveSubject').value;
      const fromD = document.getElementById('fromDate').value || 'upcoming date';
      const toD = document.getElementById('toDate').value || 'upcoming date';
      const days = document.getElementById('noDays').value || 1;

      let text = '';
      if (subject === 'Fever / Sick') {
        text = 'Respected Sir/Madam,\\n\\nI am ' + name + ', studying in ' + dept + ' (' + year + '). I have been suffering from high fever and severe bodily fatigue since yesterday. As per medical counsel, I am advised complete physical rest and medication from ' + fromD + ' to ' + toD + ' (' + days + ' day(s)). Hence, I kindly request you to grant me leave for the aforementioned period.\\n\\nThanking you,\\nYours obediently,\\n' + name;
      } else if (subject.includes('Onam')) {
        text = 'Respected Sir/Madam,\\n\\nOn account of the auspicious Onam Festival celebration at my native hometown, I need to be present with my family to participate in the traditional Onam cultural celebrations and Onasadya from ' + fromD + ' to ' + toD + ' (' + days + ' day(s)). Kindly grant me leave for these days.\\n\\nThanking you,\\nYours obediently,\\n' + name;
      } else if (subject.includes('Pongal')) {
        text = 'Respected Sir/Madam,\\n\\nOn account of the traditional Pongal harvest festival in Tamil Nadu, our family is convening at our ancestral village for customary rituals and family gatherings from ' + fromD + ' to ' + toD + ' (' + days + ' day(s)). I earnestly request permission to take leave for the mentioned duration.\\n\\nThanking you,\\nYours obediently,\\n' + name;
      } else if (subject.includes('Wedding')) {
        text = 'Respected Sir/Madam,\\n\\nMy close family member is getting married between ' + fromD + ' and ' + toD + '. As my presence is mandatory for the ceremonies, I request you to grant me leave for ' + days + ' day(s).\\n\\nThanking you,\\nYours obediently,\\n' + name;
      } else if (subject.includes('Symposium') || subject.includes('Sports')) {
        text = 'Respected Sir/Madam,\\n\\nI have been shortlisted to represent our college in the collegiate ' + subject + ' event scheduled from ' + fromD + ' to ' + toD + '. I request you to grant me On-Duty (OD) attendance for ' + days + ' day(s).\\n\\nThanking you,\\nYours obediently,\\n' + name;
      } else {
        text = 'Respected Sir/Madam,\\n\\nDue to unavoidable personal and urgent commitments from ' + fromD + ' to ' + toD + ', I am unable to attend regular lectures for ' + days + ' day(s). I request you to grant me permission and leave.\\n\\nThanking you,\\nYours obediently,\\n' + name;
      }

      // Typewriter effect
      const textarea = document.getElementById('leaveBody');
      textarea.value = '';
      let i = 0;
      const clean = text.replace(/\\\\n/g, '\\n');
      const timer = setInterval(() => {
        textarea.value += clean[i];
        i++;
        if (i >= clean.length) clearInterval(timer);
      }, 8);
    }

    function handleLeaveSubmit(event) {
      event.preventDefault();
      const trackingId = 'SWCE' + new Date().getFullYear() + Math.floor(1000 + Math.random() * 9000);
      const name = document.getElementById('fromName').value.trim();
      const dept = document.getElementById('leaveDept').value;
      const year = document.getElementById('leaveYear').value;
      const roll = document.getElementById('rollNo').value.trim();
      const sub = document.getElementById('leaveSubject').value;
      const customSub = document.getElementById('customSubject')?.value.trim() || '';
      const fDate = document.getElementById('fromDate').value;
      const tDate = document.getElementById('toDate').value;
      const days = document.getElementById('noDays').value;
      const body = document.getElementById('leaveBody').value.trim();

      const newLeave = {
        id: Date.now(),
        trackingId,
        studentName: name,
        fromEmail: currentUser.email,
        rollNo: roll,
        dept,
        year,
        fromDate: fDate,
        toDate: tDate,
        days: Number(days),
        subject: sub === 'Custom' ? customSub : sub,
        customSubject: customSub,
        body,
        from: name,
        to: document.getElementById('toDesignation').value,
        isAllDepts: true,
        profilePhoto: localStorage.getItem(K.PROFILE_PREFIX + currentUser.email) || '',
        signature: currentUser.email,
        currentLevel: 'Faculty',
        overallStatus: 'Pending',
        statusChain: { Faculty: 'Pending', HOD: 'Waiting', Principal: 'Waiting' },
        history: [
          { level: 'Faculty', action: 'Submitted to Faculty', timestamp: new Date().toLocaleTimeString() }
        ],
        createdAt: new Date().toISOString()
      };

      const leaves = JSON.parse(localStorage.getItem(K.LEAVES) || '[]');
      leaves.push(newLeave);
      localStorage.setItem(K.LEAVES, JSON.stringify(leaves));

      // Push notification
      const notifs = JSON.parse(localStorage.getItem(K.NOTIFS) || '[]');
      notifs.push({
        id: Date.now(),
        type: 'Leave Submitted',
        message: 'New leave application from ' + name + ' (' + trackingId + ')',
        trackingId,
        time: new Date().toLocaleTimeString(),
        read: false,
        target: 'faculty@swce.ac.in'
      });
      localStorage.setItem(K.NOTIFS, JSON.stringify(notifs));

      toast('Leave submitted! Tracking ID: ' + trackingId);
      showPage('my-leave');
    }

    // 3. Submit Faculty Leave
    function calculateFacDays() {
      const f = document.getElementById('facFromDate').value;
      const t = document.getElementById('facToDate').value;
      if (f && t) {
        const diff = Math.ceil((new Date(t) - new Date(f)) / 86400000) + 1;
        document.getElementById('facNoDays').value = diff > 0 ? diff : 1;
      }
    }

    function generateFacultyBody() {
      const fDate = document.getElementById('facFromDate').value || 'start date';
      const tDate = document.getElementById('facToDate').value || 'end date';
      const sub = document.getElementById('facLeaveSubject').value;
      const days = document.getElementById('facNoDays').value || 1;
      document.getElementById('facLeaveBody').value = 'Respected HOD / Principal,\\n\\nI am submitting this formal request for ' + sub + ' from ' + fDate + ' to ' + tDate + ' (' + days + ' day(s)). My departmental academic lecture responsibilities have been cross-delegated to a colleague. I request your kind approval.\\n\\nWith regards,\\n' + document.getElementById('facultyFromName').value;
    }

    function handleFacultyLeaveSubmit(event) {
      event.preventDefault();
      const trackingId = 'SWCE' + new Date().getFullYear() + 'FAC' + Math.floor(1000 + Math.random() * 9000);
      const name = document.getElementById('facultyFromName').value.trim();
      const dept = document.getElementById('facLeaveDept').value.trim();

      const newFacLeave = {
        id: Date.now(),
        trackingId,
        facultyName: name,
        email: currentUser.email,
        dept,
        fromDate: document.getElementById('facFromDate').value,
        toDate: document.getElementById('facToDate').value,
        days: Number(document.getElementById('facNoDays').value),
        subject: document.getElementById('facLeaveSubject').value,
        body: document.getElementById('facLeaveBody').value,
        statusChain: { HOD: 'Pending', Principal: 'Waiting' },
        currentLevel: 'HOD',
        overallStatus: 'Pending',
        history: [
          { level: 'HOD', action: 'Submitted to HOD', timestamp: new Date().toLocaleTimeString() }
        ],
        createdAt: new Date().toISOString()
      };

      const facLeaves = JSON.parse(localStorage.getItem(K.FAC_LEAVES) || '[]');
      facLeaves.push(newFacLeave);
      localStorage.setItem(K.FAC_LEAVES, JSON.stringify(facLeaves));

      toast('Faculty leave submitted (' + trackingId + ')');
      showPage('faculty-dashboard');
    }

    // 4. Mark Faculty Attendance
    function markFacultyAttendance() {
      const date = document.getElementById('facultyAttendanceDate').value || new Date().toISOString().split('T')[0];
      const status = document.getElementById('facultyAttendanceStatus').value;
      const location = document.getElementById('facultyAttendanceLocation').value;

      const record = {
        id: Date.now(),
        facultyName: currentUser.fullName || 'Faculty Member',
        email: currentUser.email,
        dept: currentUser.dept || 'CSE',
        date,
        status,
        location,
        markedAt: new Date().toLocaleTimeString()
      };

      const attendance = JSON.parse(localStorage.getItem(K.ATTENDANCE) || '[]');
      attendance.push(record);
      localStorage.setItem(K.ATTENDANCE, JSON.stringify(attendance));

      toast('Faculty attendance marked: ' + status);
      refreshAllRealTimeData();
    }

    // 5. Faculty Modal Attendance Override
    function openFacultyModal(email, name, att, leave) {
      document.getElementById('modalStudentEmail').value = email;
      document.getElementById('modalStudentName').value = name;
      document.getElementById('editAttendancePercent').value = att;
      document.getElementById('editLeavePercent').value = leave;
      document.getElementById('attendanceUpdateBadge').classList.add('hidden');

      document.getElementById('facultyUpdateAttendanceModal').classList.remove('hidden');
    }

    function closeFacultyModal() {
      document.getElementById('facultyUpdateAttendanceModal').classList.add('hidden');
    }

    function updateStudentAttendanceSecure() {
      const actorRole = currentUser.role;
      if (!['Faculty', 'HOD', 'Principal'].includes(actorRole)) {
        alert('Unauthorized action. Only authorized academic staff can update student metrics.');
        return;
      }

      const email = document.getElementById('modalStudentEmail').value;
      const name = document.getElementById('modalStudentName').value;
      const newAtt = Number(document.getElementById('editAttendancePercent').value);
      const newLeave = Number(document.getElementById('editLeavePercent').value);

      if (newAtt < 0 || newAtt > 100 || newLeave < 0 || newLeave > 100) {
        alert('Percentages must be between 0 and 100.');
        return;
      }

      const profiles = JSON.parse(localStorage.getItem(K.PROFILES) || '{}');
      if (profiles[email]) {
        const oldAtt = profiles[email].attendancePercent;
        const oldLeave = profiles[email].leavePercent;

        profiles[email].attendancePercent = newAtt;
        profiles[email].leavePercent = newLeave;
        localStorage.setItem(K.PROFILES, JSON.stringify(profiles));

        // Audit Log
        const audit = JSON.parse(localStorage.getItem(K.AUDIT) || '[]');
        audit.push({
          facultyMail: currentUser.email,
          studentMail: email,
          oldAtt,
          newAtt,
          oldLeave,
          newLeave,
          timestamp: Date.now()
        });
        localStorage.setItem(K.AUDIT, JSON.stringify(audit));

        // Notification
        const notifs = JSON.parse(localStorage.getItem(K.NOTIFS) || '[]');
        notifs.push({
          id: Date.now(),
          type: 'Attendance Updated',
          message: actorRole + ' updated attendance for ' + name + ' to ' + newAtt + '%',
          time: new Date().toLocaleTimeString(),
          read: false,
          target: email
        });
        localStorage.setItem(K.NOTIFS, JSON.stringify(notifs));

        document.getElementById('attendanceUpdateBadge').classList.remove('hidden');
        toast('Attendance updated for ' + name + ' to ' + newAtt + '%');
        setTimeout(() => closeFacultyModal(), 700);
        refreshAllRealTimeData();
      }
    }

    // 6. Workflow Approvals: Faculty Level
    function facultyApproveLeave(trackingId) {
      const leaves = JSON.parse(localStorage.getItem(K.LEAVES) || '[]');
      const leave = leaves.find(l => l.trackingId === trackingId);
      if (leave) {
        leave.statusChain.Faculty = 'Approved';
        leave.history.push({ level: 'Faculty', action: 'Faculty Approved', timestamp: new Date().toLocaleTimeString() });
        localStorage.setItem(K.LEAVES, JSON.stringify(leaves));

        // Toggle buttons
        const appBtn = document.getElementById('approveBtn-' + trackingId);
        const fwdBtn = document.getElementById('forwardBtn-' + trackingId);
        if (appBtn) appBtn.classList.add('hidden');
        if (fwdBtn) fwdBtn.classList.remove('hidden');

        document.getElementById('forwardBanner').classList.remove('hidden');
        toast('Approved by Faculty. Now click Forward to pass to HOD.');
        refreshAllRealTimeData();
      }
    }

    function facultyForwardLeave(trackingId) {
      const leaves = JSON.parse(localStorage.getItem(K.LEAVES) || '[]');
      const leave = leaves.find(l => l.trackingId === trackingId);
      if (leave) {
        leave.currentLevel = 'HOD';
        leave.statusChain.HOD = 'Pending';
        leave.overallStatus = 'Pending';
        leave.history.push({ level: 'Faculty', action: 'Forwarded to HOD', timestamp: new Date().toLocaleTimeString() });
        localStorage.setItem(K.LEAVES, JSON.stringify(leaves));

        // Notification to HOD
        const notifs = JSON.parse(localStorage.getItem(K.NOTIFS) || '[]');
        notifs.push({
          id: Date.now(),
          type: 'Forwarded to HOD',
          message: 'Leave ' + trackingId + ' forwarded to HOD for approval.',
          time: new Date().toLocaleTimeString(),
          read: false,
          target: 'hod.cse@swce.ac.in'
        });
        localStorage.setItem(K.NOTIFS, JSON.stringify(notifs));

        toast('Leave forwarded to HOD successfully');
        refreshAllRealTimeData();
      }
    }

    // 7. Workflow Approvals: HOD Level
    function hodApproveStudent(trackingId) {
      const leaves = JSON.parse(localStorage.getItem(K.LEAVES) || '[]');
      const leave = leaves.find(l => l.trackingId === trackingId);
      if (leave) {
        leave.statusChain.HOD = 'Approved';
        leave.history.push({ level: 'HOD', action: 'HOD Approved', timestamp: new Date().toLocaleTimeString() });
        localStorage.setItem(K.LEAVES, JSON.stringify(leaves));

        const appBtn = document.getElementById('hodApproveStudent-' + trackingId);
        const fwdBtn = document.getElementById('hodForwardStudent-' + trackingId);
        if (appBtn) appBtn.classList.add('hidden');
        if (fwdBtn) fwdBtn.classList.remove('hidden');

        toast('HOD Approved. Click Forward to Principal.');
        refreshAllRealTimeData();
      }
    }

    function hodForwardStudent(trackingId) {
      const leaves = JSON.parse(localStorage.getItem(K.LEAVES) || '[]');
      const leave = leaves.find(l => l.trackingId === trackingId);
      if (leave) {
        leave.currentLevel = 'Principal';
        leave.statusChain.Principal = 'Pending';
        leave.history.push({ level: 'HOD', action: 'Forwarded to Principal', timestamp: new Date().toLocaleTimeString() });
        localStorage.setItem(K.LEAVES, JSON.stringify(leaves));

        toast('Forwarded to Principal for final seal');
        refreshAllRealTimeData();
      }
    }

    function hodApproveFacultyLeave(trackingId) {
      const facLeaves = JSON.parse(localStorage.getItem(K.FAC_LEAVES) || '[]');
      const leave = facLeaves.find(l => l.trackingId === trackingId);
      if (leave) {
        leave.statusChain.HOD = 'Approved';
        leave.history.push({ level: 'HOD', action: 'HOD Approved', timestamp: new Date().toLocaleTimeString() });
        localStorage.setItem(K.FAC_LEAVES, JSON.stringify(facLeaves));
        toast('HOD approved faculty leave. Ready to forward.');
        refreshAllRealTimeData();
      }
    }

    function hodForwardFacultyLeave(trackingId) {
      const facLeaves = JSON.parse(localStorage.getItem(K.FAC_LEAVES) || '[]');
      const leave = facLeaves.find(l => l.trackingId === trackingId);
      if (leave) {
        leave.currentLevel = 'Principal';
        leave.statusChain.Principal = 'Pending';
        leave.history.push({ level: 'HOD', action: 'Forwarded to Principal', timestamp: new Date().toLocaleTimeString() });
        localStorage.setItem(K.FAC_LEAVES, JSON.stringify(facLeaves));
        toast('Faculty leave forwarded to Principal');
        refreshAllRealTimeData();
      }
    }

    // 8. Workflow Approvals: Principal Level
    function principalFinalApprove(trackingId, typeBadge) {
      if (typeBadge === 'Student') {
        const leaves = JSON.parse(localStorage.getItem(K.LEAVES) || '[]');
        const leave = leaves.find(l => l.trackingId === trackingId);
        if (leave) {
          leave.statusChain.Principal = 'Approved';
          leave.overallStatus = 'Approved';
          leave.history.push({ level: 'Principal', action: 'Principal Approved (Fully Approved)', timestamp: new Date().toLocaleTimeString() });
          localStorage.setItem(K.LEAVES, JSON.stringify(leaves));

          const notifs = JSON.parse(localStorage.getItem(K.NOTIFS) || '[]');
          notifs.push({
            id: Date.now(),
            type: 'Fully Approved',
            message: 'Leave ' + trackingId + ' has been Fully Approved by Principal.',
            time: new Date().toLocaleTimeString(),
            read: false,
            target: leave.fromEmail
          });
          localStorage.setItem(K.NOTIFS, JSON.stringify(notifs));

          toast('Application ' + trackingId + ' fully approved!');
          refreshAllRealTimeData();
        }
      } else {
        const facLeaves = JSON.parse(localStorage.getItem(K.FAC_LEAVES) || '[]');
        const leave = facLeaves.find(l => l.trackingId === trackingId);
        if (leave) {
          leave.statusChain.Principal = 'Approved';
          leave.overallStatus = 'Approved';
          leave.history.push({ level: 'Principal', action: 'Principal Approved (Fully Approved)', timestamp: new Date().toLocaleTimeString() });
          localStorage.setItem(K.FAC_LEAVES, JSON.stringify(facLeaves));

          toast('Faculty leave ' + trackingId + ' fully approved!');
          refreshAllRealTimeData();
        }
      }
    }

    // 9. Whitelist Management
    function addWhitelist(type) {
      let inputId = '', storageKey = '';
      if (type === 'faculty') { inputId = 'addFacultyEmailInput'; storageKey = K.FAC_WL; }
      else if (type === 'hod') { inputId = 'addHodEmailInput'; storageKey = K.HOD_WL; }
      else if (type === 'principal') { inputId = 'addPrincipalEmailInput'; storageKey = K.PRIN_WL; }

      const email = document.getElementById(inputId).value.trim();
      if (!email || !email.includes('@')) {
        alert('Enter a valid email address');
        return;
      }

      const list = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!list.includes(email)) {
        list.push(email);
        localStorage.setItem(storageKey, JSON.stringify(list));
        document.getElementById(inputId).value = '';
        renderAdminWhitelists();
        toast('Added ' + email + ' to ' + type + ' whitelist');
      }
    }

    function removeWhitelist(type, email) {
      let storageKey = '';
      if (type === 'faculty') storageKey = K.FAC_WL;
      else if (type === 'hod') storageKey = K.HOD_WL;
      else if (type === 'principal') storageKey = K.PRIN_WL;

      let list = JSON.parse(localStorage.getItem(storageKey) || '[]');
      list = list.filter(e => e !== email);
      localStorage.setItem(storageKey, JSON.stringify(list));
      renderAdminWhitelists();
      toast('Removed ' + email);
    }

    function clearSecurityLogs() {
      localStorage.setItem(K.SECURITY, JSON.stringify([]));
      renderSecurityLogs();
      toast('Security logs cleared');
    }

    // 10. Tracking Modal
    function openTrackingModal(trackingId) {
      const leaves = JSON.parse(localStorage.getItem(K.LEAVES) || '[]');
      const facLeaves = JSON.parse(localStorage.getItem(K.FAC_LEAVES) || '[]');
      const item = leaves.find(l => l.trackingId === trackingId) || facLeaves.find(l => l.trackingId === trackingId);

      if (!item) {
        alert('Tracking ID not found.');
        return;
      }

      document.getElementById('modalTrackingId').textContent = item.trackingId;
      document.getElementById('modalStudentDetails').textContent = (item.studentName || item.facultyName) + ' • ' + item.dept;
      document.getElementById('modalSubject').textContent = item.subject;
      document.getElementById('modalDates').textContent = item.fromDate + ' to ' + item.toDate + ' (' + item.days + ' days)';
      document.getElementById('modalOverallBadge').textContent = item.overallStatus;

      // Update stepper line and step colors
      const facStatus = item.statusChain?.Faculty || (item.facultyName ? 'Approved' : 'Waiting');
      const hodStatus = item.statusChain?.HOD || 'Waiting';
      const prinStatus = item.statusChain?.Principal || 'Waiting';

      document.getElementById('modalStepFacStatus').textContent = facStatus;
      document.getElementById('modalStepHodStatus').textContent = hodStatus;
      document.getElementById('modalStepPrinStatus').textContent = prinStatus;

      let pct = '0%';
      if (item.overallStatus === 'Approved') pct = '100%';
      else if (hodStatus === 'Pending' || hodStatus === 'Approved') pct = '50%';
      else if (facStatus === 'Pending') pct = '15%';

      document.getElementById('modalStepLine').style.width = pct;

      // History
      const histList = document.getElementById('modalHistoryList');
      histList.innerHTML = (item.history || []).map(h => \`
        <div class="flex justify-between py-1 text-gray-600">
          <span>\${h.action} (\${h.level})</span>
          <span class="text-gray-400 font-mono">\${h.timestamp}</span>
        </div>
      \`).join('');

      document.getElementById('trackingModal').classList.remove('hidden');
    }

    function closeTrackingModal() {
      document.getElementById('trackingModal').classList.add('hidden');
    }

    function trackSingleLeave() {
      const id = document.getElementById('trackingInput').value.trim().toUpperCase();
      if (!id) {
        alert('Please enter a Tracking ID');
        return;
      }
      openTrackingModal(id);
    }

    // 11. Notification Dropdown
    function toggleNotifDropdown() {
      const el = document.getElementById('notifDropdown');
      el.classList.toggle('hidden');
      renderNotifications();
    }

    function renderNotifications() {
      const notifs = JSON.parse(localStorage.getItem(K.NOTIFS) || '[]');
      const container = document.getElementById('notifDropdownList');
      if (notifs.length === 0) {
        container.innerHTML = '<p class="text-gray-400 py-3 text-center">No notifications right now.</p>';
        return;
      }
      container.innerHTML = notifs.slice(-6).reverse().map(n => \`
        <div class="p-2 hover:bg-gray-50 rounded text-left">
          <div class="font-semibold text-gray-800">\${n.type}</div>
          <div class="text-gray-600">\${n.message}</div>
          <div class="text-[10px] text-gray-400 mt-1">\${n.time}</div>
        </div>
      \`).join('');
    }

    function clearAllNotifications() {
      localStorage.setItem(K.NOTIFS, JSON.stringify([]));
      renderNotifications();
      document.getElementById('headerBellBadge').textContent = '0';
    }

    // 12. Export and Clear Data
    function exportData() {
      const backup = {
        leaves: JSON.parse(localStorage.getItem(K.LEAVES) || '[]'),
        facultyLeaves: JSON.parse(localStorage.getItem(K.FAC_LEAVES) || '[]'),
        profiles: JSON.parse(localStorage.getItem(K.PROFILES) || '{}'),
        attendance: JSON.parse(localStorage.getItem(K.ATTENDANCE) || '[]'),
        whitelists: {
          faculty: JSON.parse(localStorage.getItem(K.FAC_WL) || '[]'),
          hod: JSON.parse(localStorage.getItem(K.HOD_WL) || '[]'),
          principal: JSON.parse(localStorage.getItem(K.PRIN_WL) || '[]')
        }
      };

      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'swce_backup.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast('Backup downloaded (swce_backup.json)');
    }

    function clearDemoData() {
      if (confirm('Are you sure you want to reset all records to demo defaults?')) {
        localStorage.clear();
        initializeDefaultStorage();
        arrangeDashboardByRole();
        showPage('dashboard');
        toast('Data reset to defaults');
      }
    }

    function handleLogout() {
      localStorage.removeItem(K.USER);
      toast('Logged out. Redirecting...');
      setTimeout(() => {
        window.location.href = 'login/login.html';
      }, 600);
    }

    // Toast helper
    function toast(msg) {
      const container = document.getElementById('toastContainer');
      const toastEl = document.createElement('div');
      toastEl.className = 'bg-[#0A2D6A] text-white text-xs px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 border border-blue-400/30 animate-fadeIn';
      toastEl.innerHTML = '<span>' + msg + '</span>';
      container.appendChild(toastEl);
      setTimeout(() => {
        toastEl.style.opacity = '0';
        toastEl.style.transition = 'opacity 0.3s';
        setTimeout(() => toastEl.remove(), 300);
      }, 3000);
    }

    // --- INITIAL BOOTSTRAP ---
    window.addEventListener('DOMContentLoaded', () => {
      // Set dates to today
      const today = new Date().toISOString().split('T')[0];
      const letterDate = document.getElementById('letterDate');
      if (letterDate) letterDate.value = today;
      const fDate = document.getElementById('fromDate');
      if (fDate) fDate.value = today;
      const tDate = document.getElementById('toDate');
      if (tDate) tDate.value = today;
      const facDate = document.getElementById('facultyAttendanceDate');
      if (facDate) facDate.value = today;
      const facFDate = document.getElementById('facFromDate');
      if (facFDate) facFDate.value = today;
      const facTDate = document.getElementById('facToDate');
      if (facTDate) facTDate.value = today;

      arrangeDashboardByRole();
      showPage('dashboard');

      // Realtime interval 1000ms
      setInterval(refreshAllRealTimeData, 1000);
    });
  </script>
</body>
</html>`;

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully wrote frontend/dashboard.html! File size:', fs.statSync(targetPath).size, 'bytes');
