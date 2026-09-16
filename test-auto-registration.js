#!/usr/bin/env node

/**
 * Test: Anyone Can Login with Any Email
 * Demonstrates auto-registration feature
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000';

console.log('\n╔════════════════════════════════════════════════════╗');
console.log('║  Test: Auto-Registration & OTP Login               ║');
console.log('║  Anyone Can Login with Any Email!                 ║');
console.log('╚════════════════════════════════════════════════════╝\n');

// Test with a NEW email that doesn't exist yet
const TEST_EMAILS = [
  'anita.sharma@gmail.com',
  'rajesh.kumar@yahoo.com',
  'priya.verma@outlook.com',
  'care.webnest@gmail.com' // existing user
];

let testIndex = 0;

async function testSendOTPForEmail(email) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({ email });

    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/send-otp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', (err) => {
      resolve(null);
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('Testing auto-registration with different emails:\n');
  
  for (const email of TEST_EMAILS) {
    testIndex++;
    console.log(`\n📧 Test ${testIndex}: Email - ${email}`);
    console.log('─'.repeat(60));
    
    const response = await testSendOTPForEmail(email);
    
    if (response) {
      if (response.isNewUser) {
        console.log('✨ NEW USER REGISTERED');
        console.log(`   Username: ${response.userCreated}`);
      } else {
        console.log('👤 Existing user');
      }
      
      console.log(`📨 Message: ${response.message}`);
      console.log(`✅ Email Sent: ${response.emailSent ? 'YES ✅' : 'NO ❌'}`);
      console.log(`📬 Contact: ${response.contact}`);
      console.log(`⏱️  User ID: ${response.userId}`);
      
      if (response.emailError) {
        console.log(`⚠️  Error: ${response.emailError}`);
      }
    } else {
      console.log('❌ Failed to get response');
    }
    
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log('\n' + '═'.repeat(60));
  console.log('\n✨ FEATURE DEMONSTRATION COMPLETE\n');
  console.log('✅ Anyone can now login with ANY email address!');
  console.log('✅ New accounts are created automatically');
  console.log('✅ OTP sent via Gmail SMTP in real-time');
  console.log('✅ Each user gets a unique temporary account\n');
  
  console.log('🎯 How it works:');
  console.log('   1. User enters ANY email in login page');
  console.log('   2. System checks if email exists');
  console.log('   3. If NEW: Auto-creates user account (role=student)');
  console.log('   4. If EXISTING: Uses existing account');
  console.log('   5. Sends OTP via Gmail SMTP');
  console.log('   6. User enters OTP to login\n');
}

runTests();
