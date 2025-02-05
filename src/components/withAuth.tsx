"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const { user, roles } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        // Si el usuario no está autenticado, redirige a la página de login
        router.push('/login');
      } else if (allowedRoles.length > 0 && !roles.some(role => allowedRoles.includes(role))) {
        // Si el usuario no tiene los roles permitidos, redirige a una página de acceso denegado
        router.push('/access-denied');
      }
    }, [user, roles, router]);

    if (!user || (allowedRoles.length > 0 && !roles.some(role => allowedRoles.includes(role)))) {
      return null; // O un componente de carga
    }

    return <WrappedComponent {...props} />;
  };
};