// pages/api/auth/logout.js
export default function handler(req, res) {
    // Remove the cookie by setting Max-Age=0
    res.setHeader(
        "Set-Cookie",
        `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`
    );

    res.status(200).json({ message: "Logged out" });
}
