// src/components/ProtectedLayout.tsx
"use client"; // Necesario para Next.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una carga inicial para verificar el estado de autenticación
    const checkAuth = async () => {
      setIsLoading(true);
      if (!isAuthenticated) {
        router.push("/login"); // Redirige al login si no está autenticado
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [isAuthenticated, router]);

  if (isLoading) {
    return <div>Loading...</div>; // Muestra un spinner o mensaje de carga
  }

  return <>{children}</>;
}