/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ApiService from "@/services/ApiService";
import { useEffect, useState } from "react";
import { BsDatabaseFillX } from "react-icons/bs";
import { RiLoaderLine } from "react-icons/ri";

const CarrerasOtorgadas = () => {
  const [list, setList] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [initLoadData, setInitLoadData] = useState(true);

  useEffect(() => {
    const carrerasOtorgadasApi = async () => {
      try {
        setLoading(true);
        const res = await ApiService.getCarrerasOtorgadas();
        if (res) {
          setList(res);
        }
      } catch (error) {
        console.log(error);
        setInitLoadData(false);
      } finally {
        setLoading(false);
      }
    };
    carrerasOtorgadasApi();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="overflow-x-auto shadow-md rounded-t-xl sm:min-h-[200px]">
        <table className="w-full table-auto">
          <thead className="rounded-md">
            <tr className="bg-slate-700 text-gray-200">
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">CI</th>
              <th className="p-3 text-left">Carrera</th>
            </tr>
          </thead>

          <tbody className="*:focus-within:bg-gray-200 ">
            {!loading &&
              list &&
              list.map((item: any) => (
                <tr key={item.id} className="border-b border-b-gray-300">
                  <td className="p-3">{item.student.first_name}</td>
                  <td className="p-3">{item.student.ci}</td>
                  <td className="p-3">{item.career.name}</td>
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

export default CarrerasOtorgadas;
