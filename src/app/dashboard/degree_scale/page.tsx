import DegreeScale from "@/components/dashboard/degree_scale/DegreeScale";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Escalafón</h1>
      <DegreeScale />
    </div>
  );
};

export default page;
