// Migration Script - Add Password Reset Fields
// Run this once to update the database schema

const mysql = require("mysql2/promise");

async function migrate() {
  const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "software20developer@2006",
    database: "leave_system"
  });

  try {
    console.log("🔄 Starting database migration...");

    // Add password reset columns if they don't exist
    const alterQueries = [
      // Add password reset code column
      `ALTER TABLE users ADD COLUMN password_reset_code VARCHAR(6) NULL DEFAULT NULL`,
      // Add password reset expiration
      `ALTER TABLE users ADD COLUMN password_reset_expires DATETIME NULL DEFAULT NULL`,
      // Add OTP column
      `ALTER TABLE users ADD COLUMN otp_code VARCHAR(6) NULL DEFAULT NULL`,
      // Add OTP expiration
      `ALTER TABLE users ADD COLUMN otp_expires DATETIME NULL DEFAULT NULL`,
      // Add phone number column (for OTP)
      `ALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL DEFAULT NULL`,
      // Add email column (for reset links)
      `ALTER TABLE users ADD COLUMN email VARCHAR(255) NULL DEFAULT NULL`
    ];

    for (const query of alterQueries) {
      try {
        await db.query(query);
        console.log("✅ Column added/exists:", query.substring(0, 50) + "...");
      } catch (err) {
        if (err.code === "ER_DUP_FIELDNAME") {
          console.log("⚠️  Column already exists (skipping)");
        } else {
          console.error("❌ Error:", err.message);
        }
      }
    }

    console.log("\n✅ Migration completed successfully!");
    console.log("\nNew columns added:");
    console.log("  • password_reset_code (VARCHAR 6)");
    console.log("  • password_reset_expires (DATETIME)");
    console.log("  • otp_code (VARCHAR 6)");
    console.log("  • otp_expires (DATETIME)");
    console.log("  • phone (VARCHAR 20)");
    console.log("  • email (VARCHAR 255)");

    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  } finally {
    await db.end();
  }
}

migrate();
