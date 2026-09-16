const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const testUsers = [
  { username: 'student_001', password: 'student123', role: 'student' },
  { username: 'faculty_001', password: 'faculty123', role: 'faculty' },
  { username: 'hod_001', password: 'hod123', role: 'hod' },
  { username: 'principal_001', password: 'principal123', role: 'principal' }
];

(async () => {
  const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'software20developer@2006',
    database: 'leave_system'
  });
  
  try {
    console.log('👤 Creating test users...\n');
    
    for (const user of testUsers) {
      // Check if user already exists
      const [existing] = await db.query('SELECT id FROM users WHERE username = ?', [user.username]);
      
      if (existing.length > 0) {
        console.log(`⏭️  User "${user.username}" already exists, skipping`);
        continue;
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(user.password, 10);
      
      // Insert new user
      await db.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [user.username, hashedPassword, user.role]
      );
      
      console.log(`✅ Created ${user.role} - Username: ${user.username}, Password: ${user.password}`);
    }
    
    console.log('\n📋 All test users:');
    const [allUsers] = await db.query('SELECT id, username, role FROM users');
    allUsers.forEach(u => {
      console.log(`  ${u.id}. ${u.username} (${u.role})`);
    });
    
  } catch (err) {
    console.error('Error:', err.message);
  }
  
  process.exit();
})();
