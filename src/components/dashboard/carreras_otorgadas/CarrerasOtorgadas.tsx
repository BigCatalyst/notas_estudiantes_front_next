/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ApiService from "@/services/ApiService";
import { useEffect, useState } from "react";
import { BsDatabaseFillX } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import { RiLoaderLine } from "react-icons/ri";

const CarrerasOtorgadas = () => {
  const [list, setList] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [initLoadData, setInitLoadData] = useState(true);
  const [openFilter, setOpenFilter] = useState(true);

  const [lastSY, setLastSY] = useState("");

  const [schoolYears, setSchoolYears] = useState<
    { id: string; name: string }[]
  >([]);

  const [filters, setFilters] = useState<{
    approved_school_course__school_year__id?: string;
  }>({});

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
      //       ? `approved_school_course__school_year__id=${lastSY}`
      //       : query
      //   }`
      // );
      const data = await ApiService.grant_careers(
        `${
          query.length === 0
            ? `approved_school_course__school_year__id=${lastSY}`
            : query
        }`
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

  useEffect(() => {
    console.log(lastSY);

    const debounceTimer = setTimeout(() => {
      fetchEntity();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [filters, lastSY]);

  useEffect(() => {
    (async () => {
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
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setLastSY(value);
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
            handleFilterChange(
              "approved_school_course__school_year__id",
              e.target.value
            )
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
