/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import MensageError from "@/components/message/MensageError";
import MensageExito from "@/components/message/MensageExito";
import Buttom from "@/components/ui/buttom/Buttom";
import { ACS_MAX } from "@/config";
import { StudentNote } from "@/services/api/student_note";
import { Student } from "@/services/api/students";
import { Subject } from "@/services/api/subjects";
import ApiService from "@/services/ApiService";
import { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { BsDatabaseFillX } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { RiLoaderLine } from "react-icons/ri";

export const QuickEditStudentNote = () => {
  const [list, setList] = useState<StudentNote[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [openFilter, setOpenFilter] = useState(true);
  const [initLoadData, setInitLoadData] = useState(true);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [idSubject, setIdSubject] = useState(1);

  const [students, setStudents] = useState<Student[] | null>(null);

  const [showTcp2, setShowTcp2] = useState(false);

  const [error, setError] = useState<{
    asc: { id: number; m: string } | null;
    final_exam: { id: number; m: string } | null;
    tcp1: { id: number; m: string } | null;
    tcp2: { id: number; m: string } | null;
  }>({
    asc: null,
    final_exam: null,
    tcp1: null,
    tcp2: null,
  });

  const [showError, setShowError] = useState(false);
  const [keyM, setkeyM] = useState(Date.now());
  const [keyMI, setkeyMI] = useState(Date.now());
  const [showInfo, setShowInfo] = useState(false);

  const [editingCell, setEditingCell] = useState<{
    rowId: number | null;
    field: string | null;
  }>({
    rowId: null,
    field: null,
  });

  // useEffect(() => {
  //   console.log(editingCell);
  // }, [editingCell]);
  const showInfoMessage = () => {
    setkeyMI(Date.now());
    setShowInfo(true);
  };
  const SalvarCambios = () => {
    setShowError(false);

    if (validData()) {
      console.log(list);
      console.log("si");

      (async () => {
        try {
          const res = await ApiService.SaveStudentsNoteEdit(list);
          if (res) {
            console.log(res);
            setList([...list]);
            showInfoMessage();
          }
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      setShowError(true);
      console.log("no");
      setkeyM(Date.now());
    }
  };

  const validData = (): boolean => {
    for (const val of list) {
      if (val.asc && (val.asc < 0 || val.asc > ACS_MAX)) return false;
      if (val.final_exam && (val.final_exam < 0 || val.final_exam > 100))
        return false;
      if (val.tcp1 && (val.tcp1 < 0 || val.tcp1 > 100)) return false;
      if (val.tcp2 && (val.tcp2 < 0 || val.tcp2 > 100)) return false;
    }
    return true;
  };

  const handleChange = (
    e: { target: { value: any } },
    rowId: any,
    field: string
  ) => {
    const value = e.target.value;
    setList(
      list.map((row) =>
        row.student === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await ApiService.subjectsAll("");
        if (res) setSubjects(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [filters, setFilters] = useState<{
    subject__id?: string;
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

      const data = await ApiService.studentsNoteMultiple(
        query && query.length > 0 ? query.split("=")[1] : "1"
      );

      console.log(query);

      if (data) {
        if (initLoadData) setInitLoadData(false);
        console.log("---------------------------------");
        console.log(data);

        setList(data.reverse());
        let studData: Student[] = [];
        data.forEach((val) => {
          (async () => {
            const res = await ApiService.getStudent(val.student);
            if (res) studData.push(res);
          })().then(() => {
            if (data.length === studData.length) {
              console.log(studData);
              setStudents(studData);
            }
          });
        });
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
      <div className="inline-flex w-full gap-3 relative">
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

        {/* Salvar Cambios */}
        <div className="relative inline-block group z-10">
          <div className="mb-5">
            <button className="btn1" onClick={SalvarCambios}>
              <span className="inline-flex justify-center items-center gap-1">
                <MdEditDocument className="w-5 h-5 text-gray-200" />
                Salvar
              </span>
            </button>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-sm px-2 py-2 rounded whitespace-nowrap">
            Salvar los cambios de la edición
          </div>
        </div>

        <div className="relative right-0">
          <Buttom
            title="Notas de Estudiantes"
            icon={IoIosArrowBack}
            to="/dashboard/student_note"
            className="btn1"
          />
        </div>

        {showError && (
          <div key={keyM} className="relative w-full">
            <div className="animate-slide-down absolute right-[200px]">
              <MensageError
                duration={10000}
                message="Revise los campos editados y resuelva los errores"
              />
            </div>
          </div>
        )}
      </div>
      <div key={keyMI} className="inline-flex w-full gap-3 relative">
        {showInfo && <MensageExito duration={2000} message="Datos Guardados" />}
      </div>

      {/* Filters */}
      <div
        className={
          !openFilter
            ? "transition-all h-0 overflow-hidden opacity-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
            : "transition-all h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6 duration-400 shadow-md p-7 shadow-gray-300 rounded-lg"
        }
      >
        <select
          className="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={idSubject}
          onChange={(e) => {
            handleFilterChange("subject__id", e.target.value);
            setIdSubject(Number(e.target.value));

            const selectedSubjectId = e.target.value;

            const selectedSubject = subjects.find(
              (subject) => subject.id + "" == selectedSubjectId
            );

            if (selectedSubject) {
              setShowTcp2(selectedSubject.tcp2_required); // Mostrar tcp2 si hasTcp2 es true
            }
          }}
        >
          <option value="">Asignaturas</option>
          {subjects.map((subj, index) => (
            <option key={index + Date.now()} value={subj.id}>
              {`${subj.name} | ${
                subj.grade == "9" ? "9no" : subj.grade == "8" ? "8vo" : "7mo"
              }`}
            </option>
          ))}
        </select>
      </div>

      {/* Modal */}
      {/* <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        action={deleteEntity}
      /> */}

      {/* Tabla */}
      <div className="overflow-x-auto shadow-md rounded-t-xl sm:min-h-[200px]">
        <table className="w-full table-auto">
          <thead className="rounded-md">
            <tr className="bg-slate-700 text-gray-200">
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">CI</th>
              <th className="p-3 text-left">ASC</th>
              <th className="p-3 text-left">Examen Final</th>
              <th className="p-3 text-left">TCP1</th>
              {showTcp2 && <th className="p-3 text-left">TCP2</th>}
            </tr>
          </thead>
          <tbody className="*:focus-within:bg-gray-200">
            {!loading &&
              list &&
              list.map((item, index) => (
                <tr key={item.student} className="border-b border-b-gray-300">
                  {/* Nombre */}
                  <td className="p-3">
                    {students && students[index]
                      ? students[index].first_name
                      : "none"}
                  </td>
                  {/* CI */}
                  <td className="p-3">
                    {students && students[index] && students[index].ci}
                  </td>
                  {/* ASC */}
                  <td className="p-3">
                    {editingCell.rowId === item.student &&
                    editingCell.field === "asc" ? (
                      <input
                        type="number"
                        defaultValue={item.asc}
                        onChange={(e) => {
                          console.log("OnChangeInput");
                          console.log(e.target.value);
                          if (e.target.value && Number(e.target.value) >= 0)
                            handleChange(e, item.student, "asc");
                          else {
                            console.log("NAN");
                            item.asc = 0;
                          }
                        }}
                        onBlur={() => {
                          console.log(item.asc);
                          if (
                            item.student &&
                            item.asc &&
                            (item.asc < 0 || item.asc > ACS_MAX)
                          ) {
                            setError({
                              ...error,
                              asc: {
                                id: item.student,
                                m: `Este campo debe tener un valor entre 0 y ${ACS_MAX}`,
                              },
                            });
                          } else {
                            setError({
                              ...error,
                              asc: null,
                            });
                          }
                          setEditingCell({ rowId: null, field: null });
                        }}
                        autoFocus
                        className="w-[70px] px-2 py-1 border rounded"
                        placeholder="ASC"
                      />
                    ) : (
                      <div
                        onClick={() => {
                          if (item.student)
                            setEditingCell({
                              rowId: item.student,
                              field: "asc",
                            });
                        }}
                        className="cursor-pointer flex flex-col"
                      >
                        <span
                          className={
                            item.asc && (item.asc < 0 || item.asc > ACS_MAX)
                              ? "text-red-600 font-bold"
                              : "text-gray-700"
                          }
                        >
                          {item.asc == null ? 0 : item.asc}
                        </span>
                        {error &&
                          error.asc &&
                          error.asc.id === item.student && (
                            <span className=" text-red-600 inline-flex items-center justify-center gap-3 shadow-lg bg-gray-200 p-2 rounded-lg mt-3 border-t-3">
                              <BiSolidError className="w-12 h-12 animate-pulse" />
                              <span className="text-[12px]">{error.asc.m}</span>
                            </span>
                          )}
                      </div>
                    )}
                  </td>

                  {/* Final Examen */}
                  <td className="p-3">
                    {editingCell.rowId === item.student &&
                    editingCell.field === "final_exam" ? (
                      <input
                        type="number"
                        defaultValue={item.final_exam}
                        onChange={(e) => {
                          if (e.target.value && Number(e.target.value) >= 0)
                            handleChange(e, item.student, "final_exam");
                          else {
                            console.log("NAN");
                            item.final_exam = 0;
                          }
                        }}
                        onBlur={() => {
                          console.log(item.final_exam);
                          if (
                            item.student &&
                            item.final_exam &&
                            (item.final_exam < 0 || item.final_exam > 100)
                          ) {
                            setError({
                              ...error,
                              final_exam: {
                                id: item.student,
                                m: "Este campo debe tener un valor entre 0 y 100",
                              },
                            });
                          } else {
                            setError({
                              ...error,
                              final_exam: null,
                            });
                          }
                          setEditingCell({ rowId: null, field: null });
                        }}
                        autoFocus
                        className="w-[150px] px-2 py-1 border rounded"
                        placeholder="Examen Final"
                      />
                    ) : (
                      <div
                        onClick={() => {
                          if (item.student)
                            setEditingCell({
                              rowId: item.student,
                              field: "final_exam",
                            });
                        }}
                        className="cursor-pointer flex flex-col"
                      >
                        <span
                          className={
                            item.final_exam &&
                            (item.final_exam < 0 || item.final_exam > 100)
                              ? "text-red-600 font-bold"
                              : "text-gray-700"
                          }
                        >
                          {item.final_exam == null ? 0 : item.final_exam}
                        </span>
                        {error &&
                          error.final_exam &&
                          error.final_exam.id === item.student && (
                            <span className=" text-red-600 inline-flex items-center justify-center gap-3 shadow-lg bg-gray-200 p-2 rounded-lg mt-3 border-t-3">
                              <BiSolidError className="w-12 h-12 animate-pulse" />
                              <span className="text-[12px]">
                                {error.final_exam.m}
                              </span>
                            </span>
                          )}
                      </div>
                    )}
                  </td>

                  {/* tcp1 */}
                  <td className="p-3">
                    {editingCell.rowId === item.student &&
                    editingCell.field === "tcp1" ? (
                      <input
                        type="number"
                        defaultValue={item.tcp1}
                        onChange={(e) => {
                          if (e.target.value && Number(e.target.value) >= 0)
                            handleChange(e, item.student, "tcp1");
                          else {
                            console.log("NAN");
                            item.tcp1 = 0;
                          }
                        }}
                        onBlur={() => {
                          console.log(item.tcp1);
                          if (
                            item.student &&
                            item.tcp1 &&
                            (item.tcp1 < 0 || item.tcp1 > 100)
                          ) {
                            setError({
                              ...error,
                              tcp1: {
                                id: item.student,
                                m: "Este campo debe tener un valor entre 0 y 100",
                              },
                            });
                          } else {
                            setError({
                              ...error,
                              tcp1: null,
                            });
                          }
                          setEditingCell({ rowId: null, field: null });
                        }}
                        autoFocus
                        className="w-[150px] px-2 py-1 border rounded"
                        placeholder="TCP1"
                      />
                    ) : (
                      <div
                        onClick={() => {
                          if (item.student)
                            setEditingCell({
                              rowId: item.student,
                              field: "tcp1",
                            });
                        }}
                        className="cursor-pointer flex flex-col"
                      >
                        <span
                          className={
                            item.tcp1 && (item.tcp1 < 0 || item.tcp1 > 100)
                              ? "text-red-600 font-bold"
                              : "text-gray-700"
                          }
                        >
                          {item.tcp1 == null ? 0 : item.tcp1}
                        </span>
                        {error &&
                          error.tcp1 &&
                          error.tcp1.id === item.student && (
                            <span className=" text-red-600 inline-flex items-center justify-center gap-3 shadow-lg bg-gray-200 p-2 rounded-lg mt-3 border-t-3">
                              <BiSolidError className="w-12 h-12 animate-pulse" />
                              <span className="text-[12px]">
                                {error.tcp1.m}
                              </span>
                            </span>
                          )}
                      </div>
                    )}
                  </td>

                  {showTcp2 && (
                    <td className="p-3">
                      {editingCell.rowId === item.student &&
                      editingCell.field === "tcp2" ? (
                        <input
                          type="number"
                          defaultValue={item.tcp2}
                          onChange={(e) => {
                            if (e.target.value && Number(e.target.value) >= 0)
                              handleChange(e, item.student, "tcp2");
                            else {
                              console.log("NAN");
                              item.tcp2 = 0;
                            }
                          }}
                          onBlur={() => {
                            console.log(item.tcp2);
                            if (
                              item.student &&
                              item.tcp2 &&
                              (item.tcp2 < 0 || item.tcp2 > 100)
                            ) {
                              setError({
                                ...error,
                                tcp2: {
                                  id: item.student,
                                  m: "Este campo debe tener un valor entre 0 y 100",
                                },
                              });
                            } else {
                              setError({
                                ...error,
                                tcp2: null,
                              });
                            }
                            setEditingCell({ rowId: null, field: null });
                          }}
                          autoFocus
                          className="w-[150px] px-2 py-1 border rounded"
                          placeholder="TCP2"
                        />
                      ) : (
                        <div
                          onClick={() => {
                            if (item.student)
                              setEditingCell({
                                rowId: item.student,
                                field: "tcp2",
                              });
                          }}
                          className="cursor-pointer flex flex-col"
                        >
                          <span
                            className={
                              item.tcp2 && (item.tcp2 < 0 || item.tcp2 > 100)
                                ? "text-red-600 font-bold"
                                : "text-gray-700"
                            }
                          >
                            {item.tcp2 == null ? 0 : item.tcp2}
                          </span>
                          {error &&
                            error.tcp2 &&
                            error.tcp2.id === item.student && (
                              <span className=" text-red-600 inline-flex items-center justify-center gap-3 shadow-lg bg-gray-200 p-2 rounded-lg mt-3 border-t-3">
                                <BiSolidError className="w-12 h-12 animate-pulse" />
                                <span className="text-[12px]">
                                  {error.tcp2.m}
                                </span>
                              </span>
                            )}
                        </div>
                      )}
                    </td>
                  )}
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
