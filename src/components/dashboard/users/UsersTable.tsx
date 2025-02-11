/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Group, User } from "./Types";
import ApiService from "@/services/ApiService";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<{
    email__contains?: string;
    first_name__contains?: string;
    last_name__contains?: string;
    username__contains?: string;
    groups__name__contains?: string;
    id?: string;
    is_active?: string;
  }>({});

  const handleEdit = (user: User) => {
    // Lógica para editar
    console.log(user);
  };

  const handleDelete = (userId: number) => {
    // Lógica para eliminar
    console.log(userId);
  };

  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        params.set(key, value);
      }
    });

    return params.toString();
  };

  const fetchUsers = async () => {
    try {
      const query = buildQueryString();
      const data = await ApiService.users(`${query}`);

      if (data) {
        console.log("---------------------------------");
        console.log(data);
        setUsers(data.results);
        setTotalPages(Math.ceil(data.count / 10)); // Asume 10 items por página
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [filters, currentPage]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por email"
          className="p-2 border rounded"
          onChange={(e) =>
            handleFilterChange("email__contains", e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="p-2 border rounded"
          onChange={(e) =>
            handleFilterChange("first_name__contains", e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Buscar por apellido"
          className="p-2 border rounded"
          onChange={(e) =>
            handleFilterChange("last_name__contains", e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Buscar por grupo"
          className="p-2 border rounded"
          onChange={(e) =>
            handleFilterChange("groups__name__contains", e.target.value)
          }
        />
        <select
          className="p-2 border rounded bg-no-repeat bg-[length:22px] appearance-none"
          onChange={(e) => handleFilterChange("is_active", e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Usuario</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Apellido</th>
              <th className="p-3 text-left">Grupos</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id} className="border-b border-b-gray-300">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.first_name}</td>
                  <td className="p-3">{user.last_name}</td>
                  <td className="p-3">
                    {user.groups.map((group: Group) => group.name).join(", ")}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.is_active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
