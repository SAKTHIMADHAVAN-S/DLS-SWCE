const mysql = require('mysql2/promise');

async function fixEnum() {
  let connection;
  
  try {
    console.log('🔧 Fixing status ENUM...\n');
    
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'software20developer@2006',
      database: 'leave_system'
    });

    // Drop and recreate the leaves table to fix the ENUM
    console.log('📝 Recreating leaves table with correct ENUM values...');
    
    // First, backup the data
    await connection.query(`CREATE TABLE leaves_backup AS SELECT * FROM leaves`);
    console.log('✅ Backed up leave data');

    // Drop the current table
    await connection.query(`DROP TABLE IF EXISTS leaves`);
    console.log('✅ Dropped old leaves table');

    // Recreate with correct ENUM (lowercase values only)
    await connection.query(`
      CREATE TABLE leaves (
        id INT PRIMARY KEY AUTO_INCREMENT,
        leave_id INT UNIQUE,
        user_id INT,
        username VARCHAR(50),
        from_date DATE NOT NULL,
        fromDate DATE,
        to_date DATE NOT NULL,
        toDate DATE,
        reason TEXT NOT NULL,
        department VARCHAR(100),
        status ENUM('pending', 'approved', 'rejected', 'forwarded') DEFAULT 'pending',
        approved_by INT,
        rejected_by INT,
        forwarded_by INT,
        forwarded_to INT,
        rejection_reason TEXT,
        approved_at DATETIME,
        rejected_at DATETIME,
        forwarded_at DATETIME,
        current_approval_stage VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (rejected_by) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (forwarded_by) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (forwarded_to) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_user_id (user_id),
        INDEX idx_username (username),
        INDEX idx_status (status),
        INDEX idx_dates (fromDate, toDate)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Created new leaves table');

    // Restore data (lowercase the status)
    await connection.query(`
      INSERT INTO leaves SELECT 
        id, leave_id, user_id, username, from_date, fromDate, to_date, toDate, 
        reason, department, 
        LOWER(status) as status,
        approved_by, rejected_by, forwarded_by, forwarded_to,
        rejection_reason, approved_at, rejected_at, forwarded_at,
        current_approval_stage, created_at, updated_at
      FROM leaves_backup
    `);
    console.log('✅ Restored leave data');

    // Drop backup
    await connection.query(`DROP TABLE leaves_backup`);
    console.log('✅ Cleaned up backup table');

    console.log('\n✅ Database schema fixed successfully!');
    await connection.end();

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

fixEnum();
