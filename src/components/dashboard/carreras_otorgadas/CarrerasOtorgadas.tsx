/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Buttom from "@/components/ui/buttom/Buttom";
import { Rols } from "@/data/NavigationItems";
import { State } from "@/redux/features/authSlice";
import ApiService from "@/services/ApiService";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { BsDatabaseFillX } from "react-icons/bs";
import { CgCheckO, CgCloseO } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { RiLoaderLine } from "react-icons/ri";
import { TbPlaylistAdd } from "react-icons/tb";
import { useSelector } from "react-redux";

const CarrerasOtorgadas = () => {
  const [list, setList] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [initLoadData, setInitLoadData] = useState(true);
  const [openFilter, setOpenFilter] = useState(true);
  const [loadingCalculate, setLoadingCalculate] = useState(false);
  const userAuth: State = useSelector((state: any) => state.auth);
  const [estudiantes_tienen_boletas, setEstudiantes_tienen_boletas] =
    useState(-1);
  const [estudiantes_posicion_escalafon, setEstudiantes_posicion_escalafon] =
    useState(-1);
  const [estudiantes_sin_otorgamiento, setEstudiantes_sin_otorgamiento] =
    useState(false);

  const [lastSY, setLastSY] = useState("");
  const load_filter_data = useRef<boolean>(true);
  const [schoolYears, setSchoolYears] = useState<
    { id: string; name: string }[]
  >([]);

  const [filters, setFilters] = useState<{
    school_year__id?: string;
  }>({});

  const tiene_permiso_para_realizar_otorgamiento = () => {
    return userAuth.user?.roles.some(
      (rol) => rol == Rols.admin || rol == Rols.secretary
    );
  };
  const se_puede_realizar_otorgamiento = () => {
    if (
      tiene_permiso_para_realizar_otorgamiento() &&
      estudiantes_tienen_boletas &&
      estudiantes_posicion_escalafon &&
      estudiantes_sin_otorgamiento
    ) {
      return true;
    }
    return false;
  };

  const realizarOtorgamiento = async () => {
    try {
      setLoadingCalculate(true);
      setLoading(true);
      const res = await ApiService.make_granting();

      if (res) {
        console.log("la respuesta de realizar el otorgamiento");
        console.log(res);
        setList(res);
        const last_year = schoolYears[schoolYears.length - 1];
        console.log("el last year");
        console.log(last_year);
        const last_year_id = last_year.id;
        console.log(`last_year_id ${last_year_id}`);
        setLastSY(last_year_id);
        load_filter_data.current = false;
        await comprobar_condiciones();
        load_filter_data.current = true;
      }
    } catch (error) {
      console.log(error);
      setInitLoadData(false);
    } finally {
      setLoadingCalculate(false);
      setLoading(false);
    }
  };

  const buildQueryString = () => {
    const params = new URLSearchParams();

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

      // const data = await ApiService.grant_careers(
      //   `${
      //     query.length === 0
      //       ? `school_year__id=${lastSY}`
      //       : query
      //   }`
      // );
      const data = await ApiService.grant_careers(
        `${query.length === 0 ? `school_year__id=${lastSY}` : query}`
      );

      console.log(query);

      if (data) {
        if (initLoadData) setInitLoadData(false);
        console.log("---------------------------------");
        console.log(data);
        setList(data.reverse());
      } else {
        console.log("ajdsjadkl sadklsjaldkjsa ldjsal j");
        setList([]);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };
  const comprobar_condiciones = async () => {
    if (tiene_permiso_para_realizar_otorgamiento()) {
      const [
        resEstudintesSinBoleta,
        resEstudintesSinEscalafon,
        resEstudiantesSinOtorgamiento,
      ] = await Promise.all([
        ApiService.verificarEstudintesSinBoleta(),
        ApiService.verificarEstudintesSinEscalafon(),
        ApiService.verificarEstudintesSinOtorgamiento(),
      ]);
      if (resEstudintesSinBoleta) {
        setEstudiantes_tienen_boletas(
          resEstudintesSinBoleta.are_missing_ballots ? 0 : 1
        );
      }
      if (resEstudintesSinEscalafon) {
        setEstudiantes_posicion_escalafon(
          resEstudintesSinEscalafon.are_students_whithout_ranking ? 0 : 1
        );
      }
      if (resEstudiantesSinOtorgamiento) {
        setEstudiantes_sin_otorgamiento(
          resEstudiantesSinOtorgamiento.without_granting
        );
      }
    }
  };
  useEffect(() => {
    console.log(lastSY);
    if (load_filter_data.current) {
      const debounceTimer = setTimeout(() => {
        fetchEntity();
      }, 500);
      return () => clearTimeout(debounceTimer);
    }
  }, [filters, lastSY]);

  const comprobar_condiciones_y_actualizar_curso = async () => {
    try {
      const res = await ApiService.schoolYearsAll("");
      if (res) {
        let datasy: { id: string; name: string }[] = [];
        res.forEach((val) => {
          if (val.id) datasy.push({ id: val.id + "", name: `${val.name}` });
        });
        setSchoolYears(datasy);
        console.log("last year");
        console.log(datasy[datasy.length - 1].name);
        setLastSY(datasy[datasy.length - 1].id);
      }
      await comprobar_condiciones();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    comprobar_condiciones_y_actualizar_curso();
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setLastSY(value);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="inline-flex w-full gap-3">
        {se_puede_realizar_otorgamiento() && (
          <div className="mb-5">
            <Buttom
              title="Calcular"
              icon={TbPlaylistAdd}
              className="btn1"
              isLoading={loadingCalculate}
              onClick={realizarOtorgamiento}
            />
          </div>
        )}
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

        {/*Condiciones*/}
        {tiene_permiso_para_realizar_otorgamiento() && (
          <div className="relative inline-block group z-10">
            <p className="font-bold text-lg text-gray-800">
              Condiciones para realizar otorgamiento:
            </p>

            <ul>
              <li>
                <p className="inline-flex justify-center items-center ml-3">
                  <IoIosArrowForward className="text-gray-700" />
                  <span
                    className={`${
                      estudiantes_tienen_boletas === 1
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Todos los Estudiantes de 9no tienen Boletas
                  </span>
                  <CgCheckO
                    className={
                      "ml-2 text-green-700" +
                      `${
                        estudiantes_tienen_boletas === 0 ? " hidden" : " block"
                      }`
                    }
                  />
                  <CgCloseO
                    className={
                      "ml-2 text-red-700" +
                      `${
                        estudiantes_tienen_boletas === 0 ? " block" : " hidden"
                      }`
                    }
                  />
                </p>
              </li>
              <li>
                <p className="inline-flex justify-center items-center ml-3">
                  <IoIosArrowForward className="text-gray-700" />
                  <span
                    className={`${
                      estudiantes_posicion_escalafon === 1
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Todos los Estudiantes de 9no tienen una posición en el
                    Escalafón
                  </span>
                  <CgCheckO
                    className={
                      "ml-2 text-green-700" +
                      `${
                        estudiantes_posicion_escalafon === 0
                          ? " hidden"
                          : " block"
                      }`
                    }
                  />
                  <CgCloseO
                    className={
                      "ml-2 text-red-700" +
                      `${
                        estudiantes_posicion_escalafon === 0
                          ? " block"
                          : " hidden"
                      }`
                    }
                  />
                </p>
              </li>

              <li>
                <p className="inline-flex justify-center items-center ml-3">
                  <IoIosArrowForward className="text-gray-700" />
                  <span
                    className={`${
                      estudiantes_sin_otorgamiento
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Existen estudiantes sin tener una carrera otorgada
                  </span>
                  <CgCheckO
                    className={
                      "ml-2 text-green-700" +
                      `${estudiantes_sin_otorgamiento ? " block" : " hidden"}`
                    }
                  />
                  <CgCloseO
                    className={
                      "ml-2 text-red-700" +
                      `${estudiantes_sin_otorgamiento ? " hidden" : " block"}`
                    }
                  />
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Filters */}
      <div
        className={
          !openFilter
            ? "transition-all h-0 overflow-hidden opacity-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "transition-all h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 duration-400 shadow-md p-7 shadow-gray-300 rounded-lg"
        }
      >
        <select
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={lastSY}
          onChange={(e) =>
            handleFilterChange("school_year__id", e.target.value)
          }
        >
          <option value="">SchoolYear</option>
          {schoolYears.map((val, index) => (
            <option key={index} value={val.id}>{`${val.name}`}</option>
          ))}
        </select>
      </div>

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
                  <td className="p-3">
                    {`${item.student.first_name} ${item.student.last_name}`}
                  </td>
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

        {!loading && !initLoadData && list && list.length === 0 && (
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
