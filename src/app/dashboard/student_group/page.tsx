import { StudentGroupTable } from "@/components/dashboard/student_group/StudentGroupTable";
import React from "react";

const GroupStudentView = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Grupos de Estudiantes</h1>
      <StudentGroupTable />
    </div>
  );
};

export default GroupStudentView;
