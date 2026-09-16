const mysql = require('mysql2/promise');

async function simplifySchema() {
  let connection;
  
  try {
    console.log('🔧 Simplifying database schema...\n');
    
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'software20developer@2006',
      database: 'leave_system'
    });

    // Drop constraints first
    console.log('📝 Removing constraints...');
    try {
      const [constraints] = await connection.query(`
        SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
        WHERE TABLE_NAME='notifications' AND COLUMN_NAME='related_leave_id'
      `);
      if (constraints.length > 0) {
        await connection.query(`ALTER TABLE notifications DROP FOREIGN KEY ${constraints[0].CONSTRAINT_NAME}`);
        console.log('✅ Dropped notifications FK');
      }
    } catch (e) {
      console.log('⚠️  Could not drop notifications FK');
    }

    // Drop old from_date/to_date columns if they exist
    console.log('\n📝 Cleaning up old date columns...');
    try {
      await connection.query(`ALTER TABLE leaves DROP COLUMN from_date`);
      console.log('✅ Dropped from_date column');
    } catch (e) {
      console.log('⚠️  from_date already dropped');
    }

    try {
      await connection.query(`ALTER TABLE leaves DROP COLUMN to_date`);
      console.log('✅ Dropped to_date column');
    } catch (e) {
      console.log('⚠️  to_date already dropped');
    }

    // Ensure fromDate/toDate are NOT NULL
    console.log('\n📝 Updating column constraints...');
    try {
      await connection.query(`ALTER TABLE leaves MODIFY COLUMN fromDate DATE NOT NULL DEFAULT CURDATE()`);
      console.log('✅ Updated fromDate');
    } catch (e) {
      console.log('⚠️  Could not update fromDate:', e.message.substring(0, 50));
    }

    try {
      await connection.query(`ALTER TABLE leaves MODIFY COLUMN toDate DATE NOT NULL DEFAULT CURDATE()`);
      console.log('✅ Updated toDate');
    } catch (e) {
      console.log('⚠️  Could not update toDate:', e.message.substring(0, 50));
    }

    // Recreate foreign key
    console.log('\n📝 Restoring foreign keys...');
    try {
      await connection.query(`
        ALTER TABLE notifications ADD CONSTRAINT notifications_ibfk_3 
        FOREIGN KEY (related_leave_id) REFERENCES leaves(id) ON DELETE SET NULL
      `);
      console.log('✅ Restored notifications FK');
    } catch (e) {
      console.log('⚠️  FK already exists');
    }

    console.log('\n✅ Schema simplified successfully!');
    await connection.end();

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

simplifySchema();
