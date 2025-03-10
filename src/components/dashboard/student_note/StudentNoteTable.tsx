/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Buttom from "@/components/ui/buttom/Buttom";
import Modal from "@/components/ui/modal/Modal";
import { StudentNote } from "@/services/api/student_note";
import ApiService from "@/services/ApiService";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { BsDatabaseFillX } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { RiLoaderLine } from "react-icons/ri";
import { TbLoader2, TbPlaylistAdd, TbTableExport } from "react-icons/tb";

const StudentNoteTable = () => {
  const [list, setList] = useState<StudentNote[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagesSize, setPagesSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [initLoadData, setInitLoadData] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [IdDel, setIdDel] = useState(-1);

  // const [stident, setStident] = useState("");
  // const [subject, setSubject] = useState("");

  const [filters, setFilters] = useState<{
    asc__gte?: number;
    final_exam__gte?: number;
    final_grade__gte?: number;
    school_year__name__contains?: string;
    school_year__start_date__gte?: string;
    student__ci__contains?: string;
    student__first_name__contains?: string;
    student__grade?: string;
    student__sex?: string;
    subject__name__contains?: string;
    student__is_dropped_out?: string;
    student__is_graduated?: string;
  }>({ student__is_graduated: "false", student__is_dropped_out: "false" });

  const handleEdit = (value: StudentNote) => {
    // Lógica para editar
    console.log(value);

    redirect(`/dashboard/student_note/${value.id}`);
  };

  const handleDelete = (id: number) => {
    // Lógica para eliminar
    setShowModal(true);
    setIdDel(id);
  };

  const deleteEntity = async () => {
    try {
      if (IdDel !== -1) {
        await ApiService.deleteStudentNote(IdDel).then(() => fetchEntity());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buildQueryString = () => {
    const params = new URLSearchParams();

    params.set("page", currentPage.toString());

    if (pagesSize > 0) params.set("page_size", pagesSize.toString());
    else {
      const defaultPageSize = 10;
      params.set("page_size", defaultPageSize.toString());
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        params.set(key, value + "");
      }
    });

    return params.toString();
  };

  const fetchEntity = async () => {
    try {
      setLoading(true);
      const query = buildQueryString();
      const data = await ApiService.studentsNote(`${query}`);

      console.log(query);

      if (data) {
        if (initLoadData) setInitLoadData(false);
        console.log("---------------------------------");
        console.log(data);

        setList(data.results.reverse());
        // if (listPromiseRes) setList(listResolver.reverse());
        if (!pagesSize) setTotalPages(Math.ceil(data.count / 10));
        else setTotalPages(Math.ceil(data.count / pagesSize));
      }
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchEntity();
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

        {/* Exportar */}
        <div className="mb-5">
          {/* <button className="btn1">
            <TbTableExport className="w-7 h-7 text-gray-200" />
            <span>Exportar</span>
          </button> */}

          <Buttom title="Exportar" icon={TbTableExport} className="btn1" />
        </div>

        {/* Adicionar */}
        <div className="mb-5">
          <Buttom
            title="Adicionar"
            icon={TbPlaylistAdd}
            className="btn1"
            to="student_note/add"
          />
        </div>

        {/* Adicionar */}
        <div className="mb-5">
          <Buttom
            title="Edición Rápida"
            icon={MdEdit}
            className="btn1"
            to="student_note/quick_student_note"
          />
        </div>
      </div>

      {/* Filters */}
      <div
        className={
          !openFilter
            ? "transition-all h-0 overflow-hidden opacity-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
            : "transition-all h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6 duration-400 shadow-md p-7 shadow-gray-300 rounded-lg"
        }
      >
        <input
          type="number"
          placeholder="Buscar por >= GTE"
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) => handleFilterChange("asc__gte", e.target.value)}
        />

        <input
          type="number"
          placeholder="Buscar por >= Examen Final"
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) =>
            handleFilterChange("final_exam__gte", e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Buscar por >= Nota Final"
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) =>
            handleFilterChange("final_grade__gte", e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Nombre de año escolar"
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) =>
            handleFilterChange("school_year__name__contains", e.target.value)
          }
        />

        <div className="mt-1 p-2 flex items-center justify-start w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 gap-7">
          <label htmlFor="start_date" className="text-gray-500">
            Fecha del año Escolar {" >="}
          </label>
          <input
            id="start_date"
            type="date"
            onChange={(e) =>
              handleFilterChange("school_year__start_date__gte", e.target.value)
            }
            className={`${
              !filters.school_year__start_date__gte
                ? "text-transparent"
                : "text-gray-800"
            }`}
          />
        </div>

        <input
          type="text"
          placeholder="CI del Estudiante"
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) =>
            handleFilterChange("student__ci__contains", e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Nombre del Estudiante"
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) =>
            handleFilterChange("student__first_name__contains", e.target.value)
          }
        />

        <select
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) => handleFilterChange("student__grade", e.target.value)}
        >
          <option value="">Grados</option>
          <option value="7">7mo</option>
          <option value="8">8vo</option>
          <option value="9">9no</option>
        </select>

        <select
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) => handleFilterChange("student__sex", e.target.value)}
        >
          <option value="">Sexo</option>
          <option value="F">Fememino</option>
          <option value="M">Masculino</option>
        </select>

        <input
          type="text"
          placeholder="Nombre de la Asignatura"
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) =>
            handleFilterChange("subject__name__contains", e.target.value)
          }
        />

        <select
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) =>
            handleFilterChange("student__is_dropped_out", e.target.value)
          }
        >
          <option value="">Es Baja?</option>
          <option value="true">Baja</option>
          <option value="false">No Baja</option>
        </select>

        <select
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) =>
            handleFilterChange("student__is_graduated", e.target.value)
          }
        >
          <option value="">Es Graduado?</option>
          <option value="true">Graduado</option>
          <option value="false">No es Graduado</option>
        </select>
      </div>

      {/* Modal */}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        action={deleteEntity}
      />

      {/* Tabla */}
      <div className="overflow-x-auto shadow-md rounded-t-xl sm:min-h-[200px]">
        <table className="w-full table-auto">
          <thead className="rounded-md">
            <tr className="bg-slate-700 text-gray-200">
              <th className="p-3 text-left">ASC</th>
              <th className="p-3 text-left">Grado Final</th>
              <th className="p-3 text-left">Examen Final</th>
              <th className="p-3 text-left">TCP1</th>
              <th className="p-3 text-left">TCP2</th>
              <th className="p-3 text-left">Estudiante</th>
              <th className="p-3 text-left">Asigntura</th>
              <th className="p-3 text-left">Año Escolar</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="*:focus-within:bg-gray-200">
            {!loading &&
              list &&
              list.map((item) => (
                <tr key={item.id} className="border-b border-b-gray-300">
                  {/* <td className="p-3">{user.id}</td> */}
                  <td className="p-3">{item.asc?.toFixed(2)}</td>
                  <td className="p-3">{item.final_grade?.toFixed(2)}</td>
                  <td className="p-3">{item.final_exam?.toFixed(2)}</td>
                  <td className="p-3">{item.tcp1?.toFixed(2)}</td>
                  <td className="p-3">{item.tcp2?.toFixed(2)}</td>
                  <td className="p-3">{item.student.first_name}</td>
                  <td className="p-3">{item.subject.name}</td>
                  <td className="p-3">{item.school_year.name}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
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
                        if (item.id) handleDelete(item.id);
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

        {!loading && !initLoadData && list.length === 0 && (
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
            disabled={currentPage === 1 || list.length === 0}
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
            {list.length > 0 ? `${currentPage} de ${totalPages}` : " --- "}
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
            disabled={currentPage === totalPages || list.length === 0}
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
};

export default StudentNoteTable;
