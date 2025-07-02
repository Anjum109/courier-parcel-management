import { Server } from "socket.io";

export default function handler(req, res) {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server, {
            path: "/api/socket",  // must match client path
        });

        io.on("connection", (socket) => {
            console.log("Socket connected:", socket.id);
        });

        res.socket.server.io = io;
    }
    res.end();
}
