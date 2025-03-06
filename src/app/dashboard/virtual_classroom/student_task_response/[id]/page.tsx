import { StudentResponseTask } from "@/components/dashboard/virtual_classroom_edition/StudentResponseTask";
import React from "react";

const StudentTaskResponseView = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Responder Tarea</h1>
      <StudentResponseTask />
    </div>
  );
};

export default StudentTaskResponseView;
