const mysql = require('mysql2/promise');
const http = require('http');
const https = require('https');

// Color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.cyan}═══════════════════════════════════${colors.reset}\n${colors.cyan}${msg}${colors.reset}\n${colors.cyan}═══════════════════════════════════${colors.reset}\n`)
};

// ==================== VALIDATION FUNCTIONS ====================

// Check MySQL connection
async function checkMySQL() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'software20developer@2006'
    });
    
    await connection.query('SELECT 1');
    await connection.end();
    
    log.success('MySQL is running and accessible');
    return true;
  } catch (err) {
    log.error(`MySQL connection failed: ${err.message}`);
    log.info('Solutions:');
    console.log('  1. Start MySQL service (Windows: Services → MySQL → Start)');
    console.log('  2. Check credentials: root / software20developer@2006');
    console.log('  3. Verify MySQL port 3306 is not blocked');
    return false;
  }
}

// Check database exists
async function checkDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'software20developer@2006'
    });
    
    const [databases] = await connection.query("SHOW DATABASES LIKE 'leave_system'");
    await connection.end();
    
    if (databases.length > 0) {
      log.success('Database "leave_system" exists');
      return true;
    } else {
      log.error('Database "leave_system" does not exist');
      log.info('Solution: Run "node init-database.js"');
      return false;
    }
  } catch (err) {
    log.error(`Database check failed: ${err.message}`);
    return false;
  }
}

// Check database tables
async function checkTables() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'software20developer@2006',
      database: 'leave_system'
    });
    
    const requiredTables = ['users', 'leaves', 'notifications'];
    const [tables] = await connection.query(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'leave_system'"
    );
    
    const existingTables = tables.map(t => t.TABLE_NAME);
    let allExist = true;
    
    for (const table of requiredTables) {
      if (existingTables.includes(table)) {
        log.success(`Table "${table}" exists`);
      } else {
        log.error(`Table "${table}" is missing`);
        allExist = false;
      }
    }
    
    await connection.end();
    return allExist;
  } catch (err) {
    log.error(`Table check failed: ${err.message}`);
    return false;
  }
}

// Check test users
async function checkTestUsers() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'software20developer@2006',
      database: 'leave_system'
    });
    
    const [users] = await connection.query(
      'SELECT id, username, role FROM users ORDER BY role, username'
    );
    
    await connection.end();
    
    if (users.length === 0) {
      log.error('No users found in database');
      log.info('Solution: Run "node init-database.js" to create test users');
      return false;
    }
    
    log.success(`Found ${users.length} users in database:`);
    users.forEach(u => {
      console.log(`   • ${u.username.padEnd(20)} - Role: ${u.role}`);
    });
    
    return true;
  } catch (err) {
    log.error(`User check failed: ${err.message}`);
    return false;
  }
}

// Check backend server
function checkBackendServer() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/health',
      method: 'GET',
      timeout: 5000
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            if (json.status === 'healthy') {
              log.success('Backend server is running on http://localhost:5000');
              resolve(true);
            } else {
              log.error('Backend server health check failed');
              resolve(false);
            }
          } catch (err) {
            log.error('Backend returned invalid response');
            resolve(false);
          }
        } else {
          log.error(`Backend returned status ${res.statusCode}`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      log.error(`Backend server not accessible: ${err.message}`);
      log.info('Solution: Run "node server.js"');
      resolve(false);
    });
    
    req.on('timeout', () => {
      log.error('Backend server connection timeout');
      resolve(false);
    });
    
    req.end();
  });
}

// Check frontend server
function checkFrontendServer() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/login/login.html',
      method: 'GET',
      timeout: 5000
    };
    
    const req = http.request(options, (res) => {
      if (res.statusCode === 200) {
        log.success('Frontend server is running on http://localhost:3000');
        resolve(true);
      } else {
        log.error(`Frontend server returned status ${res.statusCode}`);
        resolve(false);
      }
    });
    
    req.on('error', (err) => {
      log.error(`Frontend server not accessible: ${err.message}`);
      log.info('Solution: Run "node frontend-server.js"');
      resolve(false);
    });
    
    req.on('timeout', () => {
      log.error('Frontend server connection timeout');
      resolve(false);
    });
    
    req.end();
  });
}

// ==================== MAIN VALIDATION ====================

(async () => {
  console.log('\n');
  log.header('🎓 SYSTEM HEALTH CHECK');
  console.log('STUDYWORLD COLLEGE OF ENGINEERING');
  console.log('Digital Leave Letter Management System\n');

  let allPassed = true;

  // Phase 1: Database
  log.header('PHASE 1: DATABASE CHECKS');
  
  const mysqlOk = await checkMySQL();
  if (!mysqlOk) allPassed = false;
  
  const dbOk = await checkDatabase();
  if (!dbOk) allPassed = false;
  
  const tablesOk = await checkTables();
  if (!tablesOk) allPassed = false;
  
  const usersOk = await checkTestUsers();
  if (!usersOk) allPassed = false;

  // Phase 2: Servers
  log.header('PHASE 2: SERVER CHECKS');
  
  const backendOk = await checkBackendServer();
  const frontendOk = await checkFrontendServer();

  // Summary
  log.header('✅ VALIDATION SUMMARY');

  const checks = [
    ['MySQL Connection', mysqlOk],
    ['Database Exists', dbOk],
    ['Database Tables', tablesOk],
    ['Test Users', usersOk],
    ['Backend Server (port 5000)', backendOk],
    ['Frontend Server (port 3000)', frontendOk]
  ];

  checks.forEach(([name, passed]) => {
    if (passed) {
      log.success(name);
    } else {
      log.error(name);
    }
  });

  console.log('');

  if (mysqlOk && dbOk && tablesOk && usersOk && backendOk && frontendOk) {
    log.header('🎉 SYSTEM IS READY!');
    console.log('All checks passed! Your system is ready to use.\n');
    console.log('📍 Login URL: http://localhost:3000/login/login.html\n');
    console.log('Test Credentials:');
    console.log('  • student_001 / student123');
    console.log('  • faculty_001 / faculty123');
    console.log('  • admin / admin123\n');
  } else {
    log.header('❌ SYSTEM NEEDS ATTENTION');
    console.log('Some checks failed. See solutions above.\n');
    console.log('Common fixes:\n');
    
    if (!mysqlOk) {
      console.log('1. Start MySQL service:');
      console.log('   Windows: Services → MySQL → Start\n');
    }
    
    if (!dbOk || !tablesOk || !usersOk) {
      console.log('2. Initialize database:');
      console.log('   node init-database.js\n');
    }
    
    if (!backendOk) {
      console.log('3. Start backend server:');
      console.log('   node server.js\n');
    }
    
    if (!frontendOk) {
      console.log('4. Start frontend server:');
      console.log('   node frontend-server.js\n');
    }
  }

  process.exit(allPassed ? 0 : 1);
})();
