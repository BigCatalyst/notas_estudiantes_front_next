import DropoutsTable from "@/components/dashboard/dropouts/DropoutsTable";
import React from "react";

const Dropouts = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Bajas</h1>
      <DropoutsTable />
    </div>
  );
};

export default Dropouts;
