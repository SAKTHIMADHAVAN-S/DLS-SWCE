// Quick API Testing Script - Just run this to verify everything works

const http = require('http');

const BASE_URL = 'http://localhost:5000';

// Helper to make HTTP requests
async function testEndpoint(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(data),
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data,
          });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting API Tests...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣  Testing /health endpoint...');
    const health = await testEndpoint('GET', '/health');
    console.log(`   Status: ${health.status}`);
    console.log(`   Response: ${JSON.stringify(health.data)}\n`);

    // Test 2: Login
    console.log('2️⃣  Testing /login endpoint (student_001)...');
    const login = await testEndpoint('POST', '/login', {
      username: 'student_001',
      password: 'student123'
    });
    console.log(`   Status: ${login.status}`);
    console.log(`   Response: ${JSON.stringify(login.data, null, 2)}`);
    
    if (login.status === 200 && login.data.token) {
      const token = login.data.token;
      console.log('   ✅ Login successful!\n');

      // Test 3: Get user info (should work with token)
      console.log('3️⃣  Testing /notifications endpoint (with token)...');
      const notifications = await testEndpoint('GET', '/notifications', null, token);
      console.log(`   Status: ${notifications.status}`);
      console.log(`   Response: ${JSON.stringify(notifications.data, null, 2)}\n`);

      // Test 4: Apply Leave
      console.log('4️⃣  Testing /apply-leave endpoint...');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 8);

      const applyLeave = await testEndpoint('POST', '/apply-leave', {
        fromDate: tomorrow.toISOString().split('T')[0],
        toDate: nextWeek.toISOString().split('T')[0],
        reason: 'Medical emergency',
        department: 'AI&DS'
      }, token);
      console.log(`   Status: ${applyLeave.status}`);
      console.log(`   Response: ${JSON.stringify(applyLeave.data, null, 2)}\n`);

      // Test 5: Get Leave Status
      console.log('5️⃣  Testing /leave-status endpoint...');
      const leaveStatus = await testEndpoint('GET', '/leave-status', null, token);
      console.log(`   Status: ${leaveStatus.status}`);
      console.log(`   Response: ${JSON.stringify(leaveStatus.data, null, 2)}\n`);

    } else {
      console.log('   ❌ Login failed!\n');
    }

  } catch (err) {
    console.error('❌ Test error:', err.message);
  }

  console.log('\n✅ All tests completed!');
  process.exit(0);
}

// Run tests
runTests();
