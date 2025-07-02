import { io } from "socket.io-client";

let socket;

export const initSocket = () => {
    if (!socket) {
        socket = io({
            path: "/api/socket",  // <== Make sure backend socket path matches this
        });

        socket.on("connect", () => {
            console.log("🟢 Connected to socket server:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("🔴 Disconnected from socket server");
        });
    }
    return socket;
};

export const getSocket = () => socket;