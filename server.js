require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // ✅ JWT authentication
const bcrypt = require("bcrypt"); // ✅ Password hashing
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const NotificationService = require("./backend/services/NotificationService"); // ✅ Notifications

const app = express();
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));
app.use(cors());
app.use(bodyParser.json());

const SMTP_ENABLED = Boolean(process.env.EMAIL_USER && (process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD));
const mailTransporter = SMTP_ENABLED
  ? nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 465,
      secure: process.env.EMAIL_SECURE !== "false",
      auth: {
        user: process.env.EMAIL_USER,
        pass: (process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD || "").replace(/\s+/g, ""),
      },
    })
  : null;

async function sendEmail(to, subject, html, attachments = [], from = process.env.EMAIL_FROM || (process.env.EMAIL_USER ? `"STUDY WORLD College of Engineering" <${process.env.EMAIL_USER}>` : null)) {
  if (!mailTransporter) {
    throw new Error("SMTP_NOT_CONFIGURED");
  }

  return mailTransporter.sendMail({
    from: from || process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    html,
    attachments,
  });
}

// Lightweight health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() });
});

// Real-time Database Status API
app.get('/api/db-status', async (req, res) => {
  try {
    const [users] = await db.query("SELECT COUNT(*) as count FROM users");
    let leavesCount = 0;
    try {
      const [leaves] = await db.query("SELECT COUNT(*) as count FROM leaves");
      leavesCount = leaves[0]?.count || 0;
    } catch (_) {}
    res.json({
      status: 'connected',
      database: 'leave_system',
      host: 'localhost',
      usersCount: users[0]?.count || 0,
      leavesCount: leavesCount,
      realtime: true,
      timestamp: Date.now()
    });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'leave_system', message: err.message });
  }
});
const SECRET_KEY = "your_secret_key"; // change to strong secret

// MySQL connection pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "software20developer@2006",
  database: "leave_system"
});

// Initialize Notification Service
const notificationService = new NotificationService(db);

// ------------------- LOGIN -------------------

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const identifier = String(username || "").trim();

  if (!identifier || !password) {
    return res.status(400).json({ message: "Username/email and password are required" });
  }

  console.log("👉 [LOGIN] Attempt - Identifier:", identifier);

  try {
    console.log("🔍 [LOGIN] Querying database for identifier:", identifier);
    const [rows] = await db.query(
      "SELECT * FROM users WHERE LOWER(username) = LOWER(?) OR LOWER(email) = LOWER(?) LIMIT 1",
      [identifier, identifier]
    );

    if (rows.length === 0) {
      console.log("❌ [LOGIN] User not found:", identifier);
      return res.status(400).json({ message: "User not found" });
    }

    const user = rows[0];
    console.log("✅ [LOGIN] User found:", user.username, "| Role:", user.role, "| ID:", user.id);

    if (!user.password) {
      console.error("💥 [LOGIN] ERROR - User password is NULL/undefined");
      return res.status(500).json({ message: "Server error: password field missing" });
    }

    console.log("🔐 [LOGIN] Comparing password (bcrypt)...");
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("❌ [LOGIN] Password mismatch for user:", user.username);
      return res.status(401).json({ message: "Invalid password" });
    }

    console.log("🔑 [LOGIN] Generating JWT token for user:", user.username);
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    console.log("✅ [LOGIN] SUCCESS - User:", user.username, "| Role:", user.role);
    res.json({ token, role: user.role, username: user.username, userId: user.id });
  } catch (err) {
    console.error("💥 [LOGIN] ERROR - Exception caught:", err.message);
    console.error("Stack trace:", err.stack);
    res.status(500).json({ message: "Server error. Check logs for details: " + err.message });
  }
});

// ================= NEW OTP-BASED AUTHENTICATION SYSTEM =================

