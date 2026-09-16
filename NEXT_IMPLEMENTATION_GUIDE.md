# Quick Implementation Guide - Leave Letter PDF & Next Steps

## Current State Summary

✅ **COMPLETE THIS SESSION**:
- Password reset endpoints (4 new)
- Leave approval workflow (3 new endpoints)
- Automated notifications throughout workflow
- Enhanced email templates
- Database schema updates for password reset
- Student dashboard View Letter button

⏳ **PENDING - Next Priority**:
- Leave letter PDF generation
- Closing option selection during application
- Integration in approval dashboards
- PDF email attachments

---

## Phase 1: Leave Letter PDF Generation (NEXT)

### Step 1: Install PDF Library
```bash
npm install pdfkit
```

### Step 2: Create PDF Generation Service
Create `backend/services/PDFService.js`:

```javascript
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class PDFService {
  constructor() {
    this.outputDir = path.join(__dirname, '../../leave-letters');
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  generateLeaveLetter(leaveData) {
    const doc = new PDFDocument();
    const filename = `leave-${leaveData.id}-${Date.now()}.pdf`;
    const filepath = path.join(this.outputDir, filename);
    
    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    // Header with date and place
    doc.fontSize(11).text(new Date().toLocaleDateString('en-GB'), 50, 50, { align: 'left' });
    doc.text(leaveData.place || 'Coimbatore', 450, 50, { align: 'right' });

    // Sender info
    doc.fontSize(10).text('From:', 50, 100);
    doc.text(leaveData.studentName);
    doc.text(leaveData.year);
    doc.text(leaveData.department);
    doc.text(leaveData.collegeName);

    // Recipient info
    doc.text('To:', 50, 170);
    doc.text('The Principal,');
    doc.text(leaveData.collegeName);

    // Subject
    doc.fontSize(10).text(`Subject: Leave application for ${leaveData.reason}`, 50, 240, { underline: true });

    // Body
    doc.fontSize(10).text('Respected Sir/Madam,', 50, 270);
    
    const bodyText = `I, ${leaveData.studentName}, hereby request your gracious permission to leave for ${Math.ceil((new Date(leaveData.toDate) - new Date(leaveData.fromDate)) / (1000 * 60 * 60 * 24))} days from ${leaveData.fromDate} to ${leaveData.toDate} for ${leaveData.reason}.

I assure you that all my pending academic work will be completed before my leave. I shall abide by all college rules and regulations and return on the given date.

Thanking you for your consideration.`;

    doc.text(bodyText, 50, 290, { width: 450, align: 'justify' });

    // Closing
    const closingOption = leaveData.closingOption || 'Yours obediently';
    doc.text(closingOption, 50, 420);
    doc.text('(Faithfully / Truthfully / Respectfully)', 50, 450);

    // Signature
    doc.text('', 50, 480);
    doc.text(new Date().toLocaleDateString('en-GB'), 50, 510);
    doc.text(leaveData.studentName, 50, 540);

    doc.end();

    return new Promise((resolve, reject) => {
      stream.on('finish', () => resolve(filename));
      stream.on('error', reject);
    });
  }
}

module.exports = PDFService;
```

### Step 3: Update server.js to Use PDFService

```javascript
const PDFService = require('./backend/services/PDFService');
const pdfService = new PDFService();

// In apply-leave endpoint, after inserting leave:
const pdfFilename = await pdfService.generateLeaveLetter({
  id: leaveId,
  studentName: studentUsername,
  year: '2nd Year',
  department: department,
  collegeName: 'Your College Name',
  place: 'Coimbatore',
  fromDate: new Date(fromDate).toLocaleDateString(),
  toDate: new Date(toDate).toLocaleDateString(),
  reason: reason,
  closingOption: 'Yours obediently'
});

// Update database with PDF path
await db.query(
  "UPDATE leaves SET letter_pdf_path = ?, letter_generated_at = NOW() WHERE id = ?",
  [pdfFilename, leaveId]
);
```

---

## Phase 2: Add Closing Option Selection

### Step 1: Update Apply Leave Form in Student Dashboard

In `frontend/student/dashboard.html`, update the form:

```html
<div class="form-group">
  <label>Closing Option:</label>
  <select id="closingOption" required>
    <option value="">Select closing...</option>
    <option value="Yours faithfully">Yours faithfully</option>
    <option value="Yours truly">Yours truly</option>
    <option value="Respectfully">Respectfully</option>
  </select>
</div>
```

### Step 2: Update applyLeave Function

```javascript
async function applyLeave(e) {
  e.preventDefault();

  const fromDate = document.getElementById('fromDate').value;
  const toDate = document.getElementById('toDate').value;
  const reason = document.getElementById('reason').value;
  const closingOption = document.getElementById('closingOption').value; // NEW

  try {
    const response = await fetch(`${API_URL}/apply-leave`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({ 
        fromDate, 
        toDate, 
        reason,
        closingOption  // NEW
      })
    });
    // ... rest of code
  }
}
```

