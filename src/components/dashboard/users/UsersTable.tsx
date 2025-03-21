/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { User } from "./Types";
import ApiService from "@/services/ApiService";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiLoaderLine } from "react-icons/ri";
import { BsDatabaseFillX } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import { TbLoader2, TbPlaylistAdd } from "react-icons/tb";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { redirect } from "next/navigation";
import Buttom from "@/components/ui/buttom/Buttom";
import Modal from "@/components/ui/modal/Modal";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagesSize, setPagesSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [initLoadData, setInitLoadData] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userIdDel, setUserIdDel] = useState(-1);

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

    redirect(`/dashboard/users/${user.id}`);
  };

  const handleDelete = (userId: number) => {
    // Lógica para eliminar
    setShowModal(true);
    setUserIdDel(userId);
  };

  const deleteUser = async () => {
    try {
      if (userIdDel !== -1) {
        await ApiService.delUser(userIdDel).then(() => fetchUsers());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buildQueryString = () => {
    const params = new URLSearchParams();
    // if (currentPage > totalPages){
    //   params.set("page", "1");
    // }
    // else params.set("page", currentPage.toString());

    params.set("page", currentPage.toString());

    if (pagesSize > 0) params.set("page_size", pagesSize.toString());
    else {
      const defaultPageSize = 10;
      params.set("page_size", defaultPageSize.toString());
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        params.set(key, value);
      }
    });

    return params.toString();
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const query = buildQueryString();
      const data = await ApiService.users(`${query}`);

      console.log(query);

      if (data) {
        if (initLoadData) setInitLoadData(false);
        console.log("---------------------------------");
        console.log(data);
        setUsers(data.results.reverse());
        if (!pagesSize) setTotalPages(Math.ceil(data.count / 10));
        else setTotalPages(Math.ceil(data.count / pagesSize));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [filters, currentPage, pagesSize]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="inline-flex w-full gap-3">
        {/* Filtros */}
        <div className="relative inline-block group z-10">
          <div className="mb-5">
            <button className="btn1" onClick={() => setOpenFilter(!openFilter)}>
              <IoFilterSharp className="w-6 h-6 text-gray-200" />
            </button>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-sm px-2 py-2 rounded whitespace-nowrap">
            Filtros
          </div>
        </div>

        {/* Adicionar */}
        <div className="mb-5">
          <Buttom
            title="Adicionar"
            icon={TbPlaylistAdd}
            className="btn1"
            to="users/add"
          />
        </div>
      </div>

      <div
        className={
          !openFilter
            ? "transition-all h-0 overflow-hidden opacity-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
            : "transition-all h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 duration-400 shadow-md p-7 shadow-gray-300 rounded-lg"
        }
      >
        <input
          type="text"
          placeholder="Buscar por email"
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) =>
            handleFilterChange("email__contains", e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) =>
            handleFilterChange("first_name__contains", e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Buscar por apellido"
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) =>
            handleFilterChange("last_name__contains", e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Buscar por grupo"
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) =>
            handleFilterChange("groups__name__contains", e.target.value)
          }
        />
        <select
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) => handleFilterChange("is_active", e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>

      {/* Modal */}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        action={deleteUser}
      />

      {/* Tabla */}
      <div className="overflow-x-auto shadow-md rounded-t-xl sm:min-h-[200px]">
        <table className="w-full table-auto">
          <thead className="rounded-md">
            <tr className="bg-slate-700 text-gray-200">
              {/* <th className="p-3 text-left">ID</th> */}
              <th className="p-3 text-left">Usuario</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Apellido</th>
              <th className="p-3 text-left">Grupos</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="*:focus-within:bg-gray-200 ">
            {!loading &&
              users &&
              users.map((user) => (
                <tr key={user.id} className="border-b border-b-gray-300">
                  {/* <td className="p-3">{user.id}</td> */}
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.first_name}</td>
                  <td className="p-3">{user.last_name}</td>
                  <td className="p-3">
                    {user &&
                      user.groups &&
                      user.groups.map((group: any) => group.name).join(", ")}
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
                      className="px-3 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 shadow-md border-3 hover:shadow-lg group focus:bg-blue-400"
                    >
                      <span className="inline-flex items-center gap-1">
                        <MdEdit className="group-focus:hidden" />
                        <TbLoader2 className="hidden group-focus:block  group-focus:animate-spin " />
                        Editar
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        if (user.id) handleDelete(user.id);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 shadow-md border-3 hover:shadow-lg group focus:bg-red-400"
                    >
                      <span className="inline-flex items-center gap-1">
                        <MdDeleteForever className="group-focus:hidden" />
                        <TbLoader2 className="hidden group-focus:block  group-focus:animate-spin " />
                        Eliminar
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {loading && (
          <div className="flex items-center justify-center gap-1 h-[150px]">
            <RiLoaderLine className="w-7 h-7 animate-spin text-violet-900" />
            Loading...
          </div>
        )}

        {!loading && !initLoadData && users.length === 0 && (
          <div className="flex items-center justify-center gap-1 h-[150px] text-gray-800 animate-pulse">
            <BsDatabaseFillX className="w-12 h-12" />
            <span className="text-[20px]">
              <b>No Data ...</b>
            </span>
          </div>
        )}
      </div>

      {/* Paginación */}
      <div className="flex items-center flex-wrap justify-center gap-7 mt-6 relative my-7 top-2">
        <div className="relative inline-block group z-10">
          <button
            className={
              "inline-flex gap-1 items-center bg-radial bg-left-top to-gray-300 rounded-lg disabled:opacity-50 shadow-lg shadow-gray-400 border-3 border-white transition-all " +
              `${
                currentPage !== 1
                  ? "active:shadow-md active:to-gray-400/70 px-2.5 py-2.5"
                  : "px-2 py-2"
              }`
            }
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1 || users.length === 0}
          >
            <IoIosArrowBack className="w-5 h-5" />
            <span className="hidden lg:block">Anterior</span>
          </button>

          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-sm px-2 py-2 rounded whitespace-nowrap">
            Página Anterior
          </div>
        </div>

        <div className="relative">
          <span className="text-center text-gray-800 pt-2">
            <b>Página: </b>
            {users.length > 0 ? `${currentPage} de ${totalPages}` : " --- "}
          </span>
        </div>

        <div className="relative inline-block group z-10">
          <button
            className={
              "inline-flex items-center gap-1 bg-radial bg-left-top to-gray-300 rounded-lg disabled:opacity-50 shadow-lg shadow-gray-400 border-3 border-white transition-all " +
              `${
                currentPage !== totalPages
                  ? "active:shadow-md active:to-gray-400/70 px-2.5 py-2.5"
                  : "px-2 py-2"
              }`
            }
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages || users.length === 0}
          >
            <span className="hidden lg:block">Siguiente</span>
            <IoIosArrowForward className="w-5 h-5" />
          </button>

          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-sm px-2 py-2 rounded whitespace-nowrap">
            Página Siguiente
          </div>
        </div>
        <div className="relative md:absolute md:right-3 inline-flex items-center justify-center md:justify-end w-auto gap-2">
          <label htmlFor="page_size">
            <b>Page Size:</b>
          </label>
          <input
            id="page_size"
            type="text"
            value={pagesSize}
            className="p-2 border rounded w-15"
            onChange={(e: any) => {
              setPagesSize(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
}
