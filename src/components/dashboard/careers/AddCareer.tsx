/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LuCircleFadingPlus } from "react-icons/lu";
import ApiService from "@/services/ApiService";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Buttom from "@/components/ui/buttom/Buttom";
import MessageForm from "@/components/ui/messageForm/MessageForm";
import { z } from "zod";

// Esquema de validación Zod
const careerSchema = z.object({
  amount: z.number().min(1, "La cantidad debe ser al menos 1"),
  name: z.string().min(1, "El nombre es requerido"),
});

type CareerFormData = z.infer<typeof careerSchema>;

const AddCareer = () => {
  const [serverError, setServerError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CareerFormData>({
    resolver: zodResolver(careerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: CareerFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setServerError([]);
      const res = await ApiService.addCareer(data);
      if (res) {
        console.log(res);
        setIsSuccess(true);
        router.push("/dashboard/careers");
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
        Crear Nueva Carrera
      </h2>

      <div className="absolute right-10 top-7">
        <Buttom
          title="Carreras"
          icon={IoIosArrowBack}
          to="/dashboard/careers"
          className="btn1"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Mensaje de error del servidor */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cantidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cantidad
            </label>
            <input
              type="number"
              {...register("amount", { valueAsNumber: true })}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.amount ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
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
          title="Crear Carrera"
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

export default AddCareer;
