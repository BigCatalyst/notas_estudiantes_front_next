import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/authSlice';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const dispatch = useAppDispatch();
   const router = useRouter()

  const handleLogout = () => {
     dispatch(logout())
     router.push('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;