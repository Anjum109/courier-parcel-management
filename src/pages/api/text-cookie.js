// pages/api/test-cookie.js
import cookie from 'cookie';

export default function handler(req, res) {
    const parsed = cookie.parse('token=abc123; session=true');
    res.status(200).json(parsed);
}


// http://localhost:3000/api/parcels/my
// http://localhost:3000/api/parcels/metrics
// http://localhost:3000/api/parcels/report
// http://localhost:3000/api/me
// /api/parcels/assigned
// http://localhost:3000/api/parcels/update-status
// token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODYzODhiMjk5Y2E0NGNlZjc2Y2E4ZDEiLCJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc1MTQ2NDA5MywiZXhwIjoxNzUyMDY4ODkzfQ.lIuLoG6b0nUk0NhZxn-BS1tg2ZIcTb4unBsJTaduKVk
// http://localhost:3000/api/users
// http://localhost:3000/api/users/agents
// token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODYzOGI3Mzk5Y2E0NGNlZjc2Y2E4ZDUiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MTQ2NjM4NSwiZXhwIjoxNzUyMDcxMTg1fQ.XG2Fib - bl1a64hJ1w9LmrUNpkLvA_bC9jRC - Kj4rQ2Q