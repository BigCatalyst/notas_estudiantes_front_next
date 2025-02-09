// app/layout.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { logout } from "@/services/api";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const  isAuthenticated  = useAuthStore((state) => state.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      logout({
        redirectToLogin: true,
        msg: "No esta logueado",
        callLogout: false,
      });
      return;
    }
  }, [isAuthenticated]);

  return <>Protegido Autenticado{children}</>;
}
