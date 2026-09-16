# 🧪 COMPREHENSIVE TESTING GUIDE
## Digital Leave Letter System - Full Integration Testing

---

## 📋 Quick Start

### Prerequisites
- Node.js installed
- Server running: `node server.js`
- Database populated with test users

### Run Complete Test Suite
```bash
node test-suite.js
```

OR use the test runner script:
```bash
bash run-tests.sh
```

---

## 🧪 Test Phases Overview

### PHASE 1: AUTHENTICATION TESTS ✅
**Status:** Core authentication validation
- ✅ Student login with correct credentials
- ✅ Faculty login with correct credentials
- ✅ HOD login with correct credentials  
- ✅ Principal login with correct credentials
- ✅ Admin login with correct credentials
- ✅ Invalid login rejects with 400
- ✅ Wrong password rejects with 401

**Expected Results:**
- All 5 test users can successfully login
- Invalid credentials return appropriate error codes
- JWT tokens are generated correctly

---

### PHASE 2: LEAVE APPLICATION TESTS 📋
**Status:** Leave submission validation
- ✅ Student can apply for leave
- ✅ Leave validation: end date after start date
- ✅ Student can view their leave history
- ✅ Unauthenticated requests rejected

**Test Cases:**
1. Valid leave application (2026-05-01 to 2026-05-05)
2. Invalid dates (end before start) - should reject
3. Missing required fields - should reject
4. No token - should return 401

**Expected Results:**
- Valid leaves are created with status "pending"
- Invalid leaves are rejected with appropriate errors
- Notifications are sent to student

---

### PHASE 3: APPROVAL WORKFLOW TESTS ✅
**Status:** Faculty approval validation
- ✅ Faculty can approve leave
- ✅ Cannot approve already approved leave
- ✅ Student receives notification on approval
- ✅ Email is sent to student

**Workflow:**
```
Student Applies → Faculty Sees Pending → Faculty Approves → Student Notified
```

**Expected Results:**
- Leave status changes to "approved"
- Email notification sent
- Activity log records action
- Cannot approve twice

---

### PHASE 4: REJECTION WORKFLOW TESTS ❌
**Status:** Leave rejection validation
- ✅ Faculty can reject leave with reason
- ✅ Rejected leaves show reason
- ✅ Student receives rejection notification

**Workflow:**
```
Student Applies → Faculty Rejects → Student Notified with Reason
```

**Expected Results:**
- Leave status changes to "rejected"
- Rejection reason is stored
- Student notified with reason

---

### PHASE 5: FORWARDING WORKFLOW TESTS 📤
**Status:** Multi-level approval chain
- ✅ Faculty can forward to HOD
- ✅ HOD can view forwarded leaves
- ✅ HOD can approve/reject/forward

**Workflow:**
```
Student Applies 
  → Faculty Approves/Forwards to HOD
  → HOD Approves/Forwards to Principal
  → Principal Makes Final Decision
```

**Expected Results:**
- Leave forwarded with status "forwarded"
- Next role receives notification
- Activity chain is maintained
- Proper role-based filtering

---

### PHASE 6: NOTIFICATION TESTS 🔔
**Status:** Real-time notification delivery
- ✅ Student can retrieve notifications
- ✅ Faculty can retrieve notifications
- ✅ Mark notification as read
- ✅ Unread count updates

**Notification Types:**
- Leave Submitted
- Leave Approved
- Leave Rejected
- Leave Forwarded
- Action Required

**Expected Results:**
- Notifications created for all events
- Unread badges display correctly
- Read/unread status updates properly

---

### PHASE 7: ADMIN/ANALYTICS TESTS 📊
**Status:** Administrative access and reporting
- ✅ Admin can view activity log
- ✅ Non-admin cannot view activity log (403)
- ✅ Admin can view analytics
- ✅ Admin can view all leaves
- ✅ Non-admin cannot view all leaves (403)

**Admin Capabilities:**
- View all users
- View all leaves (system-wide)
- View activity log with filters
- Generate analytics/reports
- Manage system settings

**Expected Results:**
- Admin has full system visibility
- Non-admins have restricted access
- Proper 403 errors for unauthorized access

---

### PHASE 8: ROLE-BASED ACCESS TESTS 🔐
**Status:** Security and access control
- ✅ Student cannot access admin endpoints
- ✅ Faculty can view pending leaves
- ✅ Student cannot approve leaves
- ✅ Proper role validation on all endpoints

