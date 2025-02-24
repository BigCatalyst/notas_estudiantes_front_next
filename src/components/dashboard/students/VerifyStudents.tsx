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

const VerifyStudents = () => {
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [estudiantes_tienen_boletas, setEstudiantes_tienen_boletas] =
    useState(-1);
  const [estudiantes_posicion_escalafon, setEstudiantes_posicion_escalafon] =
    useState(-1);

  const router = useRouter();

  useEffect(() => {
    const verifyApi = async () => {
      try {
        const [res1, res2] = await Promise.all([
          ApiService.verificarEstudintesSinBoleta(),
          ApiService.verificarEstudintesSinEscalafon(),
        ]);
        if (res1) {
          setEstudiantes_tienen_boletas(res1.are_missing_ballots ? 0 : 1);
        }
        if (res2) {
          setEstudiantes_posicion_escalafon(
            res2.are_students_whithout_ranking ? 0 : 1
          );
        }
      } catch (error: any) {
        setServerError("Existen Condiciones sin cumplir");
      }
    };
    verifyApi();
  }, []);

  const VerifyStudents = async () => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setServerError("");

      const res = await ApiService.subirGradoEstudiantes();
      if (res) {
        setIsSuccess(true);
        router.push("/dashboard/grant_career");
      }
    } catch (error) {
      console.log(error);
      setServerError("Error al subir de Grado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
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
                `${estudiantes_posicion_escalafon === 0 ? " hidden" : " block"}`
              }
            />
            <CgCloseO
              className={
                "ml-2 text-red-700" +
                `${estudiantes_posicion_escalafon === 0 ? " block" : " hidden"}`
              }
            />
          </p>
        </li>
      </ul>

      <div className="mt-7">
        {/* Mensajes de éxito o error */}
        <MessageForm
          isSuccess={isSuccess}
          error={serverError.length > 0}
          errorMessage={serverError}
        />

        {/* Botón de envío */}
        <Buttom
          title="Subir Estudiante de Grado"
          type="submit"
          isLoading={isLoading}
          className="btn1"
          icon={LuCircleFadingPlus}
          textLoading="Subiendo de Grado"
          onClick={VerifyStudents}
          disable={
            estudiantes_posicion_escalafon === 0 ||
            estudiantes_tienen_boletas === 0
          }
        />
      </div>
    </div>
  );
};

export default VerifyStudents;
