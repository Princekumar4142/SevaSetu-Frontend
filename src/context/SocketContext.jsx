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
      // Connect to backend URL where Socket.io is attached
      newSocket = io("http://localhost:5000", {
        withCredentials: true,
      });

      newSocket.on("connect", () => {
        console.log("[Socket] Connected:", newSocket.id);
        // If it's a worker, register them
        if (currentUser.role === "WORKER") {
          newSocket.emit("register_worker", { workerId: currentUser._id });
        }
      });

      newSocket.on("disconnect", () => {
        console.log("[Socket] Disconnected");
      });

      setSocket(newSocket);
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
