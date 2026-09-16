const mysql = require('mysql2/promise');

async function fixDatabase() {
  let connection;
  
  try {
    console.log('🔧 Fixing database schema...\n');
    
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'software20developer@2006',
      database: 'leave_system'
    });

    // Add fromDate and toDate columns if they don't exist
    console.log('📝 Adding fromDate/toDate columns...');
    try {
      await connection.query(`ALTER TABLE leaves ADD COLUMN fromDate DATE`);
      console.log('✅ Added fromDate column');
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log('✅ fromDate column already exists');
      } else {
        console.error('⚠️  Error:', e.message);
      }
    }

    try {
      await connection.query(`ALTER TABLE leaves ADD COLUMN toDate DATE`);
      console.log('✅ Added toDate column');
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log('✅ toDate column already exists');
      } else {
        console.error('⚠️  Error:', e.message);
      }
    }

    // Modify status ENUM to accept both lowercase and capitalized values
    console.log('\n📝 Updating status ENUM...');
    try {
      await connection.query(`
        ALTER TABLE leaves MODIFY status ENUM('pending', 'approved', 'rejected', 'forwarded', 'Approved', 'Rejected', 'forwarded')
      `);
      console.log('✅ Updated status ENUM');
    } catch (e) {
      console.error('⚠️  Note:', e.message);
    }

    // Add user_id column if missing  
    console.log('\n📝 Checking user_id column...');
    try {
      await connection.query(`ALTER TABLE leaves ADD COLUMN user_id INT`);
      console.log('✅ Added user_id column');
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log('✅ user_id column already exists');
      }
    }

    // Ensure leaves have needed columns for proper foreign keys
    console.log('\n📝 Ensuring all required columns exist...');
    
    const columnsToAdd = [
      { name: 'leave_id', type: 'INT AUTO_INCREMENT UNIQUE' },
      { name: 'forwarded_by', type: 'INT' },
      { name: 'forwarded_to', type: 'INT' },
      { name: 'rejected_by', type: 'INT' },
      { name: 'forwarded_at', type: 'DATETIME' },
      { name: 'rejected_at', type: 'DATETIME' },
    ];

    for (const col of columnsToAdd) {
      try {
        await connection.query(`ALTER TABLE leaves ADD COLUMN ${col.name} ${col.type}`);
        console.log(`✅ Added ${col.name} column`);
      } catch (e) {
        if (e.code === 'ER_DUP_FIELDNAME') {
          console.log(`✅ ${col.name} column already exists`);
        } else {
          console.error(`⚠️  ${col.name}:`, e.message);
        }
      }
    }

    console.log('\n✅ Database schema fixed successfully!');
    await connection.end();

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

fixDatabase();
