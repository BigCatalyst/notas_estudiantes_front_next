import Auth from '@/components/Auth';
import { useAppSelector } from '@/store/hooks';
const DashboardPage = () => {
    const { user } = useAppSelector(state => state.auth)
  
    return (
      <div>
        <h1>Dashboard</h1>
          {user && <p>Bienvenido {user.username} tu rol es {user.role}</p>}
      </div>
    );
  };
  
  export default Auth(DashboardPage, ['admin','user']);
