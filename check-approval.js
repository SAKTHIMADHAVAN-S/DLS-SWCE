const mysql = require('mysql2/promise');

async function check() {
  try {
    const pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'software20developer@2006',
      database: 'leave_system',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const [leaves] = await pool.query('SELECT leave_id, username, status, approved_by, approved_at FROM leaves WHERE leave_id = 1');
    console.log('✅ Leave Status:');
    console.table(leaves);
    
    const [notifs] = await pool.query('SELECT * FROM notifications ORDER BY created_at DESC LIMIT 5');
    console.log('\n✅ Recent Notifications:');
    console.table(notifs);
    
    await pool.end();
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

check();
