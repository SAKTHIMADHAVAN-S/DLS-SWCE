const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

async function test() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'software20developer@2006',
    database: 'leave_system'
  });

  // Test the query
  const [approved] = await pool.query("SELECT * FROM leaves WHERE LOWER(status) = ? ORDER BY created_at DESC LIMIT 100", ['approved']);
  console.log('✅ Approved leaves (using LOWER):');
  console.table(approved);

  // Also test without LOWER
  const [approved2] = await pool.query("SELECT * FROM leaves WHERE status = 'Approved' ORDER BY created_at DESC LIMIT 100");
  console.log('\n✅ Approved leaves (exact case):');
  console.table(approved2);

  // Check what statuses we have
  const [statuses] = await pool.query("SELECT DISTINCT status FROM leaves");
  console.log('\n✅ All statuses in database:');
  console.table(statuses);

  await pool.end();
}

test().catch(err => console.error('Error:', err.message));
