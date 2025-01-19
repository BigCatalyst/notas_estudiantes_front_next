// pages/login.tsx
import { useState } from 'react';

import { login } from '@/store/authSlice'; // Importamos el action login
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/router';
import { loginUser } from '@/services/auth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
 const dispatch = useAppDispatch()
 const router = useRouter()

  const handleLogin = async () => {
    try {
      const response = await loginUser({ username, password });
     dispatch(login({ token:response.token, user: response.user })) // Despachamos la accion de login en redux
     router.push('/')
    } catch (err:any) {
      setError(err.message || 'Error de autenticación');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;