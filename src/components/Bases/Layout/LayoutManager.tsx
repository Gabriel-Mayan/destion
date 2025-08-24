"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import DefaultLayout from "@components/Bases/Layout/DefaultLayout";
import AuthenticatedLayout from "@components/Bases/Layout/AuthenticatedLayout";

export default function LayoutManager({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isProfileRoute = pathname.startsWith("/home");

  const Layout = isProfileRoute ? (props: any) => <AuthenticatedLayout {...props} session={session} /> : DefaultLayout;

  return <Layout>{children}</Layout>;
}
