// Migration: Add OTP and mobile fields to users table
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'software20developer@2006',
  database: 'leave_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function migrate() {
  let conn;
  try {
    conn = await pool.getConnection();
    
    console.log('🔄 Starting migration...');
    
    // 1. Add mobile field
    try {
      await conn.query(`ALTER TABLE users ADD COLUMN mobile VARCHAR(15)`);
      console.log('✅ Added mobile field');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('ℹ️  Mobile field already exists');
      } else {
        throw err;
      }
    }
    
    // 2. Add OTP field
    try {
      await conn.query(`ALTER TABLE users ADD COLUMN otp VARCHAR(6)`);
      console.log('✅ Added otp field');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('ℹ️  OTP field already exists');
      } else {
        throw err;
      }
    }
    
    // 3. Add OTP expiration field
    try {
      await conn.query(`ALTER TABLE users ADD COLUMN otp_expires DATETIME`);
      console.log('✅ Added otp_expires field');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('ℹ️  OTP expires field already exists');
      } else {
        throw err;
      }
    }
    
    // 4. Add OTP attempts field
    try {
      await conn.query(`ALTER TABLE users ADD COLUMN otp_attempts INT DEFAULT 0`);
      console.log('✅ Added otp_attempts field');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('ℹ️  OTP attempts field already exists');
      } else {
        throw err;
      }
    }
    
    // 5. Add is_verified field
    try {
      await conn.query(`ALTER TABLE users ADD COLUMN is_verified BOOLEAN DEFAULT FALSE`);
      console.log('✅ Added is_verified field');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('ℹ️  is_verified field already exists');
      } else {
        throw err;
      }
    }
    
    // 6. Update existing test users with mobile and email
    const testUsers = [
      { username: 'student_001', email: 'student001@studyworld.edu', mobile: '9876543210' },
      { username: 'student_002', email: 'student002@studyworld.edu', mobile: '9876543211' },
      { username: 'faculty_001', email: 'faculty001@studyworld.edu', mobile: '9876543220' },
      { username: 'hod_001', email: 'hod001@studyworld.edu', mobile: '9876543230' },
      { username: 'principal_001', email: 'principal001@studyworld.edu', mobile: '9876543240' }
    ];
    
    for (const user of testUsers) {
      await conn.query(
        `UPDATE users SET email = ?, mobile = ?, is_verified = TRUE WHERE username = ?`,
        [user.email, user.mobile, user.username]
      );
    }
    console.log('✅ Updated test users with email and mobile');
    
    console.log('\n✨ Migration completed successfully!');
    console.log('\n📋 Updated Schema:');
    console.log('   - mobile: VARCHAR(15) - for phone number login');
    console.log('   - otp: VARCHAR(6) - for OTP storage');
    console.log('   - otp_expires: DATETIME - OTP expiration time');
    console.log('   - otp_attempts: INT - Failed OTP attempts');
    console.log('   - is_verified: BOOLEAN - User verification status');
    
  } catch (err) {
    console.error('❌ Migration error:', err.message);
  } finally {
    await pool.end();
  }
}

migrate();