### Step 3: Update Backend to Accept closingOption

In `server.js` `/apply-leave` endpoint:

```javascript
const { fromDate, toDate, reason, closingOption } = req.body;

// When inserting leave:
const [result] = await db.query(
  `INSERT INTO leaves (username, fromDate, toDate, reason, status, closing_option, created_at)
   VALUES (?, ?, ?, ?, 'pending', ?, NOW())`,
  [studentUsername, fromDate, toDate, reason, closingOption]
);
```

---

## Phase 3: Add Closing Option to Database

Create migration script `migrate-leave-letters.js`:

```javascript
const mysql = require("mysql2/promise");

async function migrate() {
  const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "software20developer@2006",
    database: "leave_system"
  });

  try {
    console.log("🔄 Adding leave letter columns...");

    const queries = [
      `ALTER TABLE leaves ADD COLUMN closing_option VARCHAR(50) NULL DEFAULT 'Yours obediently'`,
      `ALTER TABLE leaves ADD COLUMN letter_pdf_path VARCHAR(255) NULL`,
      `ALTER TABLE leaves ADD COLUMN letter_generated_at TIMESTAMP NULL`
    ];

    for (const query of queries) {
      try {
        await db.query(query);
        console.log("✅ Column added/exists");
      } catch (err) {
        if (err.code === "ER_DUP_FIELDNAME") {
          console.log("⚠️  Column already exists");
        }
      }
    }

    console.log("✅ Migration completed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  } finally {
    await db.end();
  }
}

migrate();
```

Run: `node migrate-leave-letters.js`

---

## Phase 4: Display Leave Letters in Dashboards

### Faculty Dashboard Enhancement

In `frontend/faculty/dashboard.html`, add View Letter button:

```javascript
// In loadPendingLeaves function, add action column:
row.innerHTML += `
  <td>
    <button onclick="viewLeaveLetter(${leave.id})" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
      📄 View Letter
    </button>
  </td>
`;

function viewLeaveLetter(leaveId) {
  // Fetch leave details and generate letter or open existing PDF
  window.open(`../leave-letter.html?id=${leaveId}`, '_blank');
}
```

Same for HOD and Principal dashboards.

---

## Phase 5: Email PDF Attachments

Update NotificationService to attach PDFs:

```javascript
async sendEmailWithAttachment(recipient, subject, htmlContent, attachmentPath) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@leavesystem.com',
      to: recipient,
      subject: subject,
      html: htmlContent,
      attachments: attachmentPath ? [{
        path: attachmentPath,
        filename: `leave-letter.pdf`
      }] : undefined
    };

    emailTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('❌ [EMAIL ERROR]', err);
      } else {
        console.log(`✅ [EMAIL SENT WITH ATTACHMENT] To: ${recipient}`);
      }
    });
  } catch (err) {
    console.error('❌ [EMAIL SERVICE ERROR]', err);
  }
}
```

---

## Testing Checklist

- [ ] PDF generated when leave applied
- [ ] PDF saved to correct directory
- [ ] Closing option stored in database
- [ ] Leave letter displays correctly in students dashboard
- [ ] View Letter button works in Faculty dashboard
- [ ] View Letter button works in HOD dashboard
- [ ] View Letter button works in Principal dashboard
- [ ] PDF opens in new tab/window
- [ ] Print functionality works
- [ ] Download PDF works
- [ ] Email contains PDF attachment
- [ ] Full workflow: Student → Faculty → HOD → Principal

---

## File Structure After Implementation

```
├── backend/
│   └── services/
│       ├── NotificationService.js (updated)
│       └── PDFService.js (new)
├── leave-letters/  (new folder for PDFs)
│   └── leave-1-1234567890.pdf
├── frontend/
│   ├── student/
│   │   └── dashboard.html (updated with closing option)
│   ├── faculty/
│   │   └── dashboard.html (updated with view letter)
│   ├── hod/
│   │   └── dashboard.html (updated with view letter)
│   ├── principal/
│   │   └── dashboard.html (updated with view letter)
│   └── leave-letter.html (existing)
├── migrate-leave-letters.js (new)
├── server.js (updated)
└── API_REFERENCE.md (this file)
```

---

## Command Reference

```bash
# Run migrations
node migrate-password-reset.js
node migrate-leave-letters.js

# Start server
npm start

# Test endpoints
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"student","password":"password"}'
```

---

## Estimated Time to Complete

- Phase 1 (PDF Generation): 1-2 hours
- Phase 2 (Closing Option): 30 minutes
- Phase 3 (Database): 15 minutes
- Phase 4 (Dashboard Integration): 1 hour
- Phase 5 (Email Attachments): 30 minutes

**Total**: ~4 hours for complete implementation

---

## Support

All error handling, logging, and activity tracking are already in place. The NotificationService will automatically log all actions for audit trail.

For questions about specific endpoints, refer to API_REFERENCE.md

---

**Created**: Current Session  
**Status**: Ready for implementation  
**Next Developer**: Follow phases 1-5 in order

