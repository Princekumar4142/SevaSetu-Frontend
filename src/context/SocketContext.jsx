import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { currentUser, isAuthenticated } = useAuth();

  useEffect(() => {
    let newSocket;
    if (isAuthenticated && currentUser) {
      // Determine socket base URL dynamically
      const apiEnv = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL;
      let socketUrl = "http://localhost:5000";
      if (apiEnv) {
        socketUrl = apiEnv.replace(/\/api\/?$/, "");
      } else if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
        socketUrl = `${window.location.protocol}//${window.location.host}`;
      }

      try {
        newSocket = io(socketUrl, {
          withCredentials: true,
          reconnectionAttempts: 3,
          timeout: 5000,
          transports: ["websocket", "polling"],
        });

        newSocket.on("connect", () => {
          console.log("[Socket] Connected:", newSocket.id);
          if (currentUser.role === "WORKER") {
            newSocket.emit("register_worker", { workerId: currentUser._id });
          }
        });

        newSocket.on("connect_error", (err) => {
          console.warn("[Socket] Connection error:", err.message);
        });

        newSocket.on("disconnect", () => {
          console.log("[Socket] Disconnected");
        });

        setSocket(newSocket);
      } catch (err) {
        console.warn("[Socket] Init failed:", err?.message || err);
      }
    }

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [isAuthenticated, currentUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
