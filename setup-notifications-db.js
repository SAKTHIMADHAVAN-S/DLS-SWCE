const mysql = require('mysql2/promise');

(async () => {
  const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'software20developer@2006',
    database: 'leave_system'
  });
  
  try {
    console.log('📊 Setting up notification & activity logging tables...\n');
    
    // Read and execute schema
    const fs = require('fs');
    const schemaSql = fs.readFileSync('./database/notifications-schema.sql', 'utf-8');
    
    // Split by ; and execute each statement
    const statements = schemaSql.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await db.query(statement);
          const tableName = statement.match(/CREATE TABLE[^(]*/i)?.[0] || 'Statement';
          console.log(`✅ ${tableName.replace(/CREATE TABLE.*IF NOT EXISTS/i, '').trim()}`);
        } catch (err) {
          if (err.message.includes('already exists')) {
            console.log(`⏭️  Table already exists`);
          } else {
            console.error(`❌ Error: ${err.message}`);
          }
        }
      }
    }
    
    // Update leaves table with additional columns
    console.log('\n🔧 Updating leaves table...');
    const alterStatements = [
      'ALTER TABLE leaves ADD COLUMN IF NOT EXISTS notification_sent BOOLEAN DEFAULT FALSE',
      'ALTER TABLE leaves ADD COLUMN IF NOT EXISTS forwarded_by INT AFTER status',
      'ALTER TABLE leaves ADD COLUMN IF NOT EXISTS forwarded_to INT AFTER forwarded_by',
      'ALTER TABLE leaves ADD COLUMN IF NOT EXISTS forwarded_at TIMESTAMP NULL AFTER forwarded_to'
    ];
    
    for (const stmt of alterStatements) {
      try {
        await db.query(stmt);
        console.log(`✅ Updated leaves table`);
        break; // Only once needed
      } catch (err) {
        if (!err.message.includes('Duplicate column')) {
          console.log(`ℹ️  Columns already exist`);
        }
      }
    }
    
    console.log('\n✅ Database setup complete!');
    
  } catch (err) {
    console.error('💥 Error:', err.message);
  }
  
  process.exit();
})();
