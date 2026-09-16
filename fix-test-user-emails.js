const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'software20developer@2006',
  database: 'leave_system'
});

(async () => {
  try {
    // Update student_001 with real Gmail address
    await db.query(
      'UPDATE users SET email = ? WHERE username = ?',
      ['care.webnest@gmail.com', 'student_001']
    );
    
    console.log('✅ Updated student_001 email to: care.webnest@gmail.com');
    console.log('\n📋 Updated Users:');
    console.log('═══════════════════════════════════════════════');
    
    const [users] = await db.query('SELECT username, email, role FROM users');
    users.forEach(u => {
      const email = u.email || 'NO EMAIL';
      console.log(`${u.username.padEnd(20)} → ${email.padEnd(30)} (${u.role})`);
    });
    
    console.log('\n✅ Now you can test OTP with:');
    console.log('   Username: student_001');
    console.log('   Password: student123');
    console.log('   Email will be sent to: care.webnest@gmail.com');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
})();
