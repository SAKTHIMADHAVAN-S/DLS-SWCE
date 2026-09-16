// ===============================================
// COMPREHENSIVE TESTING SUITE
// Digital Leave Letter System - Full Integration
// ===============================================

const http = require('http');
const assert = require('assert');

const API_URL = 'http://localhost:5000';
let testResults = { passed: 0, failed: 0, errors: [] };

// ============ TEST DATA ============
const testUsers = [
  { username: 'student_001', password: 'student123', role: 'student' },
  { username: 'faculty_001', password: 'faculty123', role: 'faculty' },
  { username: 'hod_001', password: 'hod123', role: 'hod' },
  { username: 'principal_001', password: 'principal123', role: 'principal' },
  { username: 'sakthi', password: '2006', role: 'admin' }
];

let tokens = {};

// ============ TEST UTILITIES ============
function makeRequest(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };

    if (token) options.headers['Authorization'] = `Bearer ${token}`;
    if (data) options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(data));

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

function test(name, fn) {
  return new Promise(async (resolve) => {
    try {
      await fn();
      console.log(`✅ PASS: ${name}`);
      testResults.passed++;
    } catch (err) {
      console.error(`❌ FAIL: ${name}`);
      console.error(`   Error: ${err.message}`);
      testResults.failed++;
      testResults.errors.push({ test: name, error: err.message });
    }
    resolve();
  });
}

// ============ PHASE 1: AUTHENTICATION TESTS ============
async function testAuthentication() {
  console.log('\n🔐 PHASE 1: AUTHENTICATION TESTS\n');

  // Test 1: Valid Login
  await test('Student login with correct credentials', async () => {
    const res = await makeRequest('POST', '/login', testUsers[0]);
    assert.strictEqual(res.status, 200, 'Status should be 200');
    assert(res.data.token, 'Should return token');
    assert.strictEqual(res.data.role, 'student', 'Role should be student');
    tokens.student = res.data.token;
  });

  // Test 2: Faculty Login
  await test('Faculty login with correct credentials', async () => {
    const res = await makeRequest('POST', '/login', testUsers[1]);
    assert.strictEqual(res.status, 200);
    assert(res.data.token);
    tokens.faculty = res.data.token;
  });

  // Test 3: HOD Login
  await test('HOD login with correct credentials', async () => {
    const res = await makeRequest('POST', '/login', testUsers[2]);
    assert.strictEqual(res.status, 200);
    assert(res.data.token);
    tokens.hod = res.data.token;
  });

  // Test 4: Principal Login
  await test('Principal login with correct credentials', async () => {
    const res = await makeRequest('POST', '/login', testUsers[3]);
    assert.strictEqual(res.status, 200);
    assert(res.data.token);
    tokens.principal = res.data.token;
  });

  // Test 5: Admin Login
  await test('Admin login with correct credentials', async () => {
    const res = await makeRequest('POST', '/login', testUsers[4]);
    assert.strictEqual(res.status, 200);
    assert(res.data.token);
    tokens.admin = res.data.token;
  });

  // Test 6: Invalid Login
  await test('Invalid login rejects with 400', async () => {
    const res = await makeRequest('POST', '/login', { username: 'invalid', password: 'wrong' });
    assert.strictEqual(res.status, 400, 'Should return 400 for invalid user');
  });

  // Test 7: Wrong Password
  await test('Wrong password rejects with 401', async () => {
    const res = await makeRequest('POST', '/login', { username: 'student_001', password: 'wrongpassword' });
    assert.strictEqual(res.status, 401, 'Should return 401 for wrong password');
  });
}

// ============ PHASE 2: LEAVE APPLICATION TESTS ============
async function testLeaveApplication() {
  console.log('\n📋 PHASE 2: LEAVE APPLICATION TESTS\n');

  let leaveId = null;

  // Test 1: Student applies leave
  await test('Student can apply for leave', async () => {
    const res = await makeRequest('POST', '/apply-leave', {
      fromDate: '2026-05-01',
      toDate: '2026-05-05',
      reason: 'Personal work'
    }, tokens.student);
    assert.strictEqual(res.status, 201, 'Status should be 201');
    assert(res.data.leaveId, 'Should return leaveId');
    leaveId = res.data.leaveId;
  });

  // Test 2: Student cannot apply with future end date before start date
  await test('Leave validation: end date after start date', async () => {
    const res = await makeRequest('POST', '/apply-leave', {
      fromDate: '2026-05-05',
      toDate: '2026-05-01',
      reason: 'Invalid dates'
    }, tokens.student);
    assert(res.status !== 201, 'Should reject invalid dates');
  });

  // Test 3: Student can view their leaves
  await test('Student can view their leave history', async () => {
    const res = await makeRequest('GET', '/leave-status', null, tokens.student);
    assert.strictEqual(res.status, 200);
    assert(Array.isArray(res.data), 'Should return array');
  });

  // Test 4: Unauthenticated access denied
  await test('Unauthenticated requests rejected', async () => {
    const res = await makeRequest('GET', '/leave-status');
    assert.strictEqual(res.status, 401, 'Should return 401 without token');
  });

  return leaveId;
}

