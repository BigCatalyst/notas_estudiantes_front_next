/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { LuCircleFadingPlus } from "react-icons/lu";
import ApiService from "@/services/ApiService";
import { redirect, useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

// Esquema de validación Zod
const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username debe tener al menos 3 caracteres")
    .max(50),
  email: z.string().email("Email inválido"),
  first_name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  last_name: z.string().min(2, "Apellido debe tener al menos 2 caracteres"),
  password: z.string().min(6, "Contraseña debe tener al menos 6 caracteres"),
  groups: z.array(z.string()).nonempty("Debe agregar al menos un grupo"),
  is_active: z.boolean().default(true),
});

type UserFormData = z.infer<typeof userSchema>;

const AddUser = () => {
  const [serverError, setServerError] = useState("");
  const [currentGroup, setCurrentGroup] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      is_active: true,
      groups: ["admin"],
    },
    mode: "onChange",
  });

  const groups = watch("groups");

  const addGroup = () => {
    if (currentGroup.trim()) {
      setValue("groups", [...groups, currentGroup.trim()]);
      setCurrentGroup("");
    }
  };

  const removeGroup = (index: number) => {
    const newGroups: any = groups.filter((_, i) => i !== index);
    setValue("groups", newGroups);
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      console.log(data);
      const res = await ApiService.addUser(data);
      console.log(res);
      setIsSuccess(true);
      router.push("/dashboard/users");
    } catch (error) {
      setServerError(
        "Error al crear el usuario. Por favor intente nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      <h2 className="text-2xl font-bold mb-6 mt-7 text-gray-800 border-b-2 pb-2 border-b-gray-400">
        Crear Nuevo Usuario
      </h2>

      <div className="absolute right-10 top-7">
        <button className="btn1" onClick={() => redirect("/dashboard/users")}>
          <IoIosArrowBack className="w-4 h-4" />
          Usuarios
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Mensaje de error del servidor */}
        {serverError && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">
            {serverError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.first_name.message}
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
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.last_name.message}
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

        {/* Grupos */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Grupos
          </label>
          <div className="flex gap-2 mt-1">
            <input
              value={currentGroup}
              onChange={(e) => setCurrentGroup(e.target.value)}
              className="flex-1  p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button type="button" onClick={addGroup} className="btn1">
              Agregar Grupo
            </button>
          </div>
          {errors.groups && (
            <p className="text-red-500 text-sm mt-1">{errors.groups.message}</p>
          )}

          {/* Lista de grupos */}
          <div className={"mt-2 flex flex-wrap gap-2 p-3 shadow-md"}>
            {groups.map((group, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-1"
              >
                {group}
                <button
                  type="button"
                  onClick={() => removeGroup(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Activo */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("is_active")}
            className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 text-sm text-gray-700">Usuario activo</label>
        </div>

        {isSuccess && (
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-green-700 text-sm">
              ¡Cambios guardados exitosamente!
            </p>
          </div>
        )}

        {/* Botón de envío */}
        <button
          type="submit"
          className="btn1 w-full justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <TbLoader2 className="animate-spin mr-2 h-4 w-4" />
              Guardando...
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <LuCircleFadingPlus className="h-5 w-5" /> Crear Usuario
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
