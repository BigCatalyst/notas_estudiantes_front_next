/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import { LuCircleFadingPlus } from "react-icons/lu";
import ApiService from "@/services/ApiService";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Buttom from "@/components/ui/buttom/Buttom";
import MessageForm from "@/components/ui/messageForm/MessageForm";
import { Group } from "./Types";
import { Account } from "../../../services/api/professor";

// Esquema de validación Zod
const userSchema = z.object({
  email: z.string().email("Email inválido"),
  first_name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  last_name: z.string().min(2, "Apellido debe tener al menos 2 caracteres"),
  password: z
    .string()
    .min(6, "Contraseña debe tener al menos 6 caracteres")
    .optional()
    .or(z.literal("")),
  repeat_password: z.string().optional().or(z.literal("")),
  groups: z.array(z.string()).nonempty("Debe agregar al menos un grupo"),
  is_active: z.boolean().default(true),
});

type UserFormData = z.infer<typeof userSchema>;

const UpdateUser = () => {
  const { id } = useParams();
  const [serverError, setServerError] = useState("");
  const [currentGroup, setCurrentGroup] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [roles, setRoles] = useState<string[] | null>(null);

  const username = useRef("");

  useEffect(() => {
    const roles = async () => {
      try {
        const res = await ApiService.getRoles();
        if (res) {
          //console.log(res);
          setRoles(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    roles();

    const entidad = async () => {
      try {
        if (typeof id === "string") {
          const res = await ApiService.getUser(id);

          if (res) {
            console.log(res);
            if (res.username) username.current = res.username;
            setValue("email", res.email || "");
            setValue("first_name", res.first_name || "");
            setValue("is_active", res.is_active || false);
            setValue("last_name", res.last_name || "");

            const grupos: string[] | Group[] | undefined = res.groups;

            if (grupos) {
              console.log(grupos);
              let valuesGroups: string[];
              valuesGroups = [];

              grupos.forEach((item) => {
                if (
                  typeof item === "object" &&
                  item !== null &&
                  typeof item.id === "number" &&
                  typeof item.name === "string"
                ) {
                  valuesGroups.push(item.name);
                }
              });

              console.log(valuesGroups);
              setValue("groups", [valuesGroups[0], ...valuesGroups.slice(1)]);
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
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });

  // Observa los valores de password y repeat_password
  const password = watch("password");

  const groups = watch("groups");

  const addGroup = () => {
    if (currentGroup.trim()) {
      const index = groups.findIndex((val) => val === currentGroup);
      console.log(index);
      console.log(currentGroup);
      if (index === -1) {
        setValue("groups", [...groups, currentGroup.trim()]);
        setCurrentGroup("");
        clearErrors();
      } else {
        setError("groups", { message: "Ya se ha añadido ese rol." });
      }
    }
  };

  const removeGroup = (index: number) => {
    const newGroups: any = groups.filter((_, i) => i !== index);
    setValue("groups", newGroups);
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      const {
        email,
        first_name,
        groups,
        is_active,
        last_name,
        password,
        repeat_password,
      } = data;
      setIsLoading(true);
      setIsSuccess(false);
      setServerError("");
      console.log(data);
      let dataF: any = {};

      if (data.password?.length === 0) {
        dataF = { email, first_name, groups, is_active, last_name };
      } else {
        dataF = { email, first_name, groups, is_active, last_name, password };
      }
      if (password === repeat_password) {
        const res = await ApiService.updUser(id, dataF);
        if (res) {
          console.log(res);
          setIsSuccess(true);
          router.push("/dashboard/users");
        }
      } else
        setError("repeat_password", {
          message: "Las contraseñas no coinciden",
        });
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
        Actualizar Usuario
      </h2>

      <div className="absolute right-10 top-7">
        <Buttom
          title="Usuarios"
          icon={IoIosArrowBack}
          to="/dashboard/users"
          className="btn1"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Mensaje de error del servidor */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div>{username.current}</div>
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

          {/* Repetir Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Repetir Contraseña
            </label>
            <input
              type="password"
              {...register("repeat_password")}
              onChange={(event) => {
                console.log(password);
                console.log(event.target.value);
                if (password !== event.target.value) {
                  setError("repeat_password", {
                    message: "Las contraseñas no coinciden",
                  });
                } else {
                  clearErrors("repeat_password");
                }
              }}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.repeat_password ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.repeat_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.repeat_password.message}
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
            {/* <input
              value={currentGroup}
              onChange={(e) => setCurrentGroup(e.target.value)}
              className="flex-1  p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            /> */}

            <select
              value={currentGroup}
              onChange={(e) => setCurrentGroup(e.target.value)}
              className="flex-1  p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Seleccione un Rol</option>
              {roles &&
                roles.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </select>

            <button type="button" onClick={addGroup} className="btn1">
              Agregar Grupo
            </button>
          </div>
          {errors.groups && (
            <p className="text-red-500 text-sm mt-1">{errors.groups.message}</p>
          )}

          {/* Lista de grupos */}
          <div className={"mt-2 flex flex-wrap gap-2 p-3 shadow-md"}>
            {groups &&
              groups.map((group, index) => (
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

        <div className="flex items-center my-5">
          <div className="inline-flex gap-7">
            {/* Activo */}
            <div className="flex items-center">
              <input
                id="is_active"
                type="checkbox"
                {...register("is_active")}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                Usuario activo
              </label>
            </div>
          </div>
        </div>

        {/* {isSuccess && (
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-green-700 text-sm">
              ¡Cambios guardados exitosamente!
            </p>
          </div>
        )}

        {!isSuccess && (
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-red-700 text-sm">Ha ocurrido un Error</p>
          </div>
        )} */}

        <MessageForm
          isSuccess={isSuccess}
          error={serverError.length > 0}
          errorMessage={serverError}
        />

        {/* Botón de envío */}

        <Buttom
          title="Actualizar Usuario"
          type="submit"
          isLoading={isLoading}
          className="btn1"
          icon={LuCircleFadingPlus}
          textLoading="Guardando"
        />

        {/* <button
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
        </button> */}
      </form>
    </div>
  );
};

export default UpdateUser;
