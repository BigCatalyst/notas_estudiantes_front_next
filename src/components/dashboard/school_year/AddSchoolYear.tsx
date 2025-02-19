/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { LuCircleFadingPlus } from "react-icons/lu";
import ApiService from "@/services/ApiService";
import { useRouter } from "next/navigation";
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

const AddSchoolYear = () => {
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SchoolYearFormData>({
    resolver: zodResolver(schoolYearSchema),
    mode: "onChange",
  });

  const start_date = watch("start_date");
  const end_date = watch("end_date");

  const onSubmit = async (data: SchoolYearFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setServerError("");
      const res = await ApiService.addSchoolYear(data);
      if (res) {
        console.log(res);
        setIsSuccess(true);
        router.push("/dashboard/school-years");
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
        Crear Nuevo Año Escolar
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
              Fecha de Fin${!start_date && " text-transparent"}
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

        <MessageForm
          isSuccess={isSuccess}
          error={serverError.length > 0}
          errorMessage={serverError}
        />

        {/* Botón de envío */}
        <Buttom
          title="Crear Año Escolar"
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

export default AddSchoolYear;
