/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Buttom from "@/components/ui/buttom/Buttom";
import { Rols } from "@/data/NavigationItems";
import { State } from "@/redux/features/authSlice";
import ApiService from "@/services/ApiService";
import { useEffect, useState } from "react";
import { BsDatabaseFillX } from "react-icons/bs";
import { RiLoaderLine } from "react-icons/ri";
import { TbPlaylistAdd, TbTableExport } from "react-icons/tb";
import { useSelector } from "react-redux";

const DegreeScale = () => {
  const [list, setList] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [initLoadData, setInitLoadData] = useState(true);
  const [loadingCalculate, setLoadingCalculate] = useState(false);
  const userAuth: State = useSelector((state: any) => state.auth);

  useEffect(() => {
    console.log("ok");
    calcularEscalafon();
  }, []);

  const calcularEscalafon = async () => {
    try {
      setLoading(true);
      const res = await ApiService.escalafon();

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

  const handleCalcular = async () => {
    try {
      setLoadingCalculate(true);
      setLoading(true);
      const res = await ApiService.escalafonCalcular();
      if (res) {
        setList(res);
      }
    } catch (error) {
      console.log(error);
      setInitLoadData(false);
    } finally {
      setLoadingCalculate(false);
      setLoading(false);
    }
  };

  const exportReport = async () => {
    try {
      const res = await ApiService.reportEscalafon();
      console.log(res);

      console.log("respuesta");
      console.log(res);
      const pdfBlob = new Blob([res], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "reporte.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="inline-flex w-full gap-3">
        {userAuth.user?.roles.some(
          (rol) => rol === Rols.secretary
        ) && (
          <div className="mb-5">
            <Buttom
              title="Calcular"
              icon={TbPlaylistAdd}
              className="btn1"
              isLoading={loadingCalculate}
              onClick={handleCalcular}
            />
          </div>
        )}

        {/* Exportar */}
        <div className="mb-5">
          <button className="btn1" onClick={exportReport}>
            <TbTableExport /> Exportar
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow-md rounded-t-xl sm:min-h-[200px]">
        <table className="w-full table-auto">
          <thead className="rounded-md">
            <tr className="bg-slate-700 text-gray-200">
              <th className="p-3 text-left">Posición</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">CI</th>
              <th className="p-3 text-left">Promedio</th>
            </tr>
          </thead>
          <tbody className="*:focus-within:bg-gray-200 ">
            {!loading &&
              list &&
              list.map((item: any) => (
                <tr key={item.id} className="border-b border-b-gray-300">
                  <td className="p-3">{item.ranking_number}</td>
                  <td className="p-3">{`${item.student.first_name} ${item.student.last_name}`}</td>
                  <td className="p-3">{item.student.ci}</td>
                  <td className="p-3">{item.ranking_score.toFixed(2)}</td>
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

export default DegreeScale;
