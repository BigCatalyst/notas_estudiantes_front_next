"use client";
import { Provider } from "react-redux";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/contexts/AuthContext";

export default function AotrizacionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
     const { user, roles } = useAuth();
        const router = useRouter();
        const allowedRoles = ['admin', 'editor'];
    
        useEffect(() => {
          if (!user) {
            // Si el usuario no está autenticado, redirige a la página de login
            router.push('/login');
          } else if (allowedRoles.length > 0 && !roles.some(role => allowedRoles.includes(role))) {
            // Si el usuario no tiene los roles permitidos, redirige a una página de acceso denegado
            router.push('/access-denied');
          }
        }, [user, roles, router]);
  return <>{children}</>;
}