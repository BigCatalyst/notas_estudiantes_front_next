/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import MensageError from "@/components/message/MensageError";
import MensageExito from "@/components/message/MensageExito";
import Buttom from "@/components/ui/buttom/Buttom";
import { ACS_MAX } from "@/config";
import {
  StudentNote,
  StudentNoteMultipleByStudent,
  SchoolYearInNote,
  SubjectInNote,
} from "@/services/api/student_note";
import { Student } from "@/services/api/students";
import { Subject } from "@/services/api/subjects";
import ApiService from "@/services/ApiService";
import { useEffect, useState, useTransition } from "react";
import { BiSolidError } from "react-icons/bi";
import { BsDatabaseFillX } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { RiLoaderLine } from "react-icons/ri";

import AutoComplete from "@/components/ui/autocomplete/Autocomplete";
import GeneralLoader from "@/components/loader/GeneralLoader";
import { TableQuickEditStudentNote } from "./TableQuickEditStudentNoteByStudent";
import AutoCompleteStudents from "@/components/ui/autocomplete/AutocompleteStudent";

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
  const [students, setStudents] = useState<StudentType[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(
    null
  );
  const [list, setList] = useState<RowStudentNoteMultipleByStudent[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const callError = (message: unknown) => {
    console.error(message);
  };
  useEffect(() => {
    if (!selectedStudent) {
      setList([]);
      return;
    }
    startTransition(async () => {
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
    if (numValue !== undefined && !isNaN(numValue)) {
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
      <div className="transition-all h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6 duration-400 shadow-md p-7 shadow-gray-300 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estudiante
          </label>
          <AutoCompleteStudents
            className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            items={students}
            selecteItem={selectedStudent}
            placeholder="Buscar estudiante..."
            onSelect={handleSelect}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Curso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Asignatura
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ASC
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TCP1
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TCP2
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Examen Final
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {list.map((item) => (
              <tr key={item.rowId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.school_year.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.subject.grade}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.subject.name}
                </td>

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
                    value={item.final_exam === undefined ? "" : item.final_exam}
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
    </div>
  );
};
