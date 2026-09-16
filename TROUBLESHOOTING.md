# ⚡ QUICK TROUBLESHOOTING GUIDE

## 🔧 Common Issues & Solutions

### Issue 1: "Cannot find module" Error
**Error Message**: `Error: Cannot find module 'dotenv'`

**Solution**:
```bash
npm install
```

---

### Issue 2: Server Won't Start on Port 5000
**Error Message**: `EADDRINUSE: address already in use :::5000`

**Solution Option 1**: Kill existing process on port 5000
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

**Solution Option 2**: Change port in server.js
```javascript
// Line 1363
app.listen(3000, () => {  // Change 5000 to 3000
  console.log("✅ Server running on http://localhost:3000");
});
```

---

### Issue 3: MySQL Connection Failed
**Error Message**: `Error: connect ECONNREFUSED 127.0.0.1:3306`

**Solution**:
1. Check if MySQL is running
2. Verify credentials in server.js:
   ```javascript
   host: 'localhost',
   user: 'root',
   password: 'software20developer@2006',
   database: 'leave_system'
   ```
3. Restart MySQL server

---

### Issue 4: Database Tables Don't Exist
**Error Message**: `Error: Table 'leave_system.leaves' doesn't exist`

**Solution**:
```bash
node create-tables.js
node seed-test-users.js
```

---

### Issue 5: Frontend Can't Connect to Backend
**Error Message**: `Failed to fetch` or blank screens

**Solution**:
1. Ensure server is running: `node server.js`
2. Check backend URL in frontend code: Should be `http://localhost:5000`
3. If using different port, update all frontend files:
   - Search for `http://localhost:5000`
   - Replace with your new port

---

### Issue 6: Login Always Fails
**Error Message**: `Invalid password` or `User not found`

**Solution**:
1. Verify test users exist:
   ```bash
   node seed-test-users.js
   ```
2. Use correct credentials:
   - student_001 / student123
   - faculty_001 / faculty123
   - sakthi / 2006

---

### Issue 7: Leaves Table Already Exists
**Error Message**: `Table 'leaves' already exists`

**Solution**:
```bash
# Just run the server - it will use existing tables
node server.js
```

---

## ✅ VERIFICATION CHECKLIST

Before submitting, verify:

1. **Server Running**
   ```bash
   # Should show:
   ✅ Server running on http://localhost:5000
   ✅ MySQL connected
   ```

2. **Can Login**
   - Navigate to login page
   - Use: student_001 / student123
   - Should redirect to dashboard

3. **Can Apply Leave**
   - Fill leave form
   - Submit
   - Should see success message

4. **Can View Status**
   - Applied leave shows in list
   - Status shows as "pending"

5. **Notifications Working**
   - Badge shows count
   - Can mark as read

---

## 🚨 IF SOMETHING BREAKS

### Step 1: Reset Database
```bash
node create-tables.js
node seed-test-users.js
```

### Step 2: Restart Server
```bash
# Kill existing process
# Then restart
node server.js
```

### Step 3: Clear Browser Cache
1. Press Ctrl + Shift + Delete (Chrome/Firefox)
2. Clear all cache
3. Reload page

### Step 4: Check Logs
Look at console output for error messages

---

## 📋 MINIMAL WORKING SETUP

If you want to test with minimal setup:

1. Start server:
   ```bash
   node server.js
   ```

2. Test API:
   ```bash
   node test-api-quick.js
   ```

3. If tests pass, system is working ✅

---

## 🔐 Security Reminders

⚠️ **IMPORTANT FOR SUBMISSION**:

1. The hardcoded password `software20developer@2006` in server.js is for the demo/evaluation only
2. For production, use environment variables:
   ```bash
   DB_PASSWORD=your_secret_password
   ```

3. The SECRET_KEY in server.js should be randomized
4. Enable HTTPS in production (not needed for college demo)

---

## 📞 Still Having Issues?

1. Check the error message in console
2. Verify the issue is in this troubleshooting guide
3. Check STARTUP_GUIDE.md for detailed instructions
4. Ensure all prerequisites are met:
   - Node.js installed
   - MySQL running
   - Port 5000 available

---

## ✨ Pro Tips

1. **Keep terminal open** while demonstrating
   - Shows live logs of activities
   - Proves backend is running

2. **Test in incognito window** to avoid cache issues
   - Prevents token caching issues
   - Shows fresh login each time

3. **Have backup test data**
   - Already seeded 5 test users
   - Run seed script if needed

4. **Keep documentation handy**
   - STARTUP_GUIDE.md for quick reference
   - SUBMISSION_CHECKLIST.md for completeness

---

## 🎯 Success Indicators

You'll know everything is working when you see:

✅ Server console shows:
```
✅ Server running on http://localhost:5000
✅ MySQL connected
```

✅ Test script shows:
```
✅ Login successful!
✅ Leave application: PASSING
✅ All tests completed!
```

✅ Frontend loads without errors
✅ Can login with test credentials
✅ Can apply leave and see it in list

---

**If all above show ✅, your system is READY FOR SUBMISSION!**
