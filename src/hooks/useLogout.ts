"use client";


import { useAuth } from "@/contexts/AuthContext";
import { getUrlLogin } from "@/utils/utils-loguin";
import { useRouter } from "next/navigation";

// Función para hacer logout
export function useLogout(msg = null) {
  // Redirige al usuario a la página de login
  const router = useRouter();
  const { logout } = useAuth();
  const callLogout = async () => {
    await logout();
    router.push(getUrlLogin());
  };

  return { callLogout };
}
