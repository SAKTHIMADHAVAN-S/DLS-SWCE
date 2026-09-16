const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

(async () => {
  const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'software20developer@2006',
    database: 'leave_system'
  });
  
  try {
    console.log('🔐 Migrating passwords to bcrypt...\n');
    
    // Get all users with plain text passwords
    const [users] = await db.query('SELECT id, username, password FROM users');
    
    for (const user of users) {
      // Skip if already hashed (bcrypt hashes start with $2b$, $2a$, or $2y$)
      if (user.password.startsWith('$2')) {
        console.log(`✅ User "${user.username}" already hashed`);
        continue;
      }
      
      // Hash the plain text password
      const hashedPassword = await bcrypt.hash(user.password, 10);
      console.log(`🔑 Hashing password for "${user.username}"...`);
      console.log(`   Original: ${user.password}`);
      console.log(`   Hashed: ${hashedPassword.substring(0, 40)}...`);
      
      // Update the database
      await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id]);
      console.log(`✅ Updated "${user.username}" in database\n`);
    }
    
    console.log('✅ Password migration complete!');
  } catch (err) {
    console.error('Error:', err.message);
  }
  
  process.exit();
})();
