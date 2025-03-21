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
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Buttom from "@/components/ui/buttom/Buttom";
import MessageForm from "@/components/ui/messageForm/MessageForm";
import { getMunicipios, listarProvincias } from "@/data/provincias_cuba";

const dropoutSchema = z.object({
  date: z.string().min(1, "La fecha es requerida"),
  municipality: z.string().min(1, "El municipio es requerido"),
  province: z.string().min(1, "La provincia es requerido"),
  school: z.string().min(1, "La escuela es requerida"),
  student: z.string().min(1, "El estudiante es requerido"),
  is_dropout: z.string().min(1, "Este campo no puede estar vacío"),
});

type DropoutFormData = z.infer<typeof dropoutSchema>;

const AddDropout = () => {
  const [serverError, setServerError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [students, setStudents] = useState<{ id: string; name: string }[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsData = await ApiService.studentsAll("grade=9");
        if (studentsData)
          setStudents(
            studentsData.map((student: any) => ({
              id: student.id,
              name: `${student.first_name} ${student.last_name}`,
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
    watch,
    setError,
    clearErrors,
  } = useForm<DropoutFormData>({
    resolver: zodResolver(dropoutSchema),
    defaultValues: {
      municipality: "",
      province: "",
    },
    mode: "onChange",
  });

  const date = watch("date");
  const province = watch("province");

  const onSubmit = async (data: DropoutFormData) => {
    console.log("ok");
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setServerError([]);
      const res = await ApiService.addDropout(data);
      if (res) {
        console.log(res);
        setIsSuccess(true);
        router.push("/dashboard/dropouts");
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
        Crear Alta o Baja
      </h2>

      <div className="absolute right-10 top-7">
        <Buttom
          title="Altas y Bajas"
          icon={IoIosArrowBack}
          to="/dashboard/dropouts"
          className="btn1"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Mensaje de error del servidor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Alta Baja */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Alta o Baja
            </label>
            <select
              {...register("is_dropout")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.is_dropout ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Alta o Baja</option>
              <option value="true">Baja</option>
              <option value="false">Alta</option>
            </select>
            {errors.is_dropout && (
              <p className="text-red-500 text-sm mt-1">
                {errors.is_dropout?.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Inicio
            </label>
            <input
              type="date"
              {...register("date")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.date ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                !date && " text-transparent"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Provincia
            </label>
            <select
              {...register("province")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.province ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Provincia</option>
              {listarProvincias().map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.province && (
              <p className="text-red-500 text-sm mt-1">
                {errors.province.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Municipio
            </label>
            <select
              {...register("municipality")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.municipality ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Municipio</option>
              {province &&
                getMunicipios(province)?.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
            </select>
            {errors.municipality && (
              <p className="text-red-500 text-sm mt-1">
                {errors.municipality.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Escuela
            </label>
            <input
              {...register("school")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.school ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.school && (
              <p className="text-red-500 text-sm mt-1">
                {errors.school.message}
              </p>
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
          title="Crear"
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

export default AddDropout;
