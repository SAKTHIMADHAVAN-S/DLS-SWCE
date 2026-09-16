const mysql = require('mysql2/promise');

async function fixSchema() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'software20developer@2006',
    database: 'leave_system'
  });

  try {
    console.log('🔧 Fixing database schema...\n');

    // Add created_at column to leaves table if missing
    console.log('📝 Checking leaves table...');
    try {
      await connection.query(`ALTER TABLE leaves ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
      console.log('✅ Added created_at to leaves table');
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log('✅ created_at column already exists in leaves table');
      } else {
        console.error('⚠️  Note:', e.message);
      }
    }

    // Add title column to notifications table if missing
    console.log('\n📝 Checking notifications table...');
    try {
      await connection.query(`ALTER TABLE notifications ADD COLUMN title VARCHAR(255) DEFAULT NULL`);
      console.log('✅ Added title to notifications table');
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log('✅ title column already exists');
      } else {
        console.error('⚠️  Note:', e.message);
      }
    }

    // Add type column if it doesn't exist
    try {
      await connection.query(`ALTER TABLE notifications ADD COLUMN type VARCHAR(50) DEFAULT 'info'`);
      console.log('✅ Added type to notifications table');
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log('✅ type column already exists');
      }
    }

    // Add is_read column if it doesn't exist (rename from status)
    try {
      await connection.query(`ALTER TABLE notifications ADD COLUMN is_read BOOLEAN DEFAULT FALSE`);
      console.log('✅ Added is_read to notifications table');
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log('✅ is_read column already exists');
      }
    }

    console.log('\n✅ Database schema fixed successfully!');
    
  } catch (error) {
    console.error('❌ Error fixing schema:', error.message);
  } finally {
    await connection.end();
  }
}

fixSchema();