**Role Matrix:**
| Endpoint | Student | Faculty | HOD | Principal | Admin |
|----------|---------|---------|-----|-----------|-------|
| /apply-leave | ✅ | ❌ | ❌ | ❌ | ❌ |
| /leave-status | ✅ | ✅ | ✅ | ✅ | ✅ |
| /pending-leaves | ❌ | ✅ | ✅ | ✅ | ✅ |
| /approve-leave | ❌ | ✅ | ✅ | ✅ | ✅ |
| /activity-log | ❌ | ❌ | ❌ | ❌ | ✅ |
| /all-leaves | ❌ | ❌ | ✅ | ✅ | ✅ |

**Expected Results:**
- Unauthorized access returns 403
- Authorized access succeeds
- Role-based queries return filtered data

---

### PHASE 9: ERROR HANDLING TESTS ⚠️
**Status:** Error scenarios and edge cases
- ✅ Invalid leave ID returns 404/400
- ✅ Invalid token returns 403
- ✅ Missing required fields returns error
- ✅ Database connection errors handled
- ✅ Overlapping leave dates rejected

**Error Scenarios:**
1. Non-existent leave ID
2. Expired/invalid token
3. Incomplete form data
4. Database unavailable
5. Duplicate approvals
6. Out-of-order workflow

**Expected Results:**
- Appropriate HTTP status codes
- Descriptive error messages
- No 500 errors for user input errors
- Graceful handling of system failures

---

### PHASE 10: DATA CONSISTENCY TESTS 🔄
**Status:** Data integrity validation
- ✅ Leave status remains consistent
- ✅ Notification data is complete
- ✅ Activity log is accurate
- ✅ No data loss in workflow

**Consistency Checks:**
- All leaves have valid status
- All notifications have required fields
- Activity log has complete data trails
- Timestamps are accurate
- User relationships are maintained

**Expected Results:**
- All records have required fields
- Status values are valid
- No orphaned records
- Audit trail is complete

---

## 📊 Test Results Example

```
═══════════════════════════════════════════════════════
  🧪 COMPREHENSIVE SYSTEM TESTING SUITE
  Digital Leave Letter System - Full Integration
═══════════════════════════════════════════════════════

🔐 PHASE 1: AUTHENTICATION TESTS

✅ PASS: Student login with correct credentials
✅ PASS: Faculty login with correct credentials
✅ PASS: HOD login with correct credentials
✅ PASS: Principal login with correct credentials
✅ PASS: Admin login with correct credentials
✅ PASS: Invalid login rejects with 400
✅ PASS: Wrong password rejects with 401

📋 PHASE 2: LEAVE APPLICATION TESTS

✅ PASS: Student can apply for leave
✅ PASS: Leave validation: end date after start date
✅ PASS: Student can view their leave history
✅ PASS: Unauthenticated requests rejected

... [all phases report results] ...

═══════════════════════════════════════════════════════
📊 TEST RESULTS SUMMARY
═══════════════════════════════════════════════════════
✅ Passed: 45
❌ Failed: 0
📊 Total: 45
✨ Success Rate: 100%
═══════════════════════════════════════════════════════
```

---

## 🔧 Manual Testing Checklist

### Login Testing
- [ ] Test login with student credentials
- [ ] Verify redirects to student dashboard
- [ ] Test login with faculty credentials
- [ ] Verify redirects to faculty dashboard
- [ ] Test invalid credentials (error shown)
- [ ] Test wrong password (error shown)
- [ ] Test with expired token (logout)

### Student Dashboard
- [ ] View leave statistics
- [ ] Apply for leave (valid dates)
- [ ] Apply for leave (invalid dates - should error)
- [ ] View leave history
- [ ] See leave status updates
- [ ] Receive notifications

### Faculty Dashboard
- [ ] View pending leave requests
- [ ] Approve a request
- [ ] Reject a request with reason
- [ ] Forward to HOD
- [ ] See approval statistics
- [ ] Receive notifications

### HOD Dashboard
- [ ] View forwarded leaves from faculty
- [ ] Approve forwarded leaves
- [ ] Reject with reason
- [ ] Forward to principal
- [ ] View department statistics
- [ ] See activity log

### Principal Dashboard
- [ ] View all pending leaves (college-wide)
- [ ] Approve final decisions
- [ ] Reject with reason
- [ ] View analytics by department
- [ ] Filter leaves by status
- [ ] Export leave data

### Admin Dashboard
- [ ] View all users
- [ ] View all leaves (system-wide)
- [ ] View complete activity log
- [ ] Filter activities
- [ ] View system analytics
- [ ] Export data in CSV

---

## 🐛 Bug Prevention Checklist

### Backend
- [ ] All SQL queries use parameterized statements (prevent SQL injection)
- [ ] All routes check authentication (prevent unauthorized access)
- [ ] All routes check authorization by role (prevent privilege escalation)
- [ ] All user input is validated (dates, strings, etc.)
- [ ] All errors are caught and logged
- [ ] Database transactions maintain ACID properties
- [ ] No sensitive data logged (passwords, tokens)

