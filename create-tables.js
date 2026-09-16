const mysql = require('mysql2/promise');

async function createTables() {
  let connection;
  
  try {
    console.log('📦 Creating database tables...\n');
    
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'software20developer@2006',
      database: 'leave_system'
    });

    // CREATE USERS TABLE
    console.log('📝 Creating users table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        phone VARCHAR(20),
        role ENUM('student', 'faculty', 'hod', 'principal', 'admin') NOT NULL,
        full_name VARCHAR(100),
        department VARCHAR(100),
        password_reset_code VARCHAR(6),
        password_reset_expires DATETIME,
        otp_code VARCHAR(6),
        otp_expires DATETIME,
        otp VARCHAR(6),
        otp_attempts INT DEFAULT 0,
        is_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_username (username),
        INDEX idx_role (role),
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Users table created');

    // CREATE LEAVES TABLE
    console.log('📝 Creating leaves table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS leaves (
        id INT PRIMARY KEY AUTO_INCREMENT,
        leave_id INT,
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
        INDEX idx_dates (from_date, to_date)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Leaves table created');

    // CREATE NOTIFICATIONS TABLE
    console.log('📝 Creating notifications table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        actor_id INT,
        leave_id INT,
        title VARCHAR(255),
        message TEXT NOT NULL,
        notification_type VARCHAR(100),
        type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
        is_read BOOLEAN DEFAULT FALSE,
        related_leave_id INT,
        action_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (actor_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (leave_id) REFERENCES leaves(id) ON DELETE SET NULL,
        INDEX idx_user_id (user_id),
        INDEX idx_is_read (is_read),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Notifications table created');

    // CREATE ACTIVITY LOGS TABLE
    console.log('📝 Creating activity_log table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS activity_log (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        action VARCHAR(255) NOT NULL,
        table_name VARCHAR(100),
        record_id INT,
        old_values JSON,
        new_values JSON,
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_user_id (user_id),
        INDEX idx_action (action)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Activity log table created');

    console.log('\n✅ All tables created successfully!');
    await connection.end();

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

createTables();
