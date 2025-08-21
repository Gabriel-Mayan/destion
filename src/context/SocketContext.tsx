/* eslint-disable no-console */
"use client";

import { useSession } from "next-auth/react";
import { type Socket, io } from "socket.io-client";
import React, { createContext, useEffect, useState } from "react";

import { socketEndpoint } from "@config/socket.config";

type SocketContextType = {
  socket: Socket | null;
  socketIsConnected: boolean;
};

type SocketProviderType = {
  children: React.ReactNode;
};

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  socketIsConnected: false,
});

export const SocketProvider = ({ children }: SocketProviderType) => {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketIsConnected, setSocketIsConnected] = useState(false);

  useEffect(() => {
    if (!session || !socket) return;

    const initialSocket = io(socketEndpoint, {
      transports: ["websocket", "polling"],
      autoConnect: true,
      auth: { token: session.user.token },
    });

    setSocket(initialSocket);

    initialSocket.on("connect", () => {
      console.log("Socket conectado!");

      setSocketIsConnected(true);
    });

    initialSocket.on("disconnect", () => {
      console.log("Socket desconectado.");

      setSocketIsConnected(false);
    });

    initialSocket.on("boas-vindas", (data) => {
      console.log(data.mensagem);
    });

    return () => {
      initialSocket.disconnect();
    };
  }, [session, socket]);

  return <SocketContext.Provider value={{ socket, socketIsConnected }}>{children}</SocketContext.Provider>;
};
