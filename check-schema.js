const mysql = require('mysql2/promise');

async function checkSchema() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'software20developer@2006',
    database: 'leave_system'
  });

  try {
    console.log('📋 Checking leaves table structure...\n');
    const [columns] = await connection.query(`DESC leaves`);
    console.log('Leaves table columns:');
    columns.forEach(col => {
      console.log(`  ${col.Field} - ${col.Type} (${col.Null === 'YES' ? 'NULL' : 'NOT NULL'})`);
    });

    console.log('\n📋 Checking notifications table structure...\n');
    const [notifColumns] = await connection.query(`DESC notifications`);
    console.log('Notifications table columns:');
    notifColumns.forEach(col => {
      console.log(`  ${col.Field} - ${col.Type} (${col.Null === 'YES' ? 'NULL' : 'NOT NULL'})`);
    });

    console.log('\n📋 Checking users table structure...\n');
    const [userColumns] = await connection.query(`DESC users`);
    console.log('Users table columns:');
    userColumns.forEach(col => {
      console.log(`  ${col.Field} - ${col.Type} (${col.Null === 'YES' ? 'NULL' : 'NOT NULL'})`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await connection.end();
  }
}

checkSchema();
