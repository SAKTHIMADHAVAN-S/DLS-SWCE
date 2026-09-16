const mysql = require('mysql2/promise');

(async () => {
  const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'software20developer@2006',
    database: 'leave_system'
  });
  
  try {
    console.log('📋 Updating leaves table with approval stage tracking...\n');
    
    // Add current_approval_stage column
    console.log('🔧 Adding current_approval_stage column...');
    try {
      await db.query(`
        ALTER TABLE leaves 
        ADD COLUMN current_approval_stage ENUM('faculty', 'hod', 'principal') DEFAULT 'faculty'
      `);
      console.log('✅ current_approval_stage column added');
    } catch (err) {
      if (err.message.includes('Duplicate column name')) {
        console.log('⚠️  current_approval_stage column already exists');
      } else {
        throw err;
      }
    }
    
    // Update existing leaves: if status='forwarded', they're at HOD stage
    console.log('\n🔧 Updating existing forwarded leaves to HOD stage...');
    const [updateResult] = await db.query(`
      UPDATE leaves 
      SET current_approval_stage = 'hod' 
      WHERE status = 'forwarded' AND forwarded_by IS NOT NULL
    `);
    console.log(`✅ Updated ${updateResult.affectedRows} leaves to HOD stage`);
    
    console.log('\n✅ Schema migration completed successfully!');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
  
  process.exit();
})();
