/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Buttom from "@/components/ui/buttom/Buttom";
import MessageForm from "@/components/ui/messageForm/MessageForm";
import ApiService from "@/services/ApiService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CgCheckO, CgCloseO } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { LuCircleFadingPlus } from "react-icons/lu";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schoolYearSchema = z.object({
  start_date: z.string().min(1, "La fecha de inicio es requerida"),
  end_date: z.string().min(1, "La fecha de fin es requerida"),
  name: z.string().min(1, "El nombre es requerido"),
});
type SchoolYearFormData = z.infer<typeof schoolYearSchema>;

const VerifyStudents = () => {
  const [serverError, setServerError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [estudiantes_tienen_boletas, setEstudiantes_tienen_boletas] =
    useState(-1);
  const [estudiantes_posicion_escalafon, setEstudiantes_posicion_escalafon] =
    useState(-1);
  const [estudiantes_sin_otorgamiento, setEstudiantes_sin_otorgamiento] =
    useState(false);

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

  useEffect(() => {
    const verifyApi = async () => {
      try {
        const [res1, res2, resEstudiantesSinOtorgamiento] = await Promise.all([
          ApiService.verificarEstudintesSinBoleta(),
          ApiService.verificarEstudintesSinEscalafon(),
          ApiService.verificarEstudintesSinOtorgamiento(),
        ]);
        if (res1) {
          setEstudiantes_tienen_boletas(res1.are_missing_ballots ? 0 : 1);
        }
        if (res2) {
          setEstudiantes_posicion_escalafon(
            res2.are_students_whithout_ranking ? 0 : 1
          );
        }
        if (resEstudiantesSinOtorgamiento) {
          setEstudiantes_sin_otorgamiento(
            resEstudiantesSinOtorgamiento.without_granting
          );
        }
      } catch (error: any) {
        setServerError(["Existen Condiciones sin cumplir"]);
      }
    };
    verifyApi();
  }, []);

  const ponerErrorConformato = (error: any) => {
    function getKeyCorrecta(key: string) {
      if (key == "start_date") {
        return "Fecha de Inicio";
      }
      return key;
    }
    const errorData: {
      [key: string]: string[] | { email: string[]; username: string[] };
    } = error.response.data;
    const formattedErrorData: string[] = [];
    if (Object.keys(errorData).length > 0) {
      Object.entries(errorData).forEach(([key, value]) => {
        if (key == "non_field_errors") {
          formattedErrorData.push(`${value}`);
        } else {
          formattedErrorData.push(`${getKeyCorrecta(key)}: ${value}`);
        }
      });
    }
    setServerError(formattedErrorData);
  };

  const onSubmit = async (data: SchoolYearFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setServerError([""]);

      const res = await ApiService.subirGradoEstudiantes(data);
      if (res) {
        setIsSuccess(true);
        router.push("/dashboard/grant_career");
      }
    } catch (error) {
      console.log(error);
      ponerErrorConformato(error);
      // setServerError(["Error al subir de Grado"]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md relative">
      <div className="max-w-2xl mx-auto p-2  ">
        <h2 className="text-2xl font-bold mb-6 mt-7 text-gray-800 border-b-2 pb-2 border-b-gray-400">
          Verificar Estudiantes
        </h2>

        <div className="absolute right-10 top-7">
          <Buttom
            title="Estudiantes"
            icon={IoIosArrowBack}
            to="/dashboard/students"
            className="btn1"
          />
        </div>

        <p className="font-bold text-lg text-gray-800">
          Condiciones para suvir de Grado:
        </p>

        <ul>
          <li>
            <p className="inline-flex justify-center items-center ml-3">
              <IoIosArrowForward className="text-gray-700" />
              <span
                className={`${
                  estudiantes_tienen_boletas === 1
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Todos los Estudiantes de 9no tienen Boletas
              </span>
              <CgCheckO
                className={
                  "ml-2 text-green-700" +
                  `${estudiantes_tienen_boletas === 0 ? " hidden" : " block"}`
                }
              />
              <CgCloseO
                className={
                  "ml-2 text-red-700" +
                  `${estudiantes_tienen_boletas === 0 ? " block" : " hidden"}`
                }
              />
            </p>
          </li>
          <li>
            <p className="inline-flex justify-center items-center ml-3">
              <IoIosArrowForward className="text-gray-700" />
              <span
                className={`${
                  estudiantes_posicion_escalafon === 1
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Todos los Estudiantes de 9no tienen una posición en el Escalafón
              </span>
              <CgCheckO
                className={
                  "ml-2 text-green-700" +
                  `${
                    estudiantes_posicion_escalafon === 0 ? " hidden" : " block"
                  }`
                }
              />
              <CgCloseO
                className={
                  "ml-2 text-red-700" +
                  `${
                    estudiantes_posicion_escalafon === 0 ? " block" : " hidden"
                  }`
                }
              />
            </p>
          </li>

          <li>
            <p className="inline-flex justify-center items-center ml-3">
              <IoIosArrowForward className="text-gray-700" />
              <span
                className={`${
                  !estudiantes_sin_otorgamiento
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Todos los estudiantes tienen una carrera otorgada
              </span>
              <CgCheckO
                className={
                  "ml-2 text-green-700" +
                  `${!estudiantes_sin_otorgamiento ? " block" : " hidden"}`
                }
              />
              <CgCloseO
                className={
                  "ml-2 text-red-700" +
                  `${!estudiantes_sin_otorgamiento ? " hidden" : " block"}`
                }
              />
            </p>
          </li>
        </ul>
      </div>

      <div className="max-w-2xl mx-auto p-2  ">
        <h2 className="text-2xl font-bold mb-6 mt-2 text-gray-800 border-b-2 pb-2 border-b-gray-400">
          Datos de Nuevo Curso
        </h2>

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
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
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
            title="Subir Estudiante de Grado"
            type="submit"
            isLoading={isLoading}
            className="btn1"
            icon={LuCircleFadingPlus}
            textLoading="Guardando"
            disable={
              estudiantes_posicion_escalafon === 0 ||
              estudiantes_tienen_boletas === 0 ||
              estudiantes_sin_otorgamiento
            }
          />
        </form>
      </div>
    </div>
  );
};

export default VerifyStudents;
