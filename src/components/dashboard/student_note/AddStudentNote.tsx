/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { LuCircleFadingPlus } from "react-icons/lu";
import ApiService from "@/services/ApiService";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Buttom from "@/components/ui/buttom/Buttom";
import MessageForm from "@/components/ui/messageForm/MessageForm";

// Esquema de validación Zod
const studentNoteSchema = z.object({
  asc: z.number().min(0, "ASC debe ser al menos 0"),
  final_grade: z.number().min(0, "Nota final debe ser al menos 0"),
  final_exam: z.number().min(0, "Examen final debe ser al menos 0"),
  tcp1: z.number().min(0, "TCP1 debe ser al menos 0"),
  tcp2: z.number().min(0, "TCP2 debe ser al menos 0"),
  student: z.string().min(1, "Estudiante es requerido"),
  subject: z.string().min(1, "Materia es requerida"),
  school_year: z.string().min(1, "Año escolar es requerido"),
});

type StudentNoteFormData = z.infer<typeof studentNoteSchema>;

const AddStudentNote = () => {
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [students, setStudents] = useState<{ id: string; name: string }[]>([]);
  const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
  const [schoolYears, setSchoolYears] = useState<
    { id: string; name: string }[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, subjectsData, schoolYearsData] = await Promise.all(
          [
            ApiService.students(""),
            ApiService.subjects(""),
            ApiService.schoolYears(""),
          ]
        );
        if (studentsData)
          setStudents(
            studentsData.results.map((student: any) => ({
              id: student.id,
              name: `${student.first_name} ${student.last_name}`,
            }))
          );
        if (subjectsData)
          setSubjects(
            subjectsData.results.map((subject: any) => ({
              id: subject.id,
              name: subject.name,
            }))
          );
        if (schoolYearsData)
          setSchoolYears(
            schoolYearsData.results.map((year: any) => ({
              id: year.id,
              name: year.name,
            }))
          );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StudentNoteFormData>({
    resolver: zodResolver(studentNoteSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: StudentNoteFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setServerError("");
      const res = await ApiService.addStudentNote(data);
      if (res) {
        console.log(res);
        setIsSuccess(true);
        router.push("/dashboard/student_note");
      }
    } catch (error: any) {
      console.log(error);
      const errorData = error.response.data;
      let formattedErrorData = "";
      if (Object.keys(errorData).length > 0) {
        formattedErrorData = Object.entries(errorData)
          .map(([key, value]) => ` -${key}: ${JSON.stringify(value)}`)
          .join("\n");
      }
      setServerError(formattedErrorData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      <h2 className="text-2xl font-bold mb-6 mt-7 text-gray-800 border-b-2 pb-2 border-b-gray-400">
        Crear Nueva Nota de Estudiante
      </h2>

      <div className="absolute right-10 top-7">
        <Buttom
          title="Notas de Estudiantes"
          icon={IoIosArrowBack}
          to="/dashboard/student_note"
          className="btn1"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Mensaje de error del servidor */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ASC */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ASC
            </label>
            <input
              type="number"
              {...register("asc", { valueAsNumber: true })}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.asc ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.asc && (
              <p className="text-red-500 text-sm mt-1">{errors.asc.message}</p>
            )}
          </div>

          {/* Final Grade */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nota Final
            </label>
            <input
              type="number"
              {...register("final_grade", { valueAsNumber: true })}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.final_grade ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.final_grade && (
              <p className="text-red-500 text-sm mt-1">
                {errors.final_grade.message}
              </p>
            )}
          </div>

          {/* Final Exam */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Examen Final
            </label>
            <input
              type="number"
              {...register("final_exam", { valueAsNumber: true })}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.final_exam ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.final_exam && (
              <p className="text-red-500 text-sm mt-1">
                {errors.final_exam.message}
              </p>
            )}
          </div>

          {/* TCP1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              TCP1
            </label>
            <input
              type="number"
              {...register("tcp1", { valueAsNumber: true })}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.tcp1 ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.tcp1 && (
              <p className="text-red-500 text-sm mt-1">{errors.tcp1.message}</p>
            )}
          </div>

          {/* TCP2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              TCP2
            </label>
            <input
              type="number"
              {...register("tcp2", { valueAsNumber: true })}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.tcp2 ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.tcp2 && (
              <p className="text-red-500 text-sm mt-1">{errors.tcp2.message}</p>
            )}
          </div>

          {/* Student */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estudiante
            </label>
            <select
              {...register("student")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.student ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione un Estudiante</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
            {errors.student && (
              <p className="text-red-500 text-sm mt-1">
                {errors.student.message}
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Materia
            </label>
            <select
              {...register("subject")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.subject ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione una Materia</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* School Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Año Escolar
            </label>
            <select
              {...register("school_year")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.school_year ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione un Año Escolar</option>
              {schoolYears.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.name}
                </option>
              ))}
            </select>
            {errors.school_year && (
              <p className="text-red-500 text-sm mt-1">
                {errors.school_year.message}
              </p>
            )}
          </div>
        </div>

        <MessageForm
          isSuccess={isSuccess}
          error={serverError.length > 0}
          errorMessage={serverError}
        />

        {/* Botón de envío */}
        <Buttom
          title="Crear Nota"
          type="submit"
          isLoading={isLoading}
          className="btn1"
          icon={LuCircleFadingPlus}
          textLoading="Guardando"
        />
      </form>
    </div>
  );
};

export default AddStudentNote;
