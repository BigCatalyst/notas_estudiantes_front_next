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

interface StudentType {
  id: string;
  name: string;
}

export const QuickEditStudentNoteByStudents = () => {
  const [isPending, startTransition] = useTransition();
  const [students, setStudents] = useState<StudentType[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(
    null
  );
  const callError = (message: unknown) => {
    console.error(message);
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
            name: `CI: ${student.ci} 
              | ${student.first_name} ${student.last_name}`,
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
          <AutoComplete
            className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            items={students}
            placeholder="Buscar estudiante..."
            onSelect={handleSelect}
          />
        </div>
      </div>
      <TableQuickEditStudentNote idStudent={selectedStudent.id} />
    </div>
  );
};
