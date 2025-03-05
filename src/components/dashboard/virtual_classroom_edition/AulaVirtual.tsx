/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { SubjectSectionSubjectsRes } from "@/services/api/virtual_classroom_edition";
import ApiService from "@/services/ApiService";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { BsDatabaseFillX } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { RiLoaderLine } from "react-icons/ri";
import { TbLoader2 } from "react-icons/tb";

const AulaVirtual = () => {
  const [list, setList] = useState<SubjectSectionSubjectsRes[]>([]);
  const [loading, setLoading] = useState(false);
  const [initLoadData, setInitLoadData] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await ApiService.subjects_sections_subjects("");
        if (res) {
          setList(res);
        }
      } catch (error) {
        console.log(error);
        setInitLoadData(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleEntrar = (value: SubjectSectionSubjectsRes) => {
    // Lógica para editar
    console.log(value);

    redirect(`/dashboard/virtual_classroom/${value.id}`);
  };

  return (
    <div>
      <div className="overflow-x-auto shadow-md rounded-t-xl sm:min-h-[200px]">
        <table className="w-full table-auto">
          <thead className="rounded-md">
            <tr className="bg-slate-700 text-gray-200">
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Grado</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="*:focus-within:bg-gray-200 ">
            {!loading &&
              list &&
              list.map((item) => (
                <tr key={item.id} className="border-b border-b-gray-300">
                  {/* <td className="p-3">{user.id}</td> */}
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.grade}</td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEntrar(item)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 shadow-md border-3 hover:shadow-lg group focus:bg-blue-400"
                    >
                      <span className="inline-flex items-center gap-1">
                        <MdEdit className="group-focus:hidden" />
                        <TbLoader2 className="hidden group-focus:block  group-focus:animate-spin " />
                        Entrar
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
    </div>
  );
};

export default AulaVirtual;
