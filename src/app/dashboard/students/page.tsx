import StudentResponse from "@/components/dashboard/students/StudentsTable";

const Students = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestión de Estudiantes</h1>
      <StudentResponse />
    </div>
  );
};

export default Students;
