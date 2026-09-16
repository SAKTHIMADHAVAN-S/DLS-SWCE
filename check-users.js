const mysql = require('mysql2/promise');

(async () => {
  const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'software20developer@2006',
    database: 'leave_system'
  });
  
  try {
    const [rows] = await db.query('SELECT id, username, role, password FROM users');
    console.log('Users in database:');
    if (rows.length === 0) {
      console.log('  ⚠️  No users found - need to create test users');
    } else {
      rows.forEach(row => {
        const pwd = row.password ? row.password.substring(0, 30) + '...' : 'NULL';
        console.log(`  ID: ${row.id}, Username: ${row.username}, Role: ${row.role}`);
        console.log(`    Password: ${pwd}`);
      });
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
  
  process.exit();
})();
