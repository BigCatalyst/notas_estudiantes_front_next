import SchoolYearTable from "@/components/dashboard/school_year/SchoolYearTable";

const SchoolYear = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestión del Año Escolar</h1>
      <SchoolYearTable />
    </div>
  );
};

export default SchoolYear;
