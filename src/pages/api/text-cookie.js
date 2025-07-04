// pages/api/test-cookie.js
import cookie from 'cookie';

export default function handler(req, res) {
    const parsed = cookie.parse('token=abc123; session=true');
    res.status(200).json(parsed);
}

