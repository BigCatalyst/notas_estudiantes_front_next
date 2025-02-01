"use client";
import { store } from "@/redux/store";
import { me } from "@/services/api/users";
import { useEffect, useState } from "react";
export default function Perfil() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const state = store.getState();
  const { isAuthenticated, user } = state.auth;
  console.log(`2isAuthenticated: ${isAuthenticated}`);

  useEffect(() => {
    // Función para obtener los datos del usuario
    const fetchUserData = async () => {
      try {
        const response = await me();
        // console.log(response.data);
        setUserData(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      {userData ? (
        <div>
          <p>
            <strong>Nombre:</strong> {userData.first_name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>username:</strong> {userData.username}
          </p>
          {/* Agrega más campos según los datos que devuelva tu API */}
        </div>
      ) : (
        <p>No se encontraron datos del usuario.</p>
      )}
    </div>
  );
}
