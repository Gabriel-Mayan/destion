"use client";

// import { usePathname } from "next/navigation";

import DefaultLayout from "@components/Bases/Layout/DefaultLayout";
// import AuthenticatedLayout from "@components/Bases/Layout/AuthenticatedLayout";

export default function LayoutManager({ children }: { children: React.ReactNode }) {
  // const pathname = usePathname();

  // const isProfileRoute = pathname.startsWith("/profile");

  // const Layout = isProfileRoute ? AuthenticatedLayout : DefaultLayout;

  return <DefaultLayout>{children}</DefaultLayout>;
}
