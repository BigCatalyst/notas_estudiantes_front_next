"use client";
import LogoutButton from "@/components/LogoutButton";
import Perfil from "@/components/perfil";
import { useLogout } from "@/hooks/useLogout";

export default function Page() {
  const { callLogout } = useLogout();

  function handlerLogout() {
    callLogout();
  }
  return (
    <>
      <h1>Logueado</h1>
      <Perfil />
      <button onClick={handlerLogout}>Logout</button>
      <LogoutButton/>
    </>
  );
}
