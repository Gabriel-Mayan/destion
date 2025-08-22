"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import toastConfig from "@config/toast.config";

import { SocketProvider } from "@context/SocketContext";
import { CustomThemeProvider } from "@context/ThemeContext";

import LayoutManager from "@components/Bases/Layout/LayoutManager";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <CustomThemeProvider>
      <SessionProvider>
        <SocketProvider>
          <LayoutManager>
            <ToastContainer {...toastConfig} />
            {children}
          </LayoutManager>
        </SocketProvider>
      </SessionProvider>
    </CustomThemeProvider>
  );
}
