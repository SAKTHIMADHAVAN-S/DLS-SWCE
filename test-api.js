const http = require('http');
const jwt = require('jsonwebtoken');

// Create a test JWT token for hod_001 (user id = 4)
const token = jwt.sign(
  { id: 4, username: 'hod_001', role: 'hod' },
  'your_secret_key',
  { expiresIn: '2h' }
);

console.log('🔑 Generated token for hod_001');
console.log('Testing API endpoint: http://localhost:5000/all-leaves?status=approved\n');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/all-leaves?status=approved',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('✅ API Response Status:', res.statusCode);
    console.log('✅ API Response Body:');
    try {
      const parsed = JSON.parse(data);
      console.log(JSON.stringify(parsed, null, 2));
    } catch {
      console.log(data);
    }
  });
});

req.on('error', (err) => {
  console.error('❌ Error:', err.message);
});

req.end();