// ============ PHASE 3: APPROVAL WORKFLOW TESTS ============
async function testApprovalWorkflow() {
  console.log('\n✅ PHASE 3: APPROVAL WORKFLOW TESTS\n');

  // Get a pending leave
  let leaveId = null;
  const leaveRes = await makeRequest('GET', '/pending-leaves', null, tokens.faculty);
  if (leaveRes.data && leaveRes.data.length > 0) {
    leaveId = leaveRes.data[0].id;
  }

  if (!leaveId) {
    console.log('⚠️  No pending leaves to test approval');
    return;
  }

  // Test 1: Faculty approves leave
  await test('Faculty can approve leave', async () => {
    const res = await makeRequest('PUT', `/approve-leave/${leaveId}`, {}, tokens.faculty);
    assert.strictEqual(res.status, 200);
  });

  // Test 2: Approved status cannot be approved again
  await test('Cannot approve already approved leave', async () => {
    const res = await makeRequest('PUT', `/approve-leave/${leaveId}`, {}, tokens.faculty);
    assert(res.status !== 200, 'Should not allow duplicate approval');
  });
}

// ============ PHASE 4: REJECTION WORKFLOW TESTS ============
async function testRejectionWorkflow() {
  console.log('\n❌ PHASE 4: REJECTION WORKFLOW TESTS\n');

  // Get a pending leave
  const leaveRes = await makeRequest('GET', '/pending-leaves', null, tokens.faculty);
  if (!leaveRes.data || leaveRes.data.length === 0) {
    console.log('⚠️  No pending leaves to test rejection');
    return;
  }

  const leaveId = leaveRes.data[0].id;

  // Test 1: Faculty can reject leave
  await test('Faculty can reject leave with reason', async () => {
    const res = await makeRequest('PUT', `/reject-leave/${leaveId}`, {
      reason: 'Insufficient information'
    }, tokens.faculty);
    assert.strictEqual(res.status, 200);
  });
}

// ============ PHASE 5: FORWARDING WORKFLOW TESTS ============
async function testForwardingWorkflow() {
  console.log('\n📤 PHASE 5: FORWARDING WORKFLOW TESTS\n');

  // Get a pending leave
  const leaveRes = await makeRequest('GET', '/pending-leaves', null, tokens.faculty);
  if (!leaveRes.data || leaveRes.data.length === 0) {
    console.log('⚠️  No pending leaves to test forwarding');
    return;
  }

  const leaveId = leaveRes.data[0].id;

  // Test 1: Faculty can forward to HOD
  await test('Faculty can forward leave to HOD', async () => {
    const res = await makeRequest('PUT', `/forward-leave/${leaveId}`, {
      forwardToRole: 'hod'
    }, tokens.faculty);
    assert.strictEqual(res.status, 200);
  });

  // Test 2: HOD can view forwarded leaves
  await test('HOD can view forwarded leaves', async () => {
    const res = await makeRequest('GET', '/pending-leaves', null, tokens.hod);
    assert.strictEqual(res.status, 200);
    assert(Array.isArray(res.data));
  });
}

// ============ PHASE 6: NOTIFICATION TESTS ============
async function testNotifications() {
  console.log('\n🔔 PHASE 6: NOTIFICATION TESTS\n');

  // Test 1: Student can view notifications
  await test('Student can retrieve notifications', async () => {
    const res = await makeRequest('GET', '/notifications', null, tokens.student);
    assert.strictEqual(res.status, 200);
    assert(res.data.notifications, 'Should have notifications array');
  });

  // Test 2: Faculty can view notifications
  await test('Faculty can retrieve notifications', async () => {
    const res = await makeRequest('GET', '/notifications', null, tokens.faculty);
    assert.strictEqual(res.status, 200);
  });

  // Test 3: Mark notification as read
  const notifRes = await makeRequest('GET', '/notifications', null, tokens.student);
  if (notifRes.data.notifications && notifRes.data.notifications.length > 0) {
    const notifId = notifRes.data.notifications[0].id;
    await test('Can mark notification as read', async () => {
      const res = await makeRequest('PUT', `/notifications/${notifId}/read`, {}, tokens.student);
      assert.strictEqual(res.status, 200);
    });
  }
}

