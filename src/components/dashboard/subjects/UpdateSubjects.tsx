/* eslint-disable prefer-const */
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
import { Subject } from "@/services/api/subjects";

const subjectSchema = z.object({
  grade: z.string().min(1, "El grado es requerido"),
  name: z.string().min(1, "El nombre de la materia es requerido"),
  tcp2_required: z.boolean().default(false),
  profesorsData: z
    .array(z.number())
    .nonempty("Debe agregar al menos un profesor"),
});

type SubjectFormData = z.infer<typeof subjectSchema>;

interface ProfesorSelectType {
  id: number;
  name: string;
}

const UpdateSubjects = () => {
  const [serverError, setServerError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentProfesor, setCurrentProfesor] = useState("");
  const [profesors, setProfesors] = useState<ProfesorSelectType[] | null>(null);

  useEffect(() => {
    const profesorsApi = async () => {
      try {
        const res = await ApiService.professorsAll("");
        if (res) {
          console.log(res);
          let profesorsData: ProfesorSelectType[] = [];
          res.forEach(
            (val) =>
              val.id && profesorsData.push({ id: val.id, name: val.first_name })
          );
          console.log("---------------------");
          console.log(profesorsData);
          setProfesors(profesorsData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    profesorsApi();
  }, []);

  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    setError,
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      tcp2_required: false,
      profesorsData: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    const getSubjectUpdate = async () => {
      const res = await ApiService.getSubject(id);

      if (res) {
        setValue("grade", res.grade + "");
        setValue("name", res.name);
        setValue("tcp2_required", res.tcp2_required);
        console.log("res");
        console.log(res);
        const arr = res.professor.map((v) => Number(v.id));
        if (res.professor.length > 0)
          setValue("profesorsData", [arr[0], ...arr.slice(1)]);
      }
    };

    getSubjectUpdate();
  }, []);

  const profesorsData = watch("profesorsData");

  const addProfesor = () => {
    if (currentProfesor.trim()) {
      const index = profesorsData.findIndex(
        (val) => val === Number(currentProfesor)
      );

      if (index === -1) {
        setValue("profesorsData", [...profesorsData, Number(currentProfesor)]);
        setCurrentProfesor("");
        clearErrors();
      } else {
        setError("profesorsData", {
          message: "Ya se ha añadido ese profesor.",
        });
      }
    }
  };

  const removeProfesor = (index: number) => {
    const newProfesors: any = profesorsData.filter((_, i) => i !== index);
    setValue("profesorsData", newProfesors);
  };

  const onSubmit = async (data: SubjectFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setServerError([]);

      const subject: Subject = {
        ...data,
        professor: data.profesorsData,
      };

      const res = await ApiService.updateSubject(id, subject);
      if (res) {
        console.log(res);
        setIsSuccess(true);
        router.push("/dashboard/subjects");
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
        Actualizar Asignatura
      </h2>

      <div className="absolute right-10 top-7">
        <Buttom
          title="Materias"
          icon={IoIosArrowBack}
          to="/dashboard/subjects"
          className="btn1"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Mensaje de error del servidor */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              {...register("name")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Grado */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grado
            </label>
            <select
              {...register("grade")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.grade ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione un grado</option>
              <option value="7">7mo</option>
              <option value="8">8vo</option>
              <option value="9">9no</option>
            </select>
            {errors.grade && (
              <p className="text-red-500 text-sm mt-1">
                {errors.grade.message}
              </p>
            )}
          </div>

          {/* TCP2 Requerido */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("tcp2_required")}
              className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">TCP2 Requerido</label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profesores
          </label>
          <div className="flex gap-2 mt-1">
            <select
              value={currentProfesor}
              onChange={(e) => setCurrentProfesor(e.target.value)}
              className="flex-1  p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Seleccione un Profesor</option>
              {profesors &&
                profesors.map((val) => (
                  <option key={val.id} value={val.id}>
                    {val.name}
                  </option>
                ))}
            </select>

            <button type="button" onClick={addProfesor} className="btn1">
              Agregar Profesor
            </button>
          </div>
          {errors.profesorsData && (
            <p className="text-red-500 text-sm mt-1">
              {errors.profesorsData.message}
            </p>
          )}

          {/* Lista de profesores */}
          <div className={"mt-2 flex flex-wrap gap-2 p-3 shadow-md"}>
            {profesorsData &&
              profesorsData.map((val, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-1"
                >
                  {profesors && profesors.find((p) => p.id == val)?.name}
                  <button
                    type="button"
                    onClick={() => removeProfesor(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              ))}
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
          title="Actualizar Materia"
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

export default UpdateSubjects;
