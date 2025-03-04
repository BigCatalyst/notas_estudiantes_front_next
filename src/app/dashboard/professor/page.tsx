import { ProfessorsTable } from "@/components/professor/ProfessorsTable";
import React from "react";

const Professor = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestión de Profesores</h1>
      <ProfessorsTable />
    </div>
  );
};

export default Professor;
