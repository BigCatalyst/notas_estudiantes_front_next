"use client";

import { logout } from "@/services/api";
import { getUrlLogin } from "@/utils/utils-loguin";
import { useRouter } from "next/navigation";

// Función para hacer logout
export function useLogout() {
  // Redirige al usuario a la página de login
  const router = useRouter();
  const callLogout = async (msg = null) => {
    await logout();
    router.push(getUrlLogin(msg));
  };

  return { callLogout };
}
