const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Handle SPA routing - redirect to login page by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/login/login.html'));
});

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Catch-all for any other routes - serve login page
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/login/login.html'));
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║     🚀 Frontend Server Running Successfully               ║
╚════════════════════════════════════════════════════════════╝
📍 Frontend URL: http://localhost:${PORT}/login/login.html
📍 Backend URL: http://localhost:5000
🏫 College: STUDYWORLD COLLEGE OF ENGINEERING
✅ Access login at: http://localhost:${PORT}/login/login.html
✅ CORS is enabled on backend - should work now!
╚════════════════════════════════════════════════════════════╝
  `);
});
