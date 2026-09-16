const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'software20developer@2006',
  database: 'leave_system'
});

(async () => {
  try {
    const [users] = await db.query('SELECT username, email, role FROM users');
    console.log('Users in Database:');
    console.log('═══════════════════════════════════════════════');
    users.forEach(u => {
      const email = u.email || 'NO EMAIL';
      console.log(`Username: ${u.username.padEnd(20)} Email: ${email.padEnd(30)} Role: ${u.role}`);
    });
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
