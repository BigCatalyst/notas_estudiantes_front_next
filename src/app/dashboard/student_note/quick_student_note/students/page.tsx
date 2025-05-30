import { QuickEditStudentNoteByStudents } from "@/components/dashboard/student_note/QuickEditStudentNoteByStudents";
import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Edición Rápida de las Notas del Estudiante
      </h1>
      <QuickEditStudentNoteByStudents />
    </div>
  );
};

export default Page;
