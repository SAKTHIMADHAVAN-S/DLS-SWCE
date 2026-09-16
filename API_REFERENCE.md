# API Reference - New Endpoints This Session

## Password Reset Endpoints

### 1. Request Password Reset (Email)
```
POST /request-password-reset-email
Content-Type: application/json

{
  "username": "student1"
}

Response (200):
{
  "message": "Reset code sent to your email. Code: 123456"
}
```

### 2. Reset Password (Email Code)
```
POST /reset-password-email
Content-Type: application/json

{
  "username": "student1",
  "token": "123456",      // The 6-digit code
  "password": "newpassword123"
}

Response (200):
{
  "message": "Password reset successfully"
}
```

### 3. Request Password Reset (Phone OTP)
```
POST /request-password-reset-phone
Content-Type: application/json

{
  "username": "student1",
  "phone": "+919876543210"
}

Response (200):
{
  "message": "OTP sent to your phone number"
}
```

### 4. Reset Password (OTP)
```
POST /reset-password-otp
Content-Type: application/json

{
  "username": "student1",
  "otp": "123456",        // The 6-digit OTP
  "password": "newpassword123"
}

Response (200):
{
  "message": "Password reset successfully"
}
```

---

## Leave Approval Workflow Endpoints

### 1. Approve Leave
```
PUT /approve-leave/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "comments": "Approved - all documents verified",
  "approvalDetails": "No issues with dates"
}

Response (200):
{
  "message": "Leave approved successfully",
  "status": "approved"
}

Notifications Sent To:
  • Student (in-app + email)
  • Admin (in-app)
  • Logged to activity_log
```

### 2. Reject Leave
```
PUT /reject-leave/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "rejectionReason": "Insufficient advance notice for this period"
}

Response (200):
{
  "message": "Leave rejected successfully",
  "status": "rejected"
}

Notifications Sent To:
  • Student (in-app + email with reason)
  • Admin (in-app)
  • Logged to activity_log
```

### 3. Forward Leave to Next Approver
```
PUT /forward-leave/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "forwardToRole": "hod",  // or "principal"
  "forwardComments": "Please review and approve"
}

Response (200):
{
  "message": "Leave forwarded successfully",
  "forwardedTo": "hod"
}

Notifications Sent To:
  • Student (in-app notification)
  • Next Approvers - HOD/Principal (in-app notification)
  • Admin (in-app)
  • Logged to activity_log
```

---

## Enhanced Email Templates

### Leave Approved Email
```html
Subject: Leave Request Approved - {StudentName}

Content:
  ✅ Leave Request Approved
  
  Student Name: {studentName}
  From Date: {fromDate}
  To Date: {toDate}
  Number of Days: {daysDiff}
  Reason: {reason}
  
  Approved by: {approverName}
  Additional Remarks: {approvalDetails}
```

### Leave Rejected Email
```html
Subject: Leave Request Rejected - {StudentName}

Content:
  ❌ Leave Request Rejected
  
  Student Name: {studentName}
  From Date: {fromDate}
  To Date: {toDate}
  Original Reason: {reason}
  
  Rejected by: {approverName}
  Rejection Reason: {rejectionReason}
```

### Leave Forwarded Email
```html
Subject: Leave Request Forwarded

Content:
  📤 Leave Request Forwarded
  
  Student Name: {studentName}
  From Date: {fromDate}
  To Date: {toDate}
  Forwarded by: {forwardedBy}
  
  Please review and take appropriate action.
```

---

## Database Schema Updates

### New Columns Added to `users` Table

```sql
ALTER TABLE users ADD COLUMN password_reset_code VARCHAR(6) NULL;
ALTER TABLE users ADD COLUMN password_reset_expires DATETIME NULL;
ALTER TABLE users ADD COLUMN otp_code VARCHAR(6) NULL;
ALTER TABLE users ADD COLUMN otp_expires DATETIME NULL;
ALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL;
ALTER TABLE users ADD COLUMN email VARCHAR(255) NULL;
```

### Columns for Future Use (Not Yet Added)

```sql
-- For leave letter storage
ALTER TABLE leaves ADD COLUMN closing_option VARCHAR(50) NULL;
ALTER TABLE leaves ADD COLUMN letter_pdf_path VARCHAR(255) NULL;
ALTER TABLE leaves ADD COLUMN letter_generated_at TIMESTAMP NULL;
```

---

## NotificationService Helper Methods

