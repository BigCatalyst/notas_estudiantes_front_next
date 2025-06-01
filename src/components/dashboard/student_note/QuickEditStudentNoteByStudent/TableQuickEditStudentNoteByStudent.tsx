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

export interface RowStudentNoteMultipleByStudent
  extends StudentNoteMultipleByStudent {
  rowId: string;
}

export const TableQuickEditStudentNote = ({
  idStudent,
}: {
  idStudent: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const [list, setList] = useState<RowStudentNoteMultipleByStudent[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const callError = (message: unknown) => {
    console.error(message);
  };
  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await ApiService.studentsNoteMultipleByStudent(idStudent);
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
  }, [idStudent]);

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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Curso
            </th>          
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Asignatura
            </th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grado
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
                {item.subject.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.subject.grade}
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
                    handleInputChange(item.rowId, "final_exam", e.target.value)
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
  );
};
