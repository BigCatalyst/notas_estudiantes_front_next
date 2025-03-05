import StudentsBallotTable from "@/components/dashboard/students_ballot/StudentsBallotTable";

const StudentsBallot = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Gestión de Boleta de los Estudiantes
      </h1>
      <StudentsBallotTable />
    </div>
  );
};

export default StudentsBallot;
