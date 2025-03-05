import StudentNoteTable from "@/components/dashboard/student_note/StudentNoteTable";

const StudentNote = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Gestión de Notas de Estudiantes
      </h1>
      <StudentNoteTable />
    </div>
  );
};

export default StudentNote;
