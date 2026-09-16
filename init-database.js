const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Helper functions
const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.cyan}═══════════════════════════════════${colors.reset}\n${colors.cyan}${msg}${colors.reset}\n${colors.cyan}═══════════════════════════════════${colors.reset}\n`)
};

const testUsers = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'student_001', password: 'student123', role: 'student' },
  { username: 'faculty_001', password: 'faculty123', role: 'faculty' },
  { username: 'hod_001', password: 'hod123', role: 'hod' },
  { username: 'principal_001', password: 'principal123', role: 'principal' }
];

(async () => {
  try {
    log.header('🎓 DATABASE INITIALIZATION - STUDYWORLD COLLEGE');

    // Step 1: Connect to MySQL root
    log.info('Connecting to MySQL...');
    const rootConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'software20developer@2006'
    });
    log.success('Connected to MySQL');

    // Step 2: Create database if not exists
    log.info('Creating database if not exists...');
    await rootConnection.query('CREATE DATABASE IF NOT EXISTS leave_system');
    log.success('Database "leave_system" ready');

    // Step 3: Select database
    await rootConnection.query('USE leave_system');

    // Step 4: Drop existing tables (for clean reset)
    log.warning('Dropping existing tables for clean initialization...');
    await rootConnection.query('DROP TABLE IF EXISTS audit_logs');
    await rootConnection.query('DROP TABLE IF EXISTS notifications');
    await rootConnection.query('DROP TABLE IF EXISTS leaves');
    await rootConnection.query('DROP TABLE IF EXISTS users');
    log.success('Old tables removed');

    // Step 5: Execute schema
    log.info('Creating database schema...');
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    if (!fs.existsSync(schemaPath)) {
      log.error('Schema file not found: ' + schemaPath);
      process.exit(1);
    }

    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    const statements = schemaSQL.split(';').filter(stmt => stmt.trim());
    
    for (const stmt of statements) {
      if (stmt.trim() && !stmt.trim().startsWith('--')) {
        try {
          await rootConnection.query(stmt);
        } catch (err) {
          if (!err.message.includes('already exists')) {
            log.warning(`Schema statement warning: ${err.message}`);
          }
        }
      }
    }
    log.success('Database schema created');

    // Step 6: Verify tables exist
    log.info('Verifying tables...');
    const [tables] = await rootConnection.query(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'leave_system'"
    );
    
    const requiredTables = ['users', 'leaves', 'notifications', 'audit_logs'];
    const existingTables = tables.map(t => t.TABLE_NAME);
    
    for (const table of requiredTables) {
      if (existingTables.includes(table)) {
        log.success(`Table "${table}" exists`);
      } else {
        log.error(`Table "${table}" is missing!`);
      }
    }

    // Step 7: Seed test users
    log.info('Seeding test users...');
    let createdCount = 0;
    let skippedCount = 0;

    for (const user of testUsers) {
      const [existing] = await rootConnection.query(
        'SELECT id FROM users WHERE username = ?',
        [user.username]
      );

      if (existing.length > 0) {
        log.warning(`User "${user.username}" already exists, updating password`);
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await rootConnection.query(
          'UPDATE users SET password = ?, role = ? WHERE username = ?',
          [hashedPassword, user.role, user.username]
        );
        skippedCount++;
      } else {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await rootConnection.query(
          'INSERT INTO users (username, password, role, full_name, department) VALUES (?, ?, ?, ?, ?)',
          [user.username, hashedPassword, user.role, `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} User`, 'Engineering']
        );
        log.success(`Created ${user.role}: ${user.username} (password: ${user.password})`);
        createdCount++;
      }
    }

    // Step 8: List all users
    log.info('Verifying all users in database...');
    const [allUsers] = await rootConnection.query('SELECT id, username, role FROM users ORDER BY role, username');
    
    if (allUsers.length === 0) {
      log.error('No users found in database!');
    } else {
      console.log('\n📋 Users in database:');
      allUsers.forEach((u, idx) => {
        console.log(`   ${idx + 1}. ${u.username.padEnd(20)} - Role: ${u.role}`);
      });
    }

    // Step 9: Check connections
    log.info('Testing database connection pool...');
    const pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'software20developer@2006',
      database: 'leave_system',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const connection = await pool.getConnection();
    const [testResult] = await connection.query('SELECT 1 as test');
    connection.release();
    log.success('Database connection pool working');

    // Final summary
    log.header('✅ DATABASE INITIALIZATION COMPLETE');
    console.log(`
📊 Initialization Summary:
   • Database: leave_system
   • Tables: 4 created (users, leaves, notifications, audit_logs)
   • Users Created: ${createdCount}
   • Users Updated: ${skippedCount}
   • Total Users: ${allUsers.length}

🔐 Test Credentials:
   • Admin:      admin / admin123
   • Student:    student_001 / student123
   • Faculty:    faculty_001 / faculty123
   • HOD:        hod_001 / hod123
   • Principal:  principal_001 / principal123

✅ Ready to start the application!
   Run: node server.js (backend)
   Run: node frontend-server.js (frontend)
   Access: http://localhost:3000/login/login.html
    `);

    await rootConnection.end();
    process.exit(0);

  } catch (err) {
    log.error(`Initialization failed: ${err.message}`);
    console.error('Full error:', err);
    process.exit(1);
  }
})();
