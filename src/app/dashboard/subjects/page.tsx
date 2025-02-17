import SubjectsTable from "@/components/dashboard/subjects/SubjectsTable";

const Subjects = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestión de Asignaturas</h1>
      <SubjectsTable />
    </div>
  );
};

export default Subjects;