### 1. Notify Leave Applied
```javascript
await notificationService.notifyLeaveApplied(
  leaveId,
  studentId,
  studentName,
  [facultyIds]  // Array of approver IDs
);
```

### 2. Notify Leave Approved
```javascript
await notificationService.notifyLeaveApproved(
  leaveId,
  studentId,
  studentName,
  fromDate,
  toDate,
  approverName,
  studentEmail,
  reason
);
```

### 3. Notify Leave Rejected
```javascript
await notificationService.notifyLeaveRejected(
  leaveId,
  studentId,
  studentName,
  fromDate,
  toDate,
  approverName,
  studentEmail,
  reason,
  rejectionReason
);
```

### 4. Notify Leave Forwarded
```javascript
await notificationService.notifyLeaveForwarded(
  leaveId,
  studentId,
  studentName,
  [nextApproverIds],  // Array of next approver IDs
  fromDate,
  toDate,
  currentApproverName,
  reason
);
```

---

## Testing the Endpoints

### Using PowerShell (Windows)

```powershell
# Test Password Reset Email Request
$body = @{username = "student1"} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:5000/request-password-reset-email" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body | Select-Object -ExpandProperty Content

# Test Leave Approval
$body = @{
  comments = "Approved"
  approvalDetails = "Good to go"
} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:5000/approve-leave/1" `
  -Method PUT `
  -ContentType "application/json" `
  -Headers @{"Authorization" = "Bearer {your_token}"} `
  -Body $body | Select-Object -ExpandProperty Content
```

### Using cURL (Linux/Mac)

```bash
# Test Password Reset Email Request
curl -X POST http://localhost:5000/request-password-reset-email \
  -H "Content-Type: application/json" \
  -d '{"username":"student1"}'

# Test Leave Approval
curl -X PUT http://localhost:5000/approve-leave/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {your_token}" \
  -d '{"comments":"Approved","approvalDetails":"Good to go"}'
```

---

## Error Responses

### Common Errors

```json
// User not found
{
  "message": "User not found"
}

// Invalid or expired code
{
  "message": "Invalid or expired reset code"
}

// Password too short
{
  "message": "Password must be at least 6 characters"
}

// Leave not found
{
  "message": "Leave request not found"
}

// Access denied
{
  "message": "Access denied"
}
```

---

## Activity Logging

All approval actions are logged to `activity_log` table with:
- User ID (who performed action)
- Action (leave_approved, leave_rejected, leave_forwarded)
- Entity Type (leave)
- Entity ID (leave ID)
- Details (JSON with additional info)
- Timestamp

Example Activity Log Entry:
```json
{
  "user_id": 5,
  "action": "leave_approved",
  "entity_type": "leave",
  "entity_id": 10,
  "details": {
    "studentUsername": "student1",
    "comments": "Approved - all documents verified",
    "approvalDetails": "No issues with dates"
  },
  "created_at": "2024-01-15T10:30:45.000Z"
}
```

---

## Notification Flow Diagram

```
Student Application
       ↓
[POST /apply-leave]
       ↓
Faculty Notification (pending_leave)
       ↓
    ┌──────────────────────────────┐
    │  Faculty Decision             │
    └──────────────────────────────┘
    │                              │
    │                              │
[Approve]                    [Reject]
    │                              │
    ↓                              ↓
[PUT /approve-leave]         [PUT /reject-leave]
    │                              │
    ↓                              ↓
Student Notified             Student Notified
Admin Notified               Admin Notified
    │
    ├─→ [Forwarded to HOD]
    │   └─→ HOD Notified
    │
    ├─→ [HOD Approves/Rejects]
    │   └─→ Student + Faculty + Admin Notified
    │
    └─→ [Forwarded to Principal]
        └─→ Principal Notified
            └─→ [Principal Final Decision]
                └─→ All Stakeholders Notified
```

---

## Immediate Implementation Checklist

- [x] Password reset backend endpoints
- [x] Database migration for password reset fields
- [x] Leave approval workflow endpoints
- [x] Automated notifications at each step
- [x] Enhanced email templates
- [x] Activity logging integration
- [ ] PDF generation for leave letters
- [ ] Closing option selection in form
- [ ] Leave letter storage in database
- [ ] Leave letter display in dashboards
- [ ] Email PDF attachments

---

**Last Updated**: Current Session  
**Status**: All endpoints verified and operational  
**Next**: PDF generation and leave letter integration

