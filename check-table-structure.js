const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'software20developer@2006',
  database: 'leave_system'
});

(async () => {
  try {
    // Check users table structure
    const [columns] = await db.query("DESCRIBE users");
    
    console.log('Users Table Structure:');
    console.log('═══════════════════════════════════════════════');
    columns.forEach(col => {
      console.log(`${col.Field.padEnd(20)} ${col.Type.padEnd(20)} ${col.Null.padEnd(5)} ${col.Key}`);
    });
    
    console.log('\n\nChecking constraints and unique indexes:');
    const [indexes] = await db.query("SHOW INDEXES FROM users");
    indexes.forEach(idx => {
      if (idx.Key_name !== 'PRIMARY') {
        console.log(`Index: ${idx.Key_name} on ${idx.Column_name}`);
      }
    });
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
