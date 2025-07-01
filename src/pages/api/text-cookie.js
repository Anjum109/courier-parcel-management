import cookie from 'cookie';

export default function handler(req, res) {
    try {
        const cookies = cookie.parse(req.headers.cookie || '');
        res.status(200).json({ cookies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
