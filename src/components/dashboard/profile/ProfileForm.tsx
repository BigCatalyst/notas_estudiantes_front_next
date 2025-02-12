/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { TbEdit, TbLoader2 } from "react-icons/tb";
import { State, updateProfileSuccess } from "@/redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { update } from "@/services/api/user";
import { User } from "@/services/Types";
import { redirect, useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

// Esquema de validación
const formSchema = z.object({
  first_name: z.string().min(2, "Mínimo 2 caracteres"),
  last_name: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
});

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error1, setError] = useState(false);

  const dispartch = useDispatch();

  const router = useRouter();

  const { user, isAuthenticated, error, loading }: State = useSelector(
    (state: any) => state.auth
  );
  console.log("Redux auth");
  console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    console.log("ok");
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setError(false);

      console.log(data);

      // Simular llamada API
      //   await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await update({
        id: user && user.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      });

      if (res && user) {
        const resData = res;

        const dataUpd: User = {
          id: user?.id,
          username: user.username,
          roles: user.roles,
          email: resData.email,
          first_name: resData.first_name,
          last_name: resData.last_name,
        };

        dispartch(updateProfileSuccess({ user: dataUpd }));

        router.push("/dashboard/profile");
      }

      setIsSuccess(true);
    } catch (error) {
      console.log("errorrrrrrrrrrrr");
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[500px]">
      <div className="w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="mb-8 border-b pb-4 border-b-gray-400 relative">
          <h1 className="text-2xl font-bold text-gray-700">
            Perfil de Usuario
          </h1>
          <p className="text-gray-600 mt-1">
            Actualiza tu información personal
          </p>
          <div className="absolute right-10 top-3">
            <button
              className="btn1"
              onClick={() => redirect("/dashboard/profile")}
            >
              <FaUser className="w-4 h-4" />
              Profile
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campo Nombre */}
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nombre
              </label>
              <input
                {...register("first_name")}
                id="first_name"
                type="text"
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-md shadow-sm ${
                  errors.first_name
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            {/* Campo Apellido */}
            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Apellido
              </label>
              <input
                {...register("last_name")}
                id="last_name"
                type="text"
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-md shadow-sm ${
                  errors.last_name
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            {/* Campo Email */}
            <div className="md:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-md shadow-sm ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Mensajes de estado */}
          {error1 && (
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-red-700 text-sm">Ha ocurrido un Error</p>
            </div>
          )}

          {isSuccess && (
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-green-700 text-sm">
                ¡Cambios guardados exitosamente!
              </p>
            </div>
          )}

          {/* Botón de enviar */}
          <button type="submit" disabled={isLoading} className="btn1">
            {isLoading ? (
              <span className="flex items-center justify-center">
                <TbLoader2 className="animate-spin mr-2 h-4 w-4" />
                Guardando...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <TbEdit className="h-5 w-5" /> Guardar cambios
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
