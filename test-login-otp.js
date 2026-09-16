#!/usr/bin/env node

/**
 * Test OTP Email Sending for Login
 * Simulates actual login flow
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000';

// Test email - use care.webnest@gmail.com to verify
const TEST_EMAIL = 'care.webnest@gmail.com';

console.log('\n╔════════════════════════════════════════════╗');
console.log('║  Testing OTP Email Sending for Login      ║');
console.log('╚════════════════════════════════════════════╝\n');

// First, create a test user if it doesn't exist
async function createTestUser() {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      username: 'otptest',
      password: 'test123',
      email: TEST_EMAIL,
      full_name: 'OTP Test User',
      phone: '1234567890',
      department: 'Testing',
      role: 'student'
    });

    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/register',
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
        console.log('Step 1: Test user (creation attempted)');
        console.log('  Response:', data.substring(0, 100));
        resolve();
      });
    }).on('error', (err) => {
      console.log('Step 1: Test user creation skipped (register endpoint may not exist)');
      resolve();
    });

    req.write(postData);
    req.end();
  });
}

// Test: Send OTP to email
async function testSendOTP() {
  return new Promise((resolve) => {
    const postData = JSON.stringify({ email: TEST_EMAIL });

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

    console.log('\nStep 2: Sending OTP to', TEST_EMAIL);
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('  Status:', res.statusCode);
          console.log('  Message:', response.message);
          console.log('  Email Found:', response.found);
          console.log('  Email Sent:', response.emailSent);
          if (response.emailError) {
            console.log('  ❌ Email Error:', response.emailError);
          }
          if (response.otp) {
            console.log('  OTP (dev mode):', response.otp);
          }
          console.log('  Full Response:', JSON.stringify(response, null, 2));
          resolve(response);
        } catch (e) {
          console.log('  Error parsing response:', e.message);
          console.log('  Raw response:', data);
          resolve(null);
        }
      });
    }).on('error', (err) => {
      console.log('  ❌ Connection Error:', err.message);
      resolve(null);
    });

    req.write(postData);
    req.end();
  });
}

// Main test
async function runTest() {
  await new Promise(r => setTimeout(r, 1000)); // Wait for server to be ready
  
  console.log('📧 Testing OTP Email Sending\n');
  console.log('Test Email:', TEST_EMAIL);
  console.log('Expected: Email should arrive in inbox within 5 seconds\n');
  
  const response = await testSendOTP();
  
  if (response) {
    console.log('\n✅ OTP Endpoint Response Received');
    if (response.emailSent) {
      console.log('✅ Email marked as sent');
      console.log('\n📬 Check inbox at:', TEST_EMAIL);
      console.log('📝 Subject: "Your CampusAI Login OTP"');
      console.log('⏱️  Should arrive within 5 seconds');
    } else {
      console.log('❌ Email not sent - check the error above');
      console.log('❌ SMTP might not be configured correctly');
    }
  } else {
    console.log('\n❌ Failed to get response from server');
    console.log('❌ Check that server is running on localhost:5000');
  }
}

runTest();
