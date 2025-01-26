"use client";

import { logout } from "@/services/api";
import { getUrlLogin } from "@/utils/utils-loguin";
import { useRouter } from "next/navigation";

// Función para hacer logout
export function useLogout(msg = null) {
  // Redirige al usuario a la página de login
  const router = useRouter();
  const callLogout = async () => {
    await logout();
    router.push(getUrlLogin());
  };

  return { callLogout };
}
