/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { LuCircleFadingPlus } from "react-icons/lu";
import ApiService from "@/services/ApiService";
import { useParams, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Buttom from "@/components/ui/buttom/Buttom";
import MessageForm from "@/components/ui/messageForm/MessageForm";
import { z } from "zod";

// Esquema de validación Zod
const schoolYearSchema = z.object({
  start_date: z.string().min(1, "La fecha de inicio es requerida"),
  end_date: z.string().min(1, "La fecha de fin es requerida"),
  name: z.string().min(1, "El nombre es requerido"),
});

type SchoolYearFormData = z.infer<typeof schoolYearSchema>;

const UpdateSchoolYear = () => {
  const [serverError, setServerError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SchoolYearFormData>({
    resolver: zodResolver(schoolYearSchema),
    mode: "onChange",
  });

  const start_date = watch("start_date");
  const end_date = watch("end_date");

  useEffect(() => {
    const entityupdate = async () => {
      const res = await ApiService.getSchoolYear(id);
      if (res) {
        setValue("start_date", res.start_date);
        setValue("end_date", res.end_date);
        setValue("name", res.name);
      }
    };

    entityupdate();
  }, []);

  const onSubmit = async (data: SchoolYearFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setServerError([]);
      const res = await ApiService.updateSchoolYear(id, data);
      if (res) {
        console.log(res);
        setIsSuccess(true);
        router.push("/dashboard/school_year");
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
        Actualizar Año Escolar
      </h2>

      <div className="absolute right-10 top-7">
        <Buttom
          title="Años Escolares"
          icon={IoIosArrowBack}
          to="/dashboard/school_year"
          className="btn1"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Mensaje de error del servidor */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fecha de Inicio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Inicio
            </label>
            <input
              type="date"
              {...register("start_date")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.start_date ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                !start_date && " text-transparent"
              }`}
            />
            {errors.start_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.start_date.message}
              </p>
            )}
          </div>

          {/* Fecha de Fin */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Fin
            </label>
            <input
              type="date"
              {...register("end_date")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.end_date ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                !end_date && " text-transparent"
              }`}
            />
            {errors.end_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.end_date.message}
              </p>
            )}
          </div>

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
          title="Actualizar Año Escolar"
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

export default UpdateSchoolYear;
