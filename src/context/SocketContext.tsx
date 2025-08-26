/* eslint-disable no-console */
"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { type Socket, io } from "socket.io-client";
import React, { createContext, useEffect, useState } from "react";

import { socketEndpoint } from "@config/socket.config";

import { showToast } from "@utils/notify.util";

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
  const pathname = usePathname();
  const { data: session } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketIsConnected, setSocketIsConnected] = useState(false);

  useEffect(() => {
    if (!session) return;

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

    initialSocket.on("message", (event) => {
      if (event.type !== "created") return;

      const inChat = pathname === `/home/chat/${event.chatId}`;

      if (!inChat) {
        showToast({
          type: "info",
          message: `[${event.message.chat.title}] ${event.message.sender.name} - ${event.message.content}`,
          theme: "colored",
          duration: 5000,
        });
      }
    });

    return () => {
      initialSocket.disconnect();
    };
  }, [pathname, session]);

  return <SocketContext.Provider value={{ socket, socketIsConnected }}>{children}</SocketContext.Provider>;
};