// 1. SEND OTP - Generate and send OTP to email/mobile
app.post("/send-otp", async (req, res) => {
  const rawIdentifier = String(req.body.email || req.body.identifier || "").trim();
  const firstName = String(req.body.firstName || req.body.first_name || "").trim();
  const lastName = String(req.body.lastName || req.body.last_name || "").trim();
  const fullName = String(req.body.fullName || req.body.full_name || req.body.display_name || (firstName && lastName ? `${firstName} ${lastName}` : "")).trim();
  const requestedRole = String(req.body.role || "student").toLowerCase();
  const validRoles = ["student", "faculty", "hod", "principal", "admin"];
  const userRole = validRoles.includes(requestedRole) ? requestedRole : "student";

  try {
    if (!rawIdentifier) {
      return res.status(400).json({ ok: false, found: false, message: "Please provide an email address or username" });
    }

    // Look up user by email, username, or phone
    let [users] = await db.query(
      "SELECT * FROM users WHERE email = ? OR username = ? OR phone = ?",
      [rawIdentifier, rawIdentifier, rawIdentifier]
    );

    let user;
    let isNewUser = false;

    if (users.length === 0) {
      // Validate email format if user doesn't exist yet
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(rawIdentifier)) {
        return res.status(404).json({
          ok: false,
          found: false,
          message: "User not found. Please enter a valid email address or registered username."
        });
      }

      // ✅ AUTO-REGISTER: Create new user with this email
      console.log(`✨ [OTP] Auto-registering new user with email: ${rawIdentifier} as ${userRole}`);
      const baseUsername = rawIdentifier.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_");
      const username = baseUsername + "_" + Math.floor(1000 + Math.random() * 9000);
      const tempPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10);

      try {
        await db.query(
          `INSERT INTO users (username, password, email, phone, role) 
           VALUES (?, ?, ?, ?, ?)`,
          [
            username,
            tempPassword,
            rawIdentifier,
            "0000000000",
            userRole
          ]
        );

        console.log(`✅ [OTP] New user created: ${username} with email: ${rawIdentifier}`);
        isNewUser = true;
        [users] = await db.query("SELECT * FROM users WHERE email = ?", [rawIdentifier]);
        user = users[0];
      } catch (insertErr) {
        console.error(`❌ [OTP] Failed to create user:`, insertErr.message);
        return res.status(500).json({ ok: false, found: false, message: "Failed to register email: " + insertErr.message });
      }
    } else {
      user = users[0];
    }

    const destinationEmail = user.email || (rawIdentifier.includes("@") ? rawIdentifier : null);
    if (!destinationEmail) {
      return res.status(400).json({
        ok: false,
        found: true,
        message: "No email registered for this account. Please contact the administrator."
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes validity

    await db.query(
      "UPDATE users SET otp = ?, otp_expires = ?, otp_attempts = 0 WHERE id = ?",
      [otp, otpExpires, user.id]
    );

    let emailSent = false;
    let emailError = null;

    if (mailTransporter) {
      try {
        const displayName = fullName || user.full_name || user.username || "Student / Staff";
        const safeDisplayName = escapeHtml(displayName);

        // Safe logo attachment
        const logoCandidates = [
          path.join(__dirname, "logo.png"),
          path.join(__dirname, "frontend", "login", "swce_logo.png"),
          path.join(__dirname, "frontend", "login", "logo.png")
        ];
        const existingLogo = logoCandidates.find(p => fs.existsSync(p));
        const attachments = existingLogo
          ? [{ filename: "logo.png", path: existingLogo, cid: "college_logo" }]
          : [];

        const logoHtml = existingLogo
          ? '<img src="cid:college_logo" width="100" style="object-fit:contain; display:block; margin:0 auto 12px;"/>'
          : '<h1 style="color:#0A2D6A; margin:0 0 10px;">🎓 SWCE</h1>';

        const emailMessage = `
          <div style="font-family:Inter,Segoe UI,Arial,sans-serif; max-width:550px; margin:auto; padding:24px; border:1px solid #e2e8f0; border-radius:14px; background:#ffffff; color:#1e293b;">
            <div style="text-align:center; padding-bottom:16px; border-bottom:1px solid #e2e8f0;">
              ${logoHtml}
              <h2 style="color:#0A2D6A; margin:0; font-size:20px;">STUDY WORLD College of Engineering</h2>
              <p style="color:#64748b; font-size:12px; margin:4px 0 0;">Coimbatore · Digital Leave Letter System</p>
            </div>
            <div style="padding:20px 0;">
              <p style="font-size:15px; margin:0 0 12px;">Dear <b>${safeDisplayName}</b>,</p>
              <p style="font-size:14px; color:#475569; margin:0 0 20px;">Your One-Time Password (OTP) for secure ERP portal login is:</p>
              <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:18px; text-align:center; margin:16px 0;">
                <span style="font-size:32px; font-weight:800; letter-spacing:8px; color:#1d4ed8; font-family:monospace;">${otp}</span>
                <p style="font-size:12px; color:#64748b; margin:8px 0 0;">Valid for 2 minutes · Do not share this OTP with anyone.</p>
              </div>
              <p style="font-size:13px; color:#64748b; margin:16px 0 0;">If you did not request this OTP, you can safely ignore this email.</p>
            </div>
            <div style="border-top:1px solid #e2e8f0; padding-top:14px; text-align:center; font-size:11px; color:#94a3b8;">
              Studyworld College of Engineering © 2026 | ERP Portal Security
            </div>
          </div>
        `;

        await sendEmail(
          destinationEmail,
          "SWCE ERP - Your Login OTP Code",
          emailMessage,
          attachments,
          process.env.EMAIL_FROM || (process.env.EMAIL_USER ? `Studyworld College <${process.env.EMAIL_USER}>` : null)
        );
        emailSent = true;
        console.log(`📧 [OTP] Email sent successfully to ${destinationEmail} (${user.username})`);
      } catch (error) {
        emailError = error.message;
        console.error(`❌ [OTP] Email send failed for ${destinationEmail}:`, emailError);
      }
    } else {
      console.warn("⚠️ SMTP not configured. OTP email not sent.");
    }

    const isLocalDebugMode = !mailTransporter || process.env.NODE_ENV === "development" || process.env.ALLOW_OTP_DEBUG === "true";
    const maskedContact = destinationEmail.length > 5
      ? destinationEmail.substring(0, 3) + "***@" + destinationEmail.split("@")[1]
      : destinationEmail;

    return res.status(emailSent || isLocalDebugMode ? 200 : 502).json({
      ok: emailSent || isLocalDebugMode,
      found: true,
      message: emailSent ? "OTP sent successfully to your email" : "SMTP email delivery failed",
      emailSent: emailSent || isLocalDebugMode,
      emailError,
      isNewUser,
      userCreated: isNewUser ? user.username : undefined,
      contact: maskedContact,
      email: destinationEmail,
      username: user.username,
      role: user.role,
      userId: user.id,
      otp: isLocalDebugMode ? otp : undefined
    });
  } catch (err) {
    console.error("❌ [OTP] Error:", err.message);
    res.status(500).json({ ok: false, found: false, message: "Error sending OTP: " + err.message });
  }
});

app.post("/login-otp", async (req, res) => {
  const rawIdentifier = String(req.body.email || req.body.identifier || "").trim();
  const otp = String(req.body.otp || "").trim();

  try {
    if (!rawIdentifier || !otp) {
      return res.status(400).json({ message: "Email or username and OTP are required" });
    }

    const [users] = await db.query(
      "SELECT * FROM users WHERE (email = ? OR username = ? OR phone = ?) AND otp = ? AND otp_expires > NOW()",
      [rawIdentifier, rawIdentifier, rawIdentifier, otp]
    );

    if (users.length === 0) {
      await db.query(
        "UPDATE users SET otp_attempts = otp_attempts + 1 WHERE email = ? OR username = ?",
        [rawIdentifier, rawIdentifier]
      );
      return res.status(400).json({ message: "Invalid or expired OTP. Please check the code or request a new one." });
    }

    const user = users[0];
    if (user.otp_attempts >= 5) {
      return res.status(429).json({ message: "Too many failed attempts. Please request a new OTP." });
    }

    // Clear OTP upon successful login
    await db.query(
      "UPDATE users SET otp = NULL, otp_expires = NULL, otp_attempts = 0, is_verified = TRUE WHERE id = ?",
      [user.id]
    );

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "8h" }
    );

    console.log(`✅ [LOGIN-OTP] Verified login for ${user.username} (${user.email}) - Role: ${user.role}`);

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      username: user.username,
      userId: user.id,
      email: user.email,
      department: user.department || "",
      fullName: user.full_name || user.username
    });
  } catch (err) {
    console.error("❌ [LOGIN-OTP] Error:", err.message);
    res.status(500).json({ message: "Error verifying OTP: " + err.message });
  }
});

