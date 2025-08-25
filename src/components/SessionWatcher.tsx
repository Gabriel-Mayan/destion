"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SessionWatcher() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "AccessTokenExpired") {
      signOut({ redirect: false });

      router.push("/login");
    }
  }, [router, session]);

  return null;
}
