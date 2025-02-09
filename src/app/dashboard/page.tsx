"use client"
import Perfil from "@/components/perfil";
import { useLogout } from "@/hooks/useLogout";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";

export default function Page() {
  const { callLogout } = useLogout();
  const  isAuthenticated  = useAuthStore((state) => state.isAuthenticated);
  function handlerLogout() {
    callLogout();
  }

  const  [isAuthenticatedState,setAuthenticatedState]  = useState(false);
  useEffect(() => {
    setAuthenticatedState(isAuthenticated);
    
  }, [isAuthenticated]);
  
  return (
    <>
      <h1>Logueado</h1>
      <h2>isAuthenticated: {isAuthenticated}</h2>
      <h2>isAuthenticatedState: {isAuthenticatedState}</h2>
      <Perfil />
      <button onClick={handlerLogout}>Logout</button>
    </>
  );
}
