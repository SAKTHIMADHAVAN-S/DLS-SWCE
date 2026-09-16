const http = require('http');

const testLogins = [
  { username: 'sakthi', password: '2006' },
  { username: 'student_001', password: 'student123' },
  { username: 'faculty_001', password: 'faculty123' },
  { username: 'invalid_user', password: 'anypassword' },
];

function testLogin(credentials) {
  return new Promise((resolve) => {
    const data = JSON.stringify(credentials);
    
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };
    
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({
            status: res.statusCode,
            username: credentials.username,
            success: res.statusCode === 200,
            token: response.token ? response.token.substring(0, 30) + '...' : null,
            role: response.role,
            message: response.message
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            username: credentials.username,
            success: false,
            error: body
          });
        }
      });
    });
    
    req.on('error', (err) => {
      resolve({
        username: credentials.username,
        error: err.message
      });
    });
    
    req.write(data);
    req.end();
  });
}

(async () => {
  console.log('🧪 Testing Login Endpoint...\n');
  
  for (const creds of testLogins) {
    console.log(`📝 Testing: ${creds.username}:${creds.password}`);
    const result = await testLogin(creds);
    
    if (result.success) {
      console.log(`  ✅ STATUS ${result.status} - Role: ${result.role}`);
      console.log(`     Token: ${result.token}`);
    } else if (result.status) {
      console.log(`  ❌ STATUS ${result.status} - ${result.message}`);
    } else {
      console.log(`  ❌ ERROR: ${result.error}`);
    }
    console.log();
  }
  
  process.exit();
})();