// 2. VERIFY OTP - Verify OTP and return temp token for password setting
app.post("/verify-otp", async (req, res) => {
  const { userId, otp } = req.body;
  
  try {
    if (!userId || !otp) {
      return res.status(400).json({ message: "User ID and OTP required" });
    }

    const [users] = await db.query(
      "SELECT * FROM users WHERE id = ? AND otp = ? AND otp_expires > NOW()",
      [userId, otp]
    );
    
    if (users.length === 0) {
      // Increment attempts
      await db.query(
        "UPDATE users SET otp_attempts = otp_attempts + 1 WHERE id = ?",
        [userId]
      );
      
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = users[0];
    
    // Check if too many attempts
    if (user.otp_attempts >= 5) {
      return res.status(429).json({ message: "Too many failed attempts. Request new OTP" });
    }

    // Clear OTP and set verified flag
    await db.query(
      "UPDATE users SET otp = NULL, otp_expires = NULL, otp_attempts = 0, is_verified = TRUE WHERE id = ?",
      [user.id]
    );
    
    // Generate temp token for password setting (valid for 15 minutes)
    const tempToken = jwt.sign(
      { id: user.id, username: user.username, purpose: 'set-password' },
      SECRET_KEY,
      { expiresIn: "15m" }
    );
    
    console.log(`✅ [OTP] Verified for ${user.username}`);
    
    res.json({
      message: "OTP verified successfully",
      tempToken: tempToken,
      username: user.username,
      needsPassword: !user.password
    });
  } catch (err) {
    console.error("❌ [VERIFY OTP] Error:", err.message);
    res.status(500).json({ message: "Error verifying OTP" });
  }
});

// 3. SET PASSWORD - Set/change password after OTP verification
app.post("/set-password", async (req, res) => {
  const { tempToken, newPassword, confirmPassword } = req.body;
  
  try {
    if (!tempToken || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Verify temp token
    const decoded = jwt.verify(tempToken, SECRET_KEY);
    
    if (decoded.purpose !== 'set-password') {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password in database
    await db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, decoded.id]
    );
    
    console.log(`🔑 [SET PASSWORD] Password set for ${decoded.username}`);
    
    res.json({ message: "Password set successfully" });
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    console.error("❌ [SET PASSWORD] Error:", err.message);
    res.status(500).json({ message: "Error setting password" });
  }
});

// 4. FORGOT USERNAME - Recover username by email/mobile
app.post("/forgot-username", async (req, res) => {
  const { email, mobile } = req.body;
  
  try {
    if (!email && !mobile) {
      return res.status(400).json({ message: "Please provide email or mobile number" });
    }

    const query = email 
      ? "SELECT * FROM users WHERE email = ?" 
      : "SELECT * FROM users WHERE mobile = ?";
    const [users] = await db.query(query, [email || mobile]);
    
    if (users.length === 0) {
      return res.json({ message: "If account exists, username will be sent", found: false });
    }

    const user = users[0];
    
    // In production, send via email or SMS
    console.log(`📧 [FORGOT USERNAME] Username for ${user.email || user.mobile}: ${user.username}`);
    
    res.json({
      message: "Username sent to your registered contact",
      found: true,
      contact: email ? email.substring(0, 3) + "***@..." : mobile.substring(0, 3) + "***",
      username: process.env.NODE_ENV === 'development' ? user.username : undefined
    });
  } catch (err) {
    console.error("❌ [FORGOT USERNAME] Error:", err.message);
    res.status(500).json({ message: "Error processing request" });
  }
});

// 5. FORGOT PASSWORD - Send OTP to reset password
app.post("/forgot-password", async (req, res) => {
  const { identifier } = req.body;
  
  try {
    if (!identifier) {
      return res.status(400).json({ message: "Please provide username, email, or mobile" });
    }

    const [users] = await db.query(
      "SELECT * FROM users WHERE username = ? OR email = ? OR mobile = ?",
      [identifier, identifier, identifier]
    );
    
    if (users.length === 0) {
      return res.json({ message: "If user exists, password reset OTP will be sent", found: false });
    }

    const user = users[0];
    
    // Generate 6-digit OTP for password reset
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    
    await db.query(
      "UPDATE users SET otp = ?, otp_expires = ?, otp_attempts = 0 WHERE id = ?",
      [otp, otpExpires, user.id]
    );
    
    console.log(`🔐 [FORGOT PASSWORD] OTP for ${user.username}: ${otp}`);
    
    res.json({
      message: "Password reset OTP sent",
      found: true,
      contact: user.email ? user.email.substring(0, 3) + "***@..." : user.mobile.substring(0, 3) + "***",
      otp: process.env.NODE_ENV === 'development' ? otp : undefined,
      userId: user.id
    });
  } catch (err) {
    console.error("❌ [FORGOT PASSWORD] Error:", err.message);
    res.status(500).json({ message: "Error processing request" });
  }
});

// 6. RESET PASSWORD VIA OTP - Set new password after OTP verification
app.post("/reset-password-otp", async (req, res) => {
  const { userId, otp, newPassword, confirmPassword } = req.body;
  
  try {
    if (!userId || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Verify OTP
    const [users] = await db.query(
      "SELECT * FROM users WHERE id = ? AND otp = ? AND otp_expires > NOW()",
      [userId, otp]
    );
    
    if (users.length === 0) {
      await db.query("UPDATE users SET otp_attempts = otp_attempts + 1 WHERE id = ?", [userId]);
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = users[0];
    
    if (user.otp_attempts >= 5) {
      return res.status(429).json({ message: "Too many failed attempts. Request new OTP" });
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await db.query(
      "UPDATE users SET password = ?, otp = NULL, otp_expires = NULL, otp_attempts = 0 WHERE id = ?",
      [hashedPassword, user.id]
    );
    
    console.log(`✅ [RESET PASSWORD] Password reset for ${user.username}`);
    
    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("❌ [RESET PASSWORD OTP] Error:", err.message);
    res.status(500).json({ message: "Error resetting password" });
  }
});

// ================= END OTP SYSTEM =================

// ------------------- PASSWORD RESET ENDPOINTS -------------------

// REQUEST PASSWORD RESET VIA EMAIL
app.post("/request-password-reset-email", async (req, res) => {
  const { username } = req.body;
  
  try {
    const [users] = await db.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, username]);
    
    if (users.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = users[0];

    // Generate 6-digit reset code
    const resetCode = Math.random().toString().substr(2, 6);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store reset code in database
    await db.query(
      "UPDATE users SET password_reset_code = ?, password_reset_expires = ? WHERE id = ?",
      [resetCode, expiresAt, user.id]
    );

    let emailSent = false;
    let emailError = null;

    if (mailTransporter && user.email) {
      try {
        await sendEmail(
          user.email,
          "SWCE Leave System - Password Reset Code",
          `<p>Hello ${user.username || "User"},</p>
           <p>Your password reset code is <strong>${resetCode}</strong>. It expires in 15 minutes.</p>
           <p>If you did not request this, please ignore this message.</p>`
        );
        emailSent = true;
        console.log(`📧 [PASSWORD RESET] Email sent to ${user.email}`);
      } catch (error) {
        emailError = error.message;
        console.error(`❌ [PASSWORD RESET] Email failed for ${user.email}:`, emailError);
      }
    } else {
      console.warn("⚠️ SMTP not configured or user has no email. Password reset email not sent.");
    }

    res.json({
      message: emailSent ? "Reset code sent to your email." : "Reset code generated; email delivery disabled or failed.",
      emailSent,
      emailError,
      code: process.env.NODE_ENV === 'development' ? resetCode : undefined,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing request" });
  }
});

// RESET PASSWORD WITH EMAIL CODE
app.post("/reset-password-email", async (req, res) => {
  const { username, token, password } = req.body;

  try {
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const [users] = await db.query(
      "SELECT * FROM users WHERE username = ? AND password_reset_code = ? AND password_reset_expires > NOW()",
      [username, token]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid or expired reset code" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear reset code
    await db.query(
      "UPDATE users SET password = ?, password_reset_code = NULL, password_reset_expires = NULL WHERE username = ?",
      [hashedPassword, username]
    );

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error resetting password" });
  }
});

// REQUEST PASSWORD RESET VIA PHONE (OTP)
app.post("/request-password-reset-phone", async (req, res) => {
  const { username, phone } = req.body;

  try {
    const [users] = await db.query(
      "SELECT * FROM users WHERE username = ? AND phone = ?",
      [username, phone]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: "Username or phone number not found" });
    }

    // Generate 6-digit OTP
    const otp = Math.random().toString().substr(2, 6);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in database
    await db.query(
      "UPDATE users SET otp_code = ?, otp_expires = ? WHERE username = ?",
      [otp, expiresAt, username]
    );

    // In production, send SMS via Twilio
    console.log(`📱 [OTP] OTP for ${username}: ${otp}`);

    res.json({ message: "OTP sent to your phone number" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing request" });
  }
});

// RESET PASSWORD WITH OTP
app.post("/reset-password-otp", async (req, res) => {
  const { username, otp, password } = req.body;

  try {
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const [users] = await db.query(
      "SELECT * FROM users WHERE username = ? AND otp_code = ? AND otp_expires > NOW()",
      [username, otp]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear OTP
    await db.query(
      "UPDATE users SET password = ?, otp_code = NULL, otp_expires = NULL WHERE username = ?",
      [hashedPassword, username]
    );

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error resetting password" });
  }
});

  

// ------------------- AUTH MIDDLEWARE -------------------
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// ------------------- APPLY LEAVE -------------------
app.post("/apply-leave", authenticateToken, async (req, res) => {
  const { fromDate, toDate, reason, department } = req.body;
  const studentId = req.user.id;
  const studentUsername = req.user.username;

  try {
    console.log(`📝 [LEAVE] Student ${studentUsername} applying for leave from ${fromDate} to ${toDate}`);
    
    // Insert leave request
    const [result] = await db.query(
      "INSERT INTO leaves (username, fromDate, toDate, reason, status, department, current_approval_stage) VALUES (?, ?, ?, ?, 'pending', ?, 'faculty')",
      [studentUsername, fromDate, toDate, reason, department || "Engineering"]
    );

    const leaveId = result.insertId;
    console.log(`✅ [LEAVE] Leave request created with ID: ${leaveId}`);

    // Log activity
    await notificationService.logActivity(studentId, 'leave_applied', 'leaves', leaveId, {
      fromDate, toDate, reason, department
    });

    // Create notification for student
    await notificationService.createNotification(
      studentId, null, leaveId, 'leave_submitted',
      '📋 Leave Request Submitted',
      `Your leave request from ${fromDate} to ${toDate} has been submitted for approval.`,
      `/dashboard?leave=${leaveId}`
    );

    // Notify faculty members in the department
    // Faculty will get notification to review and approve/reject
    
    res.status(201).json({
      message: "Leave request submitted successfully!",
      leaveId: leaveId
    });
  } catch (err) {
    console.error('❌ [LEAVE ERROR]', err);
    res.status(500).json({ message: "Error submitting leave: " + err.message });
  }
});

// ------------------- NOTIFICATIONS -------------------

// GET USER NOTIFICATIONS
app.get("/notifications", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = req.query.limit || 20;
    const notifications = await notificationService.getUserNotifications(userId, limit);
    const unreadCount = await notificationService.getUnreadCount(userId);
    
    res.json({ notifications, unreadCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching notifications" });
  }
});

// MARK NOTIFICATION AS READ
app.put("/notifications/:id/read", authenticateToken, async (req, res) => {
  try {
    await notificationService.markAsRead(req.params.id);
    res.json({ message: "Notification marked as read" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error marking notification" });
  }
});

// ------------------- ACTIVITY LOG & ADMIN ENDPOINTS -------------------

// GET ACTIVITY LOG (ADMIN ONLY)
app.get("/activity-log", authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const limit = req.query.limit || 50;
    const offset = req.query.offset || 0;
    const filters = {
      userId: req.query.userId,
      action: req.query.action,
      entityType: req.query.entityType
    };

    const logs = await notificationService.getActivityLog(filters, limit, offset);
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching activity log" });
  }
});

// GET ALL USERS (ADMIN ONLY)
app.get("/users", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    const [users] = await db.query(`
      SELECT id, username, role, department, created_at
      FROM users
      ORDER BY created_at DESC
    `);

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// GET ANALYTICS (ADMIN & HOD)
app.get("/analytics", authenticateToken, async (req, res) => {
  try {
    if (!['admin', 'hod', 'principal'].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Leave statistics
    const [stats] = await db.query(`
      SELECT 
        status,
        COUNT(*) as count,
        MONTH(fromDate) as month,
        YEAR(fromDate) as year
      FROM leaves
      GROUP BY status, YEAR(fromDate), MONTH(fromDate)
      ORDER BY year DESC, month DESC
    `);

    // Approval rates
    const [approvalRates] = await db.query(`
      SELECT 
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'forwarded' THEN 1 END) as forwarded,
        COUNT(*) as total
      FROM leaves
    `);

    res.json({
      statistics: stats,
      approvalRates: approvalRates[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching analytics" });
  }
});

// GET ALL LEAVES (ADMIN/HOD/PRINCIPAL)
// GET PENDING LEAVES FOR APPROVAL
app.get("/pending-leaves", authenticateToken, async (req, res) => {
  try {
    const role = req.user.role;
    let leaves = [];

    if (role === 'faculty') {
      // Faculty sees: pending leaves at faculty stage
      const [rows] = await db.query(
        "SELECT * FROM leaves WHERE status = 'pending' AND current_approval_stage = 'faculty' ORDER BY created_at DESC LIMIT 50"
      );
      leaves = rows;
    } else if (role === 'hod') {
      // HOD sees: leaves at HOD stage
      const [rows] = await db.query(
        "SELECT * FROM leaves WHERE current_approval_stage = 'hod' AND status = 'forwarded' ORDER BY created_at DESC LIMIT 50"
      );
      leaves = rows;
    } else if (role === 'principal') {
      // Principal sees: leaves at Principal stage
      const [rows] = await db.query(
        "SELECT * FROM leaves WHERE current_approval_stage = 'principal' AND status = 'forwarded' ORDER BY created_at DESC LIMIT 50"
      );
      leaves = rows;
    } else if (role === 'admin') {
      // Admin sees all pending/forwarded
      const [rows] = await db.query(
        "SELECT * FROM leaves WHERE status = 'pending' OR status = 'forwarded' ORDER BY created_at DESC LIMIT 50"
      );
      leaves = rows;
    } else if (role === 'student') {
      return res.status(403).json({ message: "Students cannot view pending leaves" });
    }

    res.json({ leaves });
  } catch (err) {
    console.error('❌ [PENDING LEAVES ERROR]', err.message);
    res.status(500).json({ message: "Error fetching pending leaves: " + err.message });
  }
});

// ------------------- ALL LEAVES -------------------
app.get("/all-leaves", authenticateToken, async (req, res) => {
  try {
    const status = req.query.status || '';
    let query = "SELECT * FROM leaves WHERE 1=1";
    let params = [];

    if (status) {
      query += ` AND LOWER(status) = ?`;
      params.push(status.toLowerCase());
    }

    query += " ORDER BY created_at DESC LIMIT 100";

    const [rows] = await db.query(query, params);
    res.json({ leaves: rows });
  } catch (err) {
    console.error('❌ [ALL LEAVES ERROR]', err.message);
    res.status(500).json({ message: "Error fetching leaves: " + err.message });
  }
});

// ------------------- LEAVE STATUS -------------------
app.get("/leave-status", authenticateToken, async (req, res) => {
  const studentUsername = req.user.username;
  try {
    const [rows] = await db.query("SELECT * FROM leaves WHERE username = ? ORDER BY created_at DESC", [studentUsername]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching leave status" });
  }
});

// ------------------- LEAVE APPROVAL WORKFLOW -------------------

// APPROVE LEAVE
app.put("/approve-leave/:id", authenticateToken, async (req, res) => {
  const leaveId = req.params.id;
  const approverId = req.user.id;
  const approverName = req.user.username;
  const { comments, approvalDetails } = req.body;
  
  try {
    console.log(`✅ [APPROVE LEAVE] Leave ID: ${leaveId}, Approver: ${approverName}`);
    
    // Get leave details
    const [leaves] = await db.query("SELECT * FROM leaves WHERE leave_id = ?", [leaveId]);
    if (leaves.length === 0) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    const leave = leaves[0];
    const { username: studentUsername, fromDate, toDate, reason } = leave;

    // Get student details
    const [students] = await db.query("SELECT * FROM users WHERE username = ?", [studentUsername]);
    const student = students[0];
    const studentEmail = student.email || 'student@example.com';

    // Update leave status to approved
    await db.query(
      "UPDATE leaves SET status = 'approved', approved_by = ?, approved_at = NOW() WHERE leave_id = ?",
      [approverId, leaveId]
    );

    // Log activity
    await notificationService.logActivity(approverId, 'leave_approved', 'leave', leaveId, {
      studentUsername,
      comments,
      approvalDetails
    });

    // Create notification for student
    await notificationService.createNotification(
      student.id,
      approverId,
      leaveId,
      'leave_approved',
      '✅ Leave Request Approved',
      `Your leave request from ${new Date(fromDate).toLocaleDateString()} to ${new Date(toDate).toLocaleDateString()} has been approved by ${approverName}.`,
      `/dashboard?leave=${leaveId}`
    );

    // Notify admin
    const [admins] = await db.query("SELECT id FROM users WHERE role = 'admin'");
    for (const admin of admins) {
      await notificationService.createNotification(
        admin.id,
        approverId,
        leaveId,
        'LEAVE_APPROVED',
        '✅ Leave Approved',
        `${studentUsername}'s leave request has been approved by ${approverName}.`
      );
    }

    res.json({ message: "Leave approved successfully", status: 'approved' });
  } catch (err) {
    console.error('❌ [APPROVE LEAVE ERROR]', err.message);
    res.status(500).json({ message: "Error approving leave: " + err.message });
  }
});

// REJECT LEAVE
app.put("/reject-leave/:id", authenticateToken, async (req, res) => {
  const leaveId = req.params.id;
  const rejecterId = req.user.id;
  const rejectorName = req.user.username;
  const { rejectionReason } = req.body;
  
  try {
    console.log(`❌ [REJECT LEAVE] Leave ID: ${leaveId}, Rejector: ${rejectorName}`);
    
    // Get leave details
    const [leaves] = await db.query("SELECT * FROM leaves WHERE leave_id = ?", [leaveId]);
    if (leaves.length === 0) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    const leave = leaves[0];
    const { username: studentUsername, fromDate, toDate, reason } = leave;

    // Get student details
    const [students] = await db.query("SELECT * FROM users WHERE username = ?", [studentUsername]);
    const student = students[0];
    const studentEmail = student.email || 'student@example.com';

    // Update leave status to rejected
    await db.query(
      "UPDATE leaves SET status = 'rejected', rejected_by = ?, rejected_at = NOW(), rejection_reason = ? WHERE leave_id = ?",
      [rejecterId, rejectionReason || '', leaveId]
    );

    // Log activity
    await notificationService.logActivity(rejecterId, 'leave_rejected', 'leave', leaveId, {
      studentUsername,
      rejectionReason
    });

    // Send notifications
    await notificationService.notifyLeaveRejected(
      leaveId,
      student.id,
      studentUsername,
      new Date(fromDate).toLocaleDateString(),
      new Date(toDate).toLocaleDateString(),
      rejectorName,
      studentEmail,
      reason,
      rejectionReason
    );

    // Notify admin
    const [admins] = await db.query("SELECT id FROM users WHERE role = 'admin'");
    for (const admin of admins) {
      await notificationService.createNotification(
        admin.id,
        rejecterId,
        leaveId,
        'LEAVE_REJECTED',
        '❌ Leave Rejected',
        `${studentUsername}'s leave request has been rejected by ${rejectorName}.`
      );
    }

    res.json({ message: "Leave rejected successfully", status: 'rejected' });
  } catch (err) {
    console.error('❌ [REJECT LEAVE ERROR]', err.message);
    res.status(500).json({ message: "Error rejecting leave: " + err.message });
  }
});

// FORWARD LEAVE TO NEXT APPROVER
app.put("/forward-leave/:id", authenticateToken, async (req, res) => {
  const leaveId = req.params.id;
  const forwarderId = req.user.id;
  const forwarderRole = req.user.role;
  const forwarderName = req.user.username;
  const { forwardToRole, forwardComments } = req.body;
  
  try {
    console.log(`📤 [FORWARD LEAVE] Leave ID: ${leaveId}, From: ${forwarderRole}, To: ${forwardToRole}`);
    
    // Get leave details
    const [leaves] = await db.query("SELECT * FROM leaves WHERE leave_id = ?", [leaveId]);
    if (leaves.length === 0) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    const leave = leaves[0];
    const { username: studentUsername, fromDate, toDate, reason } = leave;

    // Validate the forwarding hierarchy
    const validForwards = {
      'faculty': 'hod',
      'hod': 'principal',
      'principal': null // Principal cannot forward
    };

    if (forwarderRole === 'principal') {
      return res.status(400).json({ message: "Principal cannot forward leave requests" });
    }

    const expectedForwardRole = validForwards[forwarderRole];
    if (forwardToRole !== expectedForwardRole) {
      return res.status(400).json({ 
        message: `Invalid forward hierarchy. ${forwarderRole} can only forward to ${expectedForwardRole}` 
      });
    }

    // Get next approvers based on role
    const [approvers] = await db.query(
      "SELECT id, username FROM users WHERE role = ?",
      [forwardToRole]
    );

    if (approvers.length === 0) {
      return res.status(400).json({ message: `No ${forwardToRole} found in the system` });
    }

    const nextApproverIds = approvers.map(a => a.id);

    // Update leave status to forwarded and set next approval stage
    const nextApprovalStage = forwardToRole === 'hod' ? 'hod' : (forwardToRole === 'principal' ? 'principal' : 'faculty');
    await db.query(
      "UPDATE leaves SET status = 'forwarded', forwarded_by = ?, forwarded_to = ?, forwarded_at = NOW(), current_approval_stage = ? WHERE leave_id = ?",
      [forwarderId, nextApproverIds[0], nextApprovalStage, leaveId]
    );

    // Log activity
    await notificationService.logActivity(forwarderId, 'leave_forwarded', 'leave', leaveId, {
      studentUsername,
      forwardToRole,
      forwardComments
    });

    // Send notifications to next approvers
    await notificationService.notifyLeaveForwarded(
      leaveId,
      null,
      studentUsername,
      nextApproverIds,
      new Date(fromDate).toLocaleDateString(),
      new Date(toDate).toLocaleDateString(),
      forwarderName,
      reason
    );

    // Notify student and admin
    const [students] = await db.query("SELECT id FROM users WHERE username = ?", [studentUsername]);
    const [admins] = await db.query("SELECT id FROM users WHERE role = 'admin'");

    for (const student of students) {
      await notificationService.createNotification(
        student.id,
        forwarderId,
        leaveId,
        'LEAVE_FORWARDED',
        '📤 Leave Request Forwarded',
        `Your leave request has been forwarded to ${forwardToRole} for further approval.`
      );
    }

    for (const admin of admins) {
      await notificationService.createNotification(
        admin.id,
        forwarderId,
        leaveId,
        'LEAVE_FORWARDED',
        '📤 Leave Request Forwarded',
        `${studentUsername}'s leave request has been forwarded by ${forwarderName} (${forwarderRole}) to ${forwardToRole}.`
      );
    }

    res.json({ message: "Leave forwarded successfully", forwardedTo: forwardToRole });
  } catch (err) {
    console.error('❌ [FORWARD LEAVE ERROR]', err.message);
    res.status(500).json({ message: "Error forwarding leave: " + err.message });
  }
});

// ------------------- GENERATE LEAVE LETTER -------------------
app.get("/leave-letter/:id", authenticateToken, async (req, res) => {
  const leaveId = req.params.id;
  
  try {
    // Get leave details
    const [leaves] = await db.query(`
      SELECT l.*, u.username, u.email
      FROM leaves l
      LEFT JOIN users u ON l.username = u.username
      WHERE l.leave_id = ?
    `, [leaveId]);

    if (leaves.length === 0) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    const leave = leaves[0];
    const { username, email, fromDate, toDate, reason, status } = leave;
    
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
    const today = new Date().toLocaleDateString();

    // Generate HTML letter - FULLY EDITABLE by students, auto-populated fields only for leave details
    const letterHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Leave Letter - ${username}</title>
        <style>
          * { box-sizing: border-box; }
          body { font-family: 'Times New Roman', serif; line-height: 1.8; margin: 0; padding: 20px; background: #f5f5f5; }
          .letter { background: white; max-width: 900px; margin: 0 auto; padding: 50px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
          
          /* Top Section Layout */
          .header-top { display: grid; grid-template-columns: 1fr 300px; margin-bottom: 40px; }
          .date-place-top { text-align: right; font-size: 14px; line-height: 2; }
          .date-place-top div { margin: 5px 0; }
          
          /* Auto Fields */
          .from-section { margin: 30px 0; }
          .to-section { margin: 30px 0; }
          .section-label { font-weight: bold; }
          .section-content { margin-left: 20px; font-size: 14px; line-height: 1.8; }
          
          .subject-section { margin: 30px 0; }
          .subject-input { font-family: 'Times New Roman', serif; font-size: 14px; font-weight: bold; text-decoration: underline; border: none; background: transparent; width: 100%; padding: 0; margin-left: 20px; }
          
          /* Salutation Selector */
          .salutation-selector { margin: 20px 0; padding: 10px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; }
          .salutation-selector label { margin-right: 12px; font-size: 13px; display: inline-block; }
          .salutation-selector input { margin-right: 4px; }
          .selected-salutation { margin: 20px 0 30px 0; font-weight: bold; font-size: 14px; }
          
          /* Leave Details Auto Display */
          .leave-details { background: #f0f8ff; padding: 10px; border-left: 3px solid #2563eb; margin: 15px 0 25px 0; font-size: 13px; line-height: 1.6; }
          
          /* Body Textarea */
          .body-textarea { font-family: 'Times New Roman', serif; font-size: 14px; line-height: 1.8; width: 100%; min-height: 180px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; resize: vertical; }
          .textarea-label { font-weight: bold; margin-bottom: 8px; display: block; font-size: 13px; color: #666; }
          
          /* Bottom Section */
          .bottom-section { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 80px; }
          
          /* Bottom Left */
          .bottom-left { }
          .date-place-bottom { font-size: 14px; line-height: 2; }
          .date-place-bottom strong { margin-right: 5px; }
          
          /* Bottom Right */
          .bottom-right { }
          .closing-selector { margin-bottom: 20px; padding: 10px; background: #e8f4f8; border: 1px solid #2563eb; border-radius: 4px; }
          .closing-selector label { display: inline-block; margin-right: 12px; font-size: 13px; margin-bottom: 5px; }
          .closing-selector input { margin-right: 4px; cursor: pointer; }
          .closing-line { margin: 30px 0 5px 0; font-size: 14px; min-height: 18px; }
          .signature-space { margin-top: 40px; }
          .signature-line { border-top: 1px solid #333; width: 250px; margin-bottom: 5px; }
          .name-signature { font-weight: bold; font-size: 14px; }
          
          /* Controls */
          .controls { margin-top: 40px; padding: 15px; background: #e8f4f8; border: 1px solid #2563eb; border-radius: 4px; text-align: center; }
          .print-button { padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: bold; }
          .print-button:hover { background: #1d4ed8; }
          
          .footer { text-align: center; margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #666; }
          
          /* Print Styles - Hide all input elements and selectors */
          @media print { 
            body { background: white; padding: 0; }
            .letter { box-shadow: none; padding: 40px; }
            .salutation-selector { display: none; }
            .controls { display: none; }
            .textarea-label { display: none; }
            .closing-selector { display: none; }
            .body-textarea { border: none; padding: 0; width: 100%; }
            .selected-salutation { font-weight: normal; margin: 20px 0 30px 0; }
            .subject-input { border: none; }
            .leave-details { display: none; }
          }
        </style>
        <script>
          function updateSalutation() {
            const selected = document.querySelector('input[name="salutation"]:checked').value;
            document.getElementById('selectedSalutation').textContent = selected;
          }
          
          function updateClosing() {
            const selected = document.querySelector('input[name="closing"]:checked').value;
            document.getElementById('closingText').textContent = selected;
          }
          
          function printLetter() {
            window.print();
          }
        </script>
      </head>
      <body>
        <div class="letter">
          <!-- Top Section with Date/Place on Right -->
          <div class="header-top">
            <div></div>
            <div class="date-place-top">
              <div><strong>Date:</strong> ${from.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
              <div><strong>Place:</strong> Coimbatore</div>
            </div>
          </div>

          <!-- From Section (AUTO) -->
          <div class="from-section">
            <div class="section-label">From:</div>
            <div class="section-content">
              <div><strong>${username}</strong></div>
              <div>${username}</div>
              <div>2nd Year B.Tech(AI&DS) Department</div>
              <div>Studyworld College of Engineering</div>
              <div>Coimbatore</div>
            </div>
          </div>

          <!-- To Section (AUTO) -->
          <div class="to-section">
            <div class="section-label">To:</div>
            <div class="section-content">
              <div><strong>The Principal</strong></div>
              <div>Studyworld College of Engineering</div>
              <div>Coimbatore</div>
            </div>
          </div>

          <!-- Subject Section (AUTO) -->
          <div class="subject-section">
            <span class="section-label">Subject:</span>
            <input type="text" class="subject-input" id="letterSubject" placeholder="e.g., Request for Leave - Medical Emergency" value="Leave Application for ${days} Day(s)" />
          </div>

          <!-- Salutation Selector -->
          <div class="salutation-selector">
            <strong>Choose Salutation Type:</strong><br><br>
            <label><input type="radio" name="salutation" value="Respected Sir or Madam," checked onchange="updateSalutation()"> Respected Sir or Madam,</label>
            <label><input type="radio" name="salutation" value="Dear Sir/Madam," onchange="updateSalutation()"> Dear Sir/Madam,</label>
            <label><input type="radio" name="salutation" value="Dear Sir," onchange="updateSalutation()"> Dear Sir,</label>
            <label><input type="radio" name="salutation" value="Dear Madam," onchange="updateSalutation()"> Dear Madam,</label>
          </div>

          <!-- Selected Salutation (displays in letter) -->
          <div class="selected-salutation" id="selectedSalutation">Respected Sir or Madam,</div>

          <!-- Leave Details (AUTO) -->
          <div class="leave-details">
            <strong>📋 Leave Period:</strong> From <strong>${from.toLocaleDateString('en-IN')}</strong> to <strong>${to.toLocaleDateString('en-IN')}</strong> | Duration: <strong>${days} day(s)</strong><br>
            <strong>Reason:</strong> ${reason}
          </div>

          <!-- Body Content (MANUALLY TYPE) -->
          <label class="textarea-label">📝 Type Your Letter Content (Main Body):</label>
          <textarea class="body-textarea" id="bodyContent" placeholder="Write your complete letter content here. Include your request, reasons, assurances, and closing statements...

Example:
I hereby request for leave of absence from my academic activities for the period mentioned above.

The reason for this leave request is as stated above. I assure you that this leave will not affect my academic performance and I will complete all pending assignments and submissions before my leave.

I humbly request you to kindly approve this leave application.

Thanking you.">I hereby request for leave of absence from my academic activities for the period mentioned above.

The reason for this leave request is as stated above. I assure you that this leave will not affect my academic performance and I will complete all pending assignments and submissions before my leave.

I humbly request you to kindly approve this leave application.

Thanking you.</textarea>

          <!-- Bottom Section: Date/Place LEFT and Closing RIGHT -->
          <div class="bottom-section">
            <!-- Bottom Left -->
            <div class="bottom-left">
              <div class="date-place-bottom">
                <div><strong>Date:</strong> ${from.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
                <div><strong>Place:</strong> Coimbatore</div>
              </div>
            </div>

            <!-- Bottom Right -->
            <div class="bottom-right">
              <!-- Closing Selector -->
              <div class="closing-selector">
                <strong>Choose Closing Type:</strong><br><br>
                <label><input type="radio" name="closing" value="obediently" checked onchange="updateClosing()"> obediently</label>
                <label><input type="radio" name="closing" value="faithfully" onchange="updateClosing()"> faithfully</label>
                <label><input type="radio" name="closing" value="truthfully" onchange="updateClosing()"> truthfully</label>
                <label><input type="radio" name="closing" value="respectfully" onchange="updateClosing()"> respectfully</label>
              </div>

              <!-- Closing Line -->
              <div class="closing-line">Yours <span id="closingText">obediently</span>,</div>

              <!-- Signature Space -->
              <div class="signature-space">
                <div class="signature-line"></div>
                <div class="name-signature">${username}</div>
              </div>
            </div>
          </div>

          <!-- Print Controls -->
          <div class="controls">
            <button class="print-button" onclick="printLetter()">🖨️ Print Letter</button>
            <p style="font-size: 12px; color: #666; margin: 10px 0 0 0;">✏️ Edit content above, select your choices, then print. Selectors won't appear in printed version.</p>
          </div>

          <div class="footer">
            <p>Studyworld College of Engineering © 2024 | Digital Leave Letter Management System</p>
            <p><strong>Status:</strong> ${status.charAt(0).toUpperCase() + status.slice(1)} | <strong>Generated:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    res.send(letterHTML);
  } catch (err) {
    console.error('❌ [LEAVE LETTER ERROR]', err.message);
    res.status(500).json({ message: "Error generating leave letter: " + err.message });
  }
});

// ------------------- START SERVER -------------------
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});

db.query("SELECT 1")
  .then(() => console.log("✅ MySQL connected"))
  .catch(err => console.error("💥 MySQL connection failed:", err));
