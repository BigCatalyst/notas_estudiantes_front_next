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
import { ProfessorType } from "@/services/api/professor";

const professorSchema = z.object({
  ci: z
    .string() // Acepta un string inicialmente
    .min(11, "El CI debe tener exactamente 11 dígitos") // Validación de longitud mínima
    .max(11, "El CI debe tener exactamente 11 dígitos") // Validación de longitud máxima
    .refine(
      (value) => /^\d+$/.test(value),
      "El CI solo puede contener números"
    ), // Asegura que sean solo números
  address: z.string().min(1, "Dirección es requerida"),
  last_name: z.string().min(1, "Apellido es requerido"),
  first_name: z.string().min(1, "Nombre es requerido"),
  sex: z.string().min(1, "Sexo es requerido"),
  username: z
    .string()
    .min(3, "Username debe tener al menos 3 caracteres")
    .max(50)
    .optional()
    .or(z.literal("")),
  password: z.string().optional().optional().or(z.literal("")),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
});

type ProfessorFormData = z.infer<typeof professorSchema>;

export const UpdateProfessor = () => {
  const { id } = useParams();
  const [serverError, setServerError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const entidad = async () => {
      try {
        if (typeof id === "string") {
          const res = await ApiService.getProfessor(id);

          if (res) {
            console.log(res);
            setValue("ci", res.ci);
            setValue("address", res.address);
            setValue("last_name", res.last_name);
            setValue("first_name", res.first_name);
            setValue("sex", res.sex);

            if (res.user) {
              const resUser = await ApiService.getUser(res.user + "");

              if (resUser) {
                setValue("username", resUser.username ? resUser.username : "");
                setValue("email", resUser.email ? resUser.email : "");
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    entidad();
  }, []);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm<ProfessorFormData>({
    resolver: zodResolver(professorSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: ProfessorFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setServerError([]);

      const dataProfesor: ProfessorType = {
        address: data.address,
        ci: data.ci,
        first_name: data.first_name,
        last_name: data.last_name,
        sex: data.sex,
      };

      if (data.email || data.password || data.username) {
        dataProfesor.account = {};

        if (data.email) {
          dataProfesor.account.email = data.email;
        }
        if (data.username) {
          dataProfesor.account.username = data.username;
        }
        if (data.password) dataProfesor.account.password = data.password;
      }

      const res = await ApiService.updateProfessor(id + "", dataProfesor);
      if (res) {
        console.log(res);
        setIsSuccess(true);
        router.push("/dashboard/professor");
      }
    } catch (error: any) {
      console.log(error);
      const errorData: {
        [key: string]: string[] | { email: string[]; username: string[] };
      } = error.response.data;
      let formattedErrorData: string[] = [];
      if (Object.keys(errorData).length > 0) {
        Object.entries(errorData).forEach(([key, value]) => {
          if (key !== "account") {
            formattedErrorData.push(`${key}: ${value}`);
          } else {
            Object.entries(value).forEach(([key, value]) => {
              if (Array.isArray(value))
                formattedErrorData.push(`${key}: ${value.join(", ")}`);
            });
          }
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
        Actualizar Nuevo Profesor
      </h2>

      <div className="absolute right-10 top-7">
        <Buttom
          title="Profesores"
          icon={IoIosArrowBack}
          to="/dashboard/professor"
          className="btn1"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CI */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CI
            </label>
            <input
              {...register("ci")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.ci ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              disabled
            />
            {errors.ci && (
              <p className="text-red-500 text-sm mt-1">{errors.ci.message}</p>
            )}
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              {...register("address")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.address ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              disabled
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              {...register("last_name")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.last_name ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              disabled
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              {...register("first_name")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.first_name ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              disabled
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Sexo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sexo
            </label>
            <select
              {...register("sex")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.sex ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              disabled
            >
              <option value="">Seleccione el sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
            {errors.sex && (
              <p className="text-red-500 text-sm mt-1">{errors.sex.message}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              {...register("username")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.username ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              {...register("password")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
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
          title="Actualizar Profesor"
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
