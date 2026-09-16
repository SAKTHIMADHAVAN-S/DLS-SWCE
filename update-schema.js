const mysql = require('mysql2/promise');

(async () => {
  const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'software20developer@2006',
    database: 'leave_system'
  });
  
  try {
    console.log('📋 Updating leaves table schema...\n');
    
    // Add 'forwarded' status to the ENUM
    console.log('🔧 Adding "forwarded" status to leaves.status ENUM...');
    await db.query(`
      ALTER TABLE leaves 
      MODIFY COLUMN status ENUM('pending', 'forwarded', 'approved', 'rejected') DEFAULT 'pending'
    `);
    
    console.log('✅ Status column updated successfully!');
    console.log('\n📋 Verifying schema...');
    const [schema] = await db.query('DESCRIBE leaves');
    const statusField = schema.find(col => col.Field === 'status');
    console.log(`Status field Type: ${statusField.Type}`);
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
  
  process.exit();
})();
