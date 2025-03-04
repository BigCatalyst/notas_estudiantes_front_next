import AulaVirtual from "@/components/dashboard/virtual_classroom_edition/AulaVirtual";
import React from "react";

const VirtualClassroom = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Aula Virtual</h1>
      <AulaVirtual />
    </div>
  );
};

export default VirtualClassroom;