### Frontend
- [ ] All form inputs are validated before submission
- [ ] All API calls include authorization header
- [ ] All errors are displayed to user
- [ ] No sensitive data in localStorage except token
- [ ] All links check authentication before loading
- [ ] Proper error handling on failed API calls
- [ ] XSS prevention (no innerHTML with user data)

### Database
- [ ] All tables have proper indexes
- [ ] Foreign keys are properly defined
- [ ] No duplicate records
- [ ] Timestamps are accurate
- [ ] Enum values are properly constrained
- [ ] Backup procedure tested and documented

---

## 📈 Performance Testing

### Load Testing
- [ ] Test with 100+ concurrent users
- [ ] Monitor response times (target < 1s)
- [ ] Check database connection pool
- [ ] Monitor memory usage
- [ ] Test with large datasets (1000+ leaves)

### Stress Testing
- [ ] Rapid fire API calls
- [ ] Concurrent approvals of same leave
- [ ] Database connection drop recovery
- [ ] High volume email sending
- [ ] Notification queue under load

---

## 🔒 Security Testing

### Authentication
- [ ] Token expiration tested
- [ ] Invalid tokens rejected
- [ ] Password hashing verified (bcrypt)
- [ ] No plaintext passwords in logs

### Authorization
- [ ] Role-based access enforced
- [ ] Students can't approve leaves
- [ ] Faculty can't access admin data
- [ ] Admin access requires special permissions

### Injection Attacks
- [ ] SQL injection attempts blocked
- [ ] XSS attempts handled
- [ ] Input sanitization working

### Data Protection
- [ ] Sensitive data not exposed in API
- [ ] Passwords never returned
- [ ] Tokens properly validated
- [ ] CORS properly configured

---

## 🚀 Deployment Checklist

Before going to production:
- [ ] All tests passing (100% success rate)
- [ ] Load testing completed
- [ ] Security audit passed
- [ ] Database backup tested
- [ ] Error logging in place
- [ ] Monitoring configured
- [ ] Backup server ready
- [ ] Disaster recovery plan documented
- [ ] User training completed
- [ ] Production deployment procedure documented

---

## 📞 Troubleshooting

### Tests Failing?
1. Check server is running: `node server.js`
2. Verify database connection
3. Verify test users exist
4. Check network connectivity
5. Review server logs for errors
6. Run individual test phases

### Authentication Issues?
1. Verify bcrypt password hashing
2. Check JWT secret key
3. Verify token encoding/decoding
4. Check authentication middleware
5. Review login endpoint logs

### Notification Issues?
1. Verify NotificationService is loaded
2. Check database tables exist
3. Verify email configuration
4. Check activity logging
5. Review notification creation logs

---

## 📝 Test Execution Log

Example of keeping test execution records:

```
Date: 2026-04-10
Time: 10:30 AM
Tester: Admin
Test Suite: test-suite.js
Results: PASSED (45/45 tests)
Server: http://localhost:5000
Browser: Chrome/Firefox (manual tests)
Notes: All authentication working, notifications delivering
Issues: None
Next: Deploy to staging
```

---

## ✅ Test Sign-Off Template

```
═══════════════════════════════════════════════════════
TESTING SIGN-OFF

Project: Digital Leave Letter System
Date: [Date]
Tester: [Name]
Status: ✅ PASSED / ❌ NEEDS WORK

Test Phases:
✅ Phase 1: Authentication
✅ Phase 2: Leave Application
✅ Phase 3: Approval Workflow
✅ Phase 4: Rejection Workflow
✅ Phase 5: Forwarding Workflow
✅ Phase 6: Notifications
✅ Phase 7: Admin Features
✅ Phase 8: Role-Based Access
✅ Phase 9: Error Handling
✅ Phase 10: Data Consistency

Total Tests: 45
Passed: 45
Failed: 0
Success Rate: 100%

Issues Found: None
Recommendations: Ready for production

Signed: [Signature/Name]
═══════════════════════════════════════════════════════
```

---

## 🎯 Next Steps

1. **Run Full Test Suite**: `node test-suite.js`
2. **Monitor Results**: Check for 100% pass rate
3. **Manual Testing**: Follow manual checklist
4. **Load Testing**: Verify performance
5. **Security Audit**: Check for vulnerabilities
6. **Deployment**: Follow deployment checklist

---

**Last Updated:** 2026-04-10
**Version:** 1.0 Complete
**Status:** ✅ Ready for Production Testing
