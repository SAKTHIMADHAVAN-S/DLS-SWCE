ERP Full-stack Demo (Express + React)

Quick start:

1. Backend

```bash
cd "c:\Users\Dell 7410\OneDrive\Web Design\SAKTHI Portfolio\Web Design\Digital Leave Letter System\server"
npm install
# create a .env based on .env.example and fill DB + SMTP values
node index.js
```

2. Frontend

```bash
cd "c:\Users\Dell 7410\OneDrive\Web Design\SAKTHI Portfolio\Web Design\Digital Leave Letter System\client"
npm install
npm run dev
```

Notes:
- The backend serves uploaded logos under `/uploads/logo/...` and exposes `/api/settings/logo`.
- OTP is sent via SMTP; the logo is embedded inline using CID.
- This scaffold provides the routes and a React Router dashboard skeleton. Further modules (attendance realtime, approvals) can be implemented using the socket.io connection on the server.
