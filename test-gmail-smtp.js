// Test Gmail SMTP Configuration
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🧪 Testing Gmail SMTP Configuration...\n');

// Create transporter with Gmail config
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE !== 'false',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ SMTP Connection FAILED:');
    console.log('Error:', error.message);
    console.log('\n⚠️  Possible issues:');
    console.log('1. Gmail credentials incorrect');
    console.log('2. App password incorrect');
    console.log('3. Less secure apps not allowed');
    process.exit(1);
  } else {
    console.log('✅ Gmail SMTP Connected Successfully!');
    console.log('\nConfiguration:');
    console.log('  Email:', process.env.EMAIL_USER);
    console.log('  Host:', process.env.EMAIL_HOST);
    console.log('  Port:', process.env.EMAIL_PORT);
    console.log('  Secure:', process.env.EMAIL_SECURE);
    
    // Send test email
    console.log('\n📧 Sending test OTP email...\n');
    
    const testOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: '🔐 Test OTP - Digital Leave System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #004080;">🎓 Studyworld College</h2>
          <h3>Digital Leave Letter System</h3>
          
          <p>Hello User,</p>
          
          <p>Your test OTP code is:</p>
          
          <div style="background: #f0f8ff; padding: 20px; text-align: center; border-radius: 5px; margin: 20px 0;">
            <h1 style="color: #2563eb; letter-spacing: 5px;">${testOtp}</h1>
            <p style="color: #666;">This code expires in 10 minutes</p>
          </div>
          
          <p>If you did not request this OTP, please ignore this email.</p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="font-size: 12px; color: #666;">
            This is an automated email from Digital Leave Letter System. 
            Please do not reply to this email.
          </p>
        </div>
      `
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('❌ Email sending FAILED:');
        console.log('Error:', error.message);
        process.exit(1);
      } else {
        console.log('✅ Test email sent successfully!');
        console.log('\nEmail Details:');
        console.log('  To:', process.env.EMAIL_USER);
        console.log('  Subject:', mailOptions.subject);
        console.log('  Test OTP:', testOtp);
        console.log('\n📬 Check your inbox at:', process.env.EMAIL_USER);
        console.log('📝 Response:', info.response);
        console.log('\n✨ Gmail SMTP is working perfectly!');
        process.exit(0);
      }
    });
  }
});
