import Studentresponse from "@/components/dashboard/virtual_classroom_edition/Studentresponse";
import React from "react";

const StudentResponseView = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Respuestas de los Estudiantes</h1>
      <Studentresponse />
    </div>
  );
};

export default StudentResponseView;
