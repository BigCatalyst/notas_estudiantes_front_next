import CarrerasOtorgadas from "@/components/dashboard/carreras_otorgadas/CarrerasOtorgadas";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Carreras Otorgadas</h1>
      <CarrerasOtorgadas />
    </div>
  );
};

export default page;
