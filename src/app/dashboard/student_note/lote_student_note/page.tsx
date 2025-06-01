import { LoteEditStudentNote } from "@/components/dashboard/student_note/LoteEditStudentNote";
import React from "react";

const QuickStudentNoteView = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Edición Rápida de las Notas de los Estudiantes
      </h1>
      <LoteEditStudentNote />
    </div>
  );
};

export default QuickStudentNoteView;