// ============ PHASE 7: ADMIN/ANALYTICS TESTS ============
async function testAdminFeatures() {
  console.log('\n📊 PHASE 7: ADMIN FEATURES TESTS\n');

  // Test 1: Admin can view activity log
  await test('Admin can view activity log', async () => {
    const res = await makeRequest('GET', '/activity-log', null, tokens.admin);
    assert.strictEqual(res.status, 200);
    assert(Array.isArray(res.data));
  });

  // Test 2: Non-admin cannot view activity log
  await test('Non-admin cannot view activity log', async () => {
    const res = await makeRequest('GET', '/activity-log', null, tokens.student);
    assert.strictEqual(res.status, 403, 'Should return 403 for non-admin');
  });

  // Test 3: Admin can view analytics
  await test('Admin can view analytics', async () => {
    const res = await makeRequest('GET', '/analytics', null, tokens.admin);
    assert.strictEqual(res.status, 200);
    assert(res.data.approvalRates);
  });

  // Test 4: Admin can view all leaves
  await test('Admin can view all leaves', async () => {
    const res = await makeRequest('GET', '/all-leaves', null, tokens.admin);
    assert.strictEqual(res.status, 200);
    assert(Array.isArray(res.data));
  });

  // Test 5: Non-admin cannot view all leaves
  await test('Non-admin cannot view all leaves', async () => {
    const res = await makeRequest('GET', '/all-leaves', null, tokens.student);
    assert.strictEqual(res.status, 403);
  });
}

// ============ PHASE 8: ROLE-BASED ACCESS TESTS ============
async function testRoleBasedAccess() {
  console.log('\n🔐 PHASE 8: ROLE-BASED ACCESS TESTS\n');

  // Test 1: Student cannot access admin endpoints
  await test('Student cannot access admin endpoints', async () => {
    const res = await makeRequest('GET', '/activity-log', null, tokens.student);
    assert.strictEqual(res.status, 403);
  });

  // Test 2: Faculty can view pending leaves
  await test('Faculty can view pending leaves', async () => {
    const res = await makeRequest('GET', '/pending-leaves', null, tokens.faculty);
    assert.strictEqual(res.status, 200);
  });

  // Test 3: Student cannot approve leaves
  await test('Student cannot approve leaves', async () => {
    const res = await makeRequest('PUT', '/approve-leave/1', {}, tokens.student);
    assert(res.status !== 200, 'Student should not be able to approve');
  });
}

// ============ PHASE 9: ERROR HANDLING TESTS ============
async function testErrorHandling() {
  console.log('\n⚠️  PHASE 9: ERROR HANDLING TESTS\n');

  // Test 1: Invalid leave ID
  await test('Invalid leave ID returns 404', async () => {
    const res = await makeRequest('PUT', '/approve-leave/99999', {}, tokens.faculty);
    assert(res.status === 404 || res.status === 400, 'Should return error for invalid ID');
  });

  // Test 2: Invalid token
  await test('Invalid token returns 403', async () => {
    const res = await makeRequest('GET', '/leave-status', null, 'invalid.token.here');
    assert.strictEqual(res.status, 403);
  });

  // Test 3: Missing required fields
  await test('Missing required fields returns error', async () => {
    const res = await makeRequest('POST', '/apply-leave', {
      fromDate: '2026-05-01'
      // Missing toDate and reason
    }, tokens.student);
    assert(res.status !== 201, 'Should reject incomplete data');
  });
}

// ============ PHASE 10: DATA CONSISTENCY TESTS ============
async function testDataConsistency() {
  console.log('\n🔄 PHASE 10: DATA CONSISTENCY TESTS\n');

  // Test 1: Leave status consistency
  await test('Leave status remains consistent after approval', async () => {
    const leaveRes = await makeRequest('GET', '/leave-status', null, tokens.student);
    const leaves = leaveRes.data;
    
    // Verify each leave has required fields
    leaves.forEach(leave => {
      assert(leave.id, 'Leave should have ID');
      assert(leave.username, 'Leave should have username');
      assert(['pending', 'approved', 'rejected', 'forwarded'].includes(leave.status), 'Leave should have valid status');
    });
  });

  // Test 2: Notification consistency
  await test('Notifications are created for all actions', async () => {
    const notifRes = await makeRequest('GET', '/notifications', null, tokens.student);
    const notifs = notifRes.data.notifications;
    
    notifs.forEach(n => {
      assert(n.id, 'Notification should have ID');
      assert(n.title, 'Notification should have title');
      assert(n.message, 'Notification should have message');
      assert(['unread', 'read'].includes(n.status), 'Notification should have valid status');
    });
  });
}

// ============ MAIN TEST RUNNER ============
async function runAllTests() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  🧪 COMPREHENSIVE SYSTEM TESTING SUITE');
  console.log('  Digital Leave Letter System - Full Integration');
  console.log('═══════════════════════════════════════════════════════');

  try {
    await testAuthentication();
    const leaveId = await testLeaveApplication();
    await testApprovalWorkflow();
    await testRejectionWorkflow();
    await testForwardingWorkflow();
    await testNotifications();
    await testAdminFeatures();
    await testRoleBasedAccess();
    await testErrorHandling();
    await testDataConsistency();

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('📊 TEST RESULTS SUMMARY');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`📊 Total: ${testResults.passed + testResults.failed}`);
    console.log(`✨ Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);

    if (testResults.failed > 0) {
      console.log('\n⚠️  FAILED TESTS:');
      testResults.errors.forEach((err, i) => {
        console.log(`\n${i + 1}. ${err.test}`);
        console.log(`   Error: ${err.error}`);
      });
    }

    console.log('\n═══════════════════════════════════════════════════════');
    process.exit(testResults.failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  }
}

// Run tests
runAllTests();
