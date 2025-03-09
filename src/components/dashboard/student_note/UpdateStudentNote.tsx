/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { LuCircleFadingPlus } from "react-icons/lu";
import ApiService from "@/services/ApiService";
import { useParams, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Buttom from "@/components/ui/buttom/Buttom";
import MessageForm from "@/components/ui/messageForm/MessageForm";
import AutoComplete from "@/components/ui/autocomplete/Autocomplete";

// Esquema de validación Zod
const studentNoteSchema = z.object({
  asc: z
    .number({ message: "Asc no puede estar vacío" })
    .min(0, "ASC debe ser al menos 0")
    .max(10, "ASC debe ser maximo 10"),
  final_exam: z
    .number({ message: "El Examen Final no puede estar vacío" })
    .min(0, "El Examen Final debe ser al menos 0")
    .max(100, "El Examen Final debe ser maximo 100"),
  tcp1: z
    .number({ message: "El TCP1 no puede estar vacío" })
    .min(0, "El TCP1 debe ser al menos 0")
    .max(100, "El TCP1 debe ser maximo 100"),
  tcp2: z
    .number()
    .min(0, "El TCP2 debe ser al menos 0")
    .max(100, "El TCP2 debe ser maximo 100")
    .optional(),
  student: z
    .string({ message: "Estudiante es requerido" })
    .min(1, "Estudiante es requerido"),
  subject: z.string().min(1, "Materia es requerida"),
  school_year: z.string().min(1, "Año escolar es requerido"),
});

type StudentNoteFormData = z.infer<typeof studentNoteSchema>;

const UpdateStudentNote = () => {
  const [serverError, setServerError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [students, setStudents] = useState<{ id: string; name: string }[]>([]);
  const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
  const [schoolYears, setSchoolYears] = useState<
    { id: string; name: string }[]
  >([]);

  const [selecteStudent, setSelecteStudent] = useState("");

  const handleSelect = (item: { id: string; name: string }) => {
    console.log("Elemento seleccionado:", item);
    setValue("student", item.id);
    clearErrors("student");
  };

  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, subjectsData, schoolYearsData] = await Promise.all(
          [
            ApiService.studentsAll(""),
            ApiService.subjects(""),
            ApiService.schoolYears(""),
          ]
        );
        if (studentsData) {
          console.log(studentsData);
          setStudents(
            studentsData.map((student: any) => ({
              id: student.id,
              name: `${student.first_name} ${student.last_name} | ${
                student.grade == 9 ? "9no" : student.grade == 8 ? "8vo" : "7mo"
              }`,
            }))
          );
        }

        if (subjectsData)
          setSubjects(
            subjectsData.results.map((subject: any) => ({
              id: subject.id,
              name: `${subject.name} | ${
                subject.grade == 9 ? "9no" : subject.grade == 8 ? "8vo" : "7mo"
              }`,
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

  useEffect(() => {
    const updateEntity = async () => {
      const res = await ApiService.getStudentNote(id);
      if (res) {
        setValue("asc", res?.asc ?? 0);
        setValue("final_exam", res?.final_exam ?? 0);
        setValue("tcp1", res?.tcp1 ?? 0);
        setValue("tcp2", res?.tcp2 ?? 0);
        setValue("student", res.student.id + "");
        setValue("subject", res.subject.id + "");
        setValue("school_year", res.school_year.id + "");

        const ss = students.find((val) => {
          if (val.id === res.student.id) return val;
        });

        setSelecteStudent(ss?.name ?? "");
      }
    };

    updateEntity();
  }, [students]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<StudentNoteFormData>({
    resolver: zodResolver(studentNoteSchema),
    defaultValues: { tcp2: 0, final_exam: 0 },
    mode: "onChange",
  });

  const onSubmit = async (data: StudentNoteFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setServerError([]);
      const res = await ApiService.updateStudentNote(id, data);
      if (res) {
        console.log(res);
        setIsSuccess(true);
        router.push("/dashboard/student_note");
      }
    } catch (error: any) {
      console.log(error);
      const errorData: {
        [key: string]: string[] | { email: string[]; username: string[] };
      } = error.response.data;
      let formattedErrorData: string[] = [];
      if (Object.keys(errorData).length > 0) {
        Object.entries(errorData).forEach(([key, value]) => {
          formattedErrorData.push(`${key}: ${value}`);
        });
      }
      setServerError(formattedErrorData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      <h2 className="text-2xl font-bold mb-6 mt-7 text-gray-800 border-b-2 pb-2 border-b-gray-400">
        Actualizar Nota a Estudiante
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
            <AutoComplete
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.student ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              items={students}
              selecteItem={selecteStudent}
              placeholder="Buscar estudiante..."
              onSelect={handleSelect}
            />
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

        {serverError.length > 0 && (
          <div className="bg-red-500 p-3 text-white rounded-lg shadow-lg">
            <p className="text-[17px] mb-1">Datos inválidos</p>
            {serverError.map((val, index) => (
              <div key={index + Date.now()}>{val}</div>
            ))}
          </div>
        )}

        {/* Botón de envío */}
        <Buttom
          title="Actualizar Nota"
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

export default UpdateStudentNote;
