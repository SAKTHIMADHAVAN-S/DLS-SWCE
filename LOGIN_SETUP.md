# 🔐 Digital Leave Letter System - Login Implementation Guide

## ✅ COMPLETED

### Backend Login System
- **Framework**: Node.js Express server on port 5000
- **Database**: MySQL `leave_system` database  
- **Authentication**: JWT tokens (2-hour expiration)
- **Password Security**: BCrypt hashing (10 salt rounds)
- **Detailed Logging**: Comprehensive console logs for debugging

### Database Schema
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,    -- ← Extended for bcrypt hashes
  role ENUM('student','faculty','hod','principal','admin') NOT NULL
);
```

### Test Users (Login Credentials)

| Username | Password | Role | Status |
|----------|----------|------|--------|
| sakthi | 2006 | admin | ✅ Tested |
| student_001 | student123 | student | ✅ Tested |
| faculty_001 | faculty123 | faculty | ✅ Tested |
| hod_001 | hod123 | hod | ✅ Ready |
| principal_001 | principal123 | principal | ✅ Ready |

### Frontend Login Form
- **Location**: `frontend/login/login.html`
- **Script**: `frontend/login/login.js`
- **Features**:
  - Username & password input fields
  - Form validation (required fields)
  - Sends POST request to `/login` endpoint
  - Stores JWT token in localStorage
  - Role-based dashboard redirect
  - Error message display

### Login Data Flow

```
1. Frontend Form Submit
   ↓
2. POST /login with {username, password}
   ↓
3. Backend: Query user from MySQL
   ↓
4. Backend: Compare password with bcrypt.compare()
   ↓
5. Backend: Generate JWT token if match
   ↓
6. Frontend: Store token in localStorage
   ↓
7. Frontend: Redirect based on role
   ↓
8. Dashboard loads with authenticated token
```

### Server Logs Sample Output

```
👉 [LOGIN] Attempt - Username: sakthi
🔍 [LOGIN] Querying database for username: sakthi
✅ [LOGIN] User found: sakthi | Role: admin | ID: 1
🔐 [LOGIN] Comparing password (bcrypt)...
🔑 [LOGIN] Generating JWT token for user: sakthi
✅ [LOGIN] SUCCESS - User: sakthi | Role: admin
```

---

## 🚀 QUICK START

### Start the server
```bash
cd "c:\Users\Dell 7410\Web Design\SAKTHI Portfolio\Web Design\Digital Leave Letter System"
node server.js
```

### Open frontend login page
Open in browser: 
```
file:///c:/Users/Dell%207410/Web%20Design/SAKTHI%20Portfolio/Web%20Design/Digital%20Leave%20Letter%20System/frontend/login/login.html
```
OR navigate to a local web server if CORS is an issue.

### Test login
- Username: `student_001`
- Password: `student123`
- Expected: Redirect to `frontend/student/dashboard.html`

---

## 📋 HELPER SCRIPTS

Created for setup and maintenance:

1. **check-users.js** - List all users in database
2. **migrate-passwords.js** - Hash plain text passwords with bcrypt
3. **seed-test-users.js** - Create test users for all roles
4. **alter-schema.js** - Extend password column to VARCHAR(255)
5. **test-login.js** - Test login endpoint with multiple credentials

Run any script:
```bash
node <script-name>.js
```

---

## 🔧 NEXT STEPS

### Phase 2: Dashboard Setup
- [ ] Student Dashboard - View personal leave requests
- [ ] Faculty Dashboard - Approve/reject student leaves
- [ ] HOD Dashboard - Manage department leaves
- [ ] Principal Dashboard - Analytics & oversight
- [ ] Admin Dashboard - System configuration

### Phase 3: Leave Management Endpoints
- [ ] POST `/apply-leave` - Submit new leave request
- [ ] GET `/leave-status` - Fetch leave request history
- [ ] PUT `/approve-leave/:id` - Approve requests (HOD/Principal)
- [ ] PUT `/reject-leave/:id` - Reject requests
- [ ] PUT `/forward-leave/:id` - Forward to next authority
- [ ] GET `/analytics` - Generate reports

### Phase 4: Middleware & Security
- [ ] Role-based access control (RBAC)
- [ ] Token validation on protected routes
- [ ] Request logging (activity trails)
- [ ] Rate limiting
- [ ] HTTPS setup for production

---

## ✨ KEY IMPROVEMENTS MADE

1. **Security Enhancement**
   - Replaced plain text password validation with bcrypt
   - Extended password column: VARCHAR(50) → VARCHAR(255)
   - Proper JWT token generation with user ID, username, and role

2. **Error Logging**
   - Detailed console logs with emoji indicators for easy debugging
   - Step-by-step tracking of login process
   - Clear error messages for different failure scenarios

3. **Database**
   - Verified MySQL connection
   - Created schema documentation
   - Migrated existing passwords to bcrypt hashes
   - Seeded test users for all roles

4. **Testing**
   - Created automated test scripts
   - Validated all login scenarios (success, user not found, password mismatch)
   - Verified JWT token generation and role assignments

---

## 🆘 TROUBLESHOOTING

### Login Returns "Server error. Please try again"
1. Check MySQL connection in console logs
2. Verify `leave_system` database exists
3. Run `node check-users.js` to check user table
4. Review server console for detailed error message

### Redirect after login doesn't work
1. Check if dashboard HTML files exist at expected paths
2. Verify role in database matches redirect logic
3. Check localStorage has `token` key
4. Open DevTools → Application → LocalStorage to verify

### 404 errors on dashboard load
1. Ensure frontend folder structure is correct
2. Check file paths match redirect URLs in login.js
3. Make sure CSS/JS files are in same directories

---

## 📚 REFERENCES

- JWT Spec: https://tools.ietf.org/html/rfc7519
- BCrypt: https://github.com/kelektiv/node.bcrypt.js
- Express.js: https://expressjs.com/
- MySQL2: https://github.com/sidorares/node-mysql2
