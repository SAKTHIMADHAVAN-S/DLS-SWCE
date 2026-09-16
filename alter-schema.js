const mysql = require('mysql2/promise');

(async () => {
  const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'software20developer@2006',
    database: 'leave_system'
  });
  
  try {
    console.log('📋 Checking users table schema...\n');
    
    // Check table structure
    const [schema] = await db.query('DESCRIBE users');
    schema.forEach(col => {
      console.log(`  ${col.Field}: ${col.Type} | Null: ${col.Null} | Key: ${col.Key}`);
    });
    
    // Alter password column to VARCHAR(255) to fit bcrypt hashes
    console.log('\n🔧 Altering password column to VARCHAR(255)...\n');
    await db.query('ALTER TABLE users MODIFY COLUMN password VARCHAR(255)');
    
    console.log('✅ Password column extended successfully!');
    
    // Verify the change
    const [updatedSchema] = await db.query('DESCRIBE users');
    console.log('\n📋 Updated schema:');
    updatedSchema.forEach(col => {
      if (col.Field === 'password') {
        console.log(`  ${col.Field}: ${col.Type} ← UPDATED`);
      }
    });
    
  } catch (err) {
    console.error('Error:', err.message);
  }
  
  process.exit();
})();
