/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import MensageError from "@/components/message/MensageError";
import MensageExito from "@/components/message/MensageExito";

import { ACS_MAX } from "@/config";
import { StudentNoteMultipleByStudent } from "@/services/api/student_note";

import ApiService from "@/services/ApiService";
import { useEffect, useState, useTransition } from "react";

import { MdEditDocument } from "react-icons/md";

import GeneralLoader from "@/components/loader/GeneralLoader";

import AutoCompleteStudents from "@/components/ui/autocomplete/AutocompleteStudent";
import MensageErrorServer from "@/components/message/MensageErrorServer";

interface StudentType {
  id: string;
  name: string;
  last_name: string;
  first_name: string;
  ci: string;
}

export interface RowStudentNoteMultipleByStudent
  extends StudentNoteMultipleByStudent {
  rowId: string;
}

export const QuickEditStudentNoteByStudents = () => {
  const [isPending, startTransition] = useTransition();
  const [isPendingTable, startTransitionTable] = useTransition();
  const [students, setStudents] = useState<StudentType[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(
    null
  );
  const [list, setList] = useState<RowStudentNoteMultipleByStudent[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [serverError, setServerError] = useState<string[]>([]);
  const [keyMSE, setkeyMSE] = useState(Date.now());
  const [showError, setShowError] = useState(false);
  const [keyM, setkeyM] = useState(Date.now());
  const [keyMI, setkeyMI] = useState(Date.now());
  const [showInfo, setShowInfo] = useState(false);
  const showInfoMessage = () => {
    setkeyMI(Date.now());
    setShowInfo(true);
  };
  const callError = (message: unknown) => {
    console.error(message);
    setShowError(true);
    setkeyM(Date.now());
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
  const SalvarCambios = () => {
    setServerError([]);
    setShowError(false);

    if (validData()) {
      console.log(list);
      console.log("si");

      (async () => {
        try {
          const res = await ApiService.SaveStudentsNoteEdit(
            list.map((studendData) => ({
              id: studendData.id,
              asc: studendData.asc,
              final_grade: studendData.final_grade,
              final_exam: studendData.final_exam,
              tcp1: studendData.tcp1,
              tcp2: studendData.tcp2,
              student: studendData.student,
              subject: studendData.subject.id,
              school_year: studendData.school_year.id,
            }))
          );
          if (res) {
            console.log(res);
            setList([...list]);
            showInfoMessage();
          }
        } catch (error: any) {
          console.log(error);
          const errorData: {
            [key: string]: string[] | { email: string[]; username: string[] };
          } = error.response.data;
          let formattedErrorData: string[] = [];
          if (Object.keys(errorData).length > 0) {
            Object.entries(errorData).forEach(([key, value]) => {
              Object.entries(value).forEach(([newkey, value]) => {
                if (Array.isArray(value))
                  formattedErrorData.push(
                    `${key} -> ${newkey}: ${value.join(", ")}`
                  );
              });
            });
          }
          setServerError(formattedErrorData);
          setkeyMSE(Date.now());
        }
      })();
    } else {
      setShowError(true);
      console.log("no");
      setkeyM(Date.now());
    }
  };

  useEffect(() => {
    if (!selectedStudent) {
      setList([]);
      return;
    }
    startTransitionTable(async () => {
      try {
        const data = await ApiService.studentsNoteMultipleByStudent(
          selectedStudent.id + ""
        );
        setList(
          data?.map((row) => ({
            ...row,
            rowId: `${row.subject.id}-${row.school_year.id}`,
          })) || []
        );
      } catch (error) {
        callError(error);
      }
    });
  }, [selectedStudent]);

  const handleInputChange = (
    id: string,
    field: keyof Pick<
      StudentNoteMultipleByStudent,
      "asc" | "tcp1" | "tcp2" | "final_exam"
    >,
    value: string
  ) => {
    let numValue: number | undefined;
    if (value === "") {
      numValue = undefined;
    } else {
      numValue = parseFloat(value);
    }

    let error = "";
    if (numValue !== undefined) {
      if (!isNaN(numValue)) {
        switch (field) {
          case "asc":
            if (numValue < 0 || numValue > 20)
              error = "ASC debe estar entre 0 y 20";
            break;
          case "tcp1":
          case "tcp2":
          case "final_exam":
            if (numValue < 0 || numValue > 100)
              error = "Debe estar entre 0 y 100";
            break;
        }
      } else {
        error = "Número inválido";
      }
    }

    setErrors((prev) => ({ ...prev, [`${id}-${field}`]: error }));

    setList((prevList) =>
      prevList.map((item) =>
        item.rowId === id ? { ...item, [field]: numValue } : item
      )
    );
  };
  const parseStudentToStr = (student: StudentType): string => {
    return `CI: ${student.ci} 
              | ${student.first_name} ${student.last_name}`;
  };
  useEffect(() => {
    startTransition(async () => {
      try {
        const studentsData = await ApiService.studentsAll(
          "is_graduated=false&ordering=grade,first_name"
        );
        if (studentsData) {
          const student_data = studentsData.map((student: any) => ({
            id: student.id,
            name: parseStudentToStr(student),
            first_name: student.first_name,
            last_name: student.last_name,
            ci: student.ci,
          }));
          setStudents(student_data);
          setSelectedStudent(student_data[0]);
        }
      } catch (error) {
        callError(error);
      }
    });
  }, []);

  const handleSelect = (item: StudentType) => {
    console.log("Elemento seleccionado:", item);
    setSelectedStudent(item);
  };
  if (isPending) {
    return <GeneralLoader />;
  }
  if (!selectedStudent) {
    return <div>No hay un estudiante seleccionado</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Filters */}
      <div
        className="transition-all h-auto  gap-4 mb-6 duration-400 shadow-md p-7 shadow-gray-300 rounded-lg
        flex flex-row justify-between items-center flex-wrap
      "
      >
        <div className="w-[500px] ">
          <label className="block text-sm font-medium text-gray-700">
            Estudiante
          </label>
          <AutoCompleteStudents
            className={`mt-1 p-2 block w-full  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            items={students}
            selecteItem={selectedStudent}
            placeholder="Buscar estudiante..."
            onSelect={handleSelect}
          />
        </div>
        {/* Salvar Cambios */}
        <div className="relative inline-block group ">
          <div className="mb-5">
            <button
              disabled={!validData()}
              className="btn1"
              onClick={SalvarCambios}
            >
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

      {showInfo && (
        <div key={keyMI} className="inline-flex w-full gap-3 relative">
          <MensageExito duration={2000} message="Datos Guardados" />
        </div>
      )}

      {serverError.length > 0 && (
        <div key={keyMSE} className="inline-flex w-full gap-3 relative">
          <MensageErrorServer duration={20_000} messages={serverError} />
        </div>
      )}
      {isPendingTable ? (
        <div className="flex items-center justify-center h-[200px]">
          <span>Cargando datos ...</span>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-t-xl sm:min-h-[200px]">
          <table className="w-full table-auto">
            <thead className="rounded-md">
              <tr className="bg-slate-700 text-gray-200">
                <th className="p-3 text-left">Curso</th>
                <th className="p-3 text-left">Grado</th>
                <th className="p-3 text-left">Asignatura</th>
                <th className="p-3 text-left">ASC</th>
                <th className="p-3 text-left">TCP1</th>
                <th className="p-3 text-left">TCP2</th>
                <th className="p-3 text-left">Examen Final</th>
              </tr>
            </thead>
            <tbody className="*:focus-within:bg-gray-200">
              {list.map((item) => (
                <tr key={item.rowId} className="border-b border-b-gray-300">
                  <td className="p-3">{item.school_year.name}</td>
                  <td className="p-3">{item.subject.grade}</td>
                  <td className="p-3">{item.subject.name}</td>

                  {/* Campo ASC */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      step="0.01"
                      className={`w-20 px-2 py-1 border rounded ${
                        errors[`${item.rowId}-asc`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      value={item.asc === undefined ? "" : item.asc}
                      onChange={(e) =>
                        handleInputChange(item.rowId, "asc", e.target.value)
                      }
                    />
                    {errors[`${item.rowId}-asc`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`${item.rowId}-asc`]}
                      </p>
                    )}
                  </td>

                  {/* Campo TCP1 */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      step="0.01"
                      className={`w-20 px-2 py-1 border rounded ${
                        errors[`${item.rowId}-tcp1`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      value={item.tcp1 === undefined ? "" : item.tcp1}
                      onChange={(e) =>
                        handleInputChange(item.rowId, "tcp1", e.target.value)
                      }
                    />
                    {errors[`${item.rowId}-tcp1`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`${item.rowId}-tcp1`]}
                      </p>
                    )}
                  </td>

                  {/* Campo TCP2 */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      step="0.01"
                      className={`w-20 px-2 py-1 border rounded ${
                        errors[`${item.rowId}-tcp2`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      value={item.tcp2 === undefined ? "" : item.tcp2}
                      onChange={(e) =>
                        handleInputChange(item.rowId, "tcp2", e.target.value)
                      }
                    />
                    {errors[`${item.rowId}-tcp2`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`${item.rowId}-tcp2`]}
                      </p>
                    )}
                  </td>

                  {/* Campo Examen Final */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      step="0.01"
                      className={`w-20 px-2 py-1 border rounded ${
                        errors[`${item.rowId}-final_exam`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      value={
                        item.final_exam === undefined ? "" : item.final_exam
                      }
                      onChange={(e) =>
                        handleInputChange(
                          item.rowId,
                          "final_exam",
                          e.target.value
                        )
                      }
                    />
                    {errors[`${item.rowId}-final_exam`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`${item.rowId}-final_exam`]}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
