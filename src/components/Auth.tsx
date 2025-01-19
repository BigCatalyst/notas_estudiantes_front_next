import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// type Props = {
//   children: React.ReactNode;
//   requiredRoles: string[];
// };
// const Auth = ({children, requiredRoles} :Props) => {
const Auth = (WrappedComponent: any, requiredRoles: string[] = []) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
     if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.includes(user?.role || '')){
        router.push('/404');
    }
  }, [isAuthenticated, router, user, requiredRoles]);
  // Si el usuario no esta autenticado o no tiene el rol requerido no se muestra el componente
  if (!isAuthenticated || (requiredRoles && requiredRoles.length > 0 && !requiredRoles.includes(user?.role || '')) ) {
    return <></>;
  }

  return <WrappedComponent />;
};

export default Auth;